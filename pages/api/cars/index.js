/**
 * Sample Car API
 */
import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {
  const prisma = new PrismaClient();
  var cars = await prisma.CarsApp_car.findMany({
    where: {
      // business_user: true,
    },
    // include: {
    //   BusinessesApp_businesstype: true,
    //     // CarsApp_carmodel: true,
    //   }
  })

  cars = JSON.parse(
    JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );


  console.log(cars)

  res.status(200).json(cars)
}
