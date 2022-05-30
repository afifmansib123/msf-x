/**
 * This is a special API.
 * It creates a record in CarsApp_carapprovelog for all existing cars in CarsApp_car.
 * If car.is_active, log for it is "A" (accepted)
 * otherwise log for it is "R" (rejected)
 *
 * TODO prepare bike too
 */
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  // const prisma = new PrismaClient();

  const cars = await prisma.carsApp_car.findMany();

  let newLogCreatedCount = 0;
  for (const car of cars) {
    const log = await prisma.carsApp_carapprovallog.findFirst({
      where: {
        car_id_id: car.id,
      },
    });

    if (!log) {
      // If there's no log for this car, create a record for it
      console.log("No log! create new!");
      const newLog = await prisma.CarsApp_carapprovallog.create({
        data: {
          is_approved: car.is_active,
          status: car.is_active ? "A" : "R",
          created_at: new Date(),
          updated_at: new Date(),
          approved_by_id: null,
          car_id_id: car.id,
          review: null,
        },
      });
      newLogCreatedCount++;
    } else {
      console.log(log);
    }
  }

  res.status(200).json({
    count: cars.length,
    logCreated: newLogCreatedCount,
  });
}
