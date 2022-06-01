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

    const bikes = await prisma.BikesApp_bike.findMany();

    let newLogCreatedCount = 0;
    for (const bike of bikes) {
        const log = await prisma.BikesApp_bikeapprovallog.findFirst({
            where: {
                bike_id_id: bike.id,
            },
        });

        if (!log) {
            // If there's no log for this car, create a record for it
            console.log("No log! create new!");
            const newLog = await prisma.BikesApp_bikeapprovallog.create({
                data: {
                    is_approved: bike.is_active,
                    status: bike.is_active ? "A" : "R",
                    created_at: new Date(),
                    updated_at: new Date(),
                    approved_by_id: null,
                    bike_id_id: bike.id,
                    review: null,
                },
            });
            newLogCreatedCount++;
        } else {
            console.log(log);
        }
    }

    res.status(200).json({
        count: bikes.length,
        logCreated: newLogCreatedCount,
    });
}
