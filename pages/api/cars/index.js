/**
 * Sample Car API
 */
import { PrismaClient } from "@prisma/client";
import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const {page} = req.query;
  try {
    const data = await getCarList(parseInt(page));
    return res.status(200).json(data);
  } catch(e) {
    console.error(e)
    return res.status(200).json([]);
  }

}

async function getCarList(page) {
  let cars;

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
      skip: (page * 20),
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
    });
  }

  cars = JSON.parse(
      JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
  ) || [];

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

  cars = Promise.all(cars.map((item) => item));
  cars = await cars;
  console.log(cars);

  return {
    cars: cars,
  }
}
