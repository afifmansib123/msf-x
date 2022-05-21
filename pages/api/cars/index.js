/**
 * Sample Car API
 */
import { PrismaClient } from "@prisma/client";
import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const {page, cursor} = req.query;
  console.log(cursor)
  try {
    const data = await getCarList(parseInt(page), cursor);
    return res.status(200).json(data);
  } catch(e) {
    console.error(e)
    return res.status(200).json([]);
  }

}

async function getCarList(page, cursor) {
  let cars;
  let lastPostInResults;
  let myCursor;

  if (page === 1){
    cars = await prisma.CarsApp_car.findMany({
      take:20,
      orderBy: {
        id: 'asc'
      },
      include: {
        CarsApp_carmanufacturer: {
          select: {
            maker_name: true,
            maker_country: true,
            maker_logo_url: true,
            serial: true,
          },
        },
        CarsApp_carmodel: {
          select: {
            model_name: true,
            release_year: true,
          },
        },
        UsersApp_customuser: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      }
      // include: {
      //   BusinessesApp_businesstype: true,
      //     // CarsApp_carmodel: true,
      //   }
    });
  } else {
    cars = await prisma.CarsApp_car.findMany({
      take:20,
      skip: 1,
      cursor: {
        id: parseInt(cursor),
      },
      orderBy: {
        id: 'asc'
      },
      include: {
        CarsApp_carmanufacturer: {
          select: {
            maker_name: true,
            maker_country: true,
            maker_logo_url: true,
            serial: true,
          },
        },
        CarsApp_carmodel: {
          select: {
            model_name: true,
            release_year: true,
          },
        },
        UsersApp_customuser: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      }
    });
  }

  cars = JSON.parse(
      JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
  ) || [];

  console.log("53")
  cars = cars.map(async v => {
    const img = await prisma.CarsApp_carimage.findMany({
      where: {
        car_id: Number(v.id),
      },
      select: {
        image_url: true,
      },
    }).then((imgResponse) => {
      const img = imgResponse.map((v) => {
        return v.image_url;
      });
      return img;
    }).catch((err) => {throw new Error(err);});
    return {
      car: v,
      img: img
    }
  });
  console.log("74")

  cars = Promise.all(cars.map((item) => item));
  cars = await cars;
  lastPostInResults = cars[19];
  myCursor = lastPostInResults.car.id;
  return {
    cars: cars,
    cursor: myCursor
  }
}
