import { data } from "autoprefixer";
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  try {
    if (req.method === "POST" && req.body.car_id !== undefined) {
      const data = await createData(parseInt(req.body.car_id));
      res.status(200).json("sucessful");
    } else if (req.method === "GET") {
      const dataGet = await getPending();
      res.status(200).json(dataGet);
    } else {
      throw new Error("No body");
    }
  } catch (e) {
    console.error(e)
    res.status(400).json({
      error: e,
      result: null,
    });
  }
}

async function createData(car_id) {
  const car_approve = await prisma.CarsApp_carapprovallog.create({
    data: {
      is_approved: false,
      created_at: new Date(),
      updated_at: new Date(),
      approved_by_id: null,
      car_id_id: car_id,
      review: null,
    },
  }).catch((err) => {
    throw new Error(err);
  });

  return car_approve;
}
export async function getPending(page=1, type="car") {
  if (type === "car") {
    return await getCarPending(page);
  }
  return await getBikePending(page);
}

async function getCarPending(page) {
  let data;
  let detail;
  page = parseInt(page);
  if(page === 1 || page=== undefined || page === null) {
    data = await prisma.CarsApp_carapprovallog.groupBy({
      take: 20,
      by: ["car_id_id", "status", "created_at"],
      orderBy: {
        created_at: "desc",
      },
      where: {
        status: "P",
        car_id_id: {
          not: null
        }
      },
    });

    data = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    const id = data.map((v) => {
      return parseInt(v.car_id_id);
    });

    console.log("id pending", id)

    detail = await prisma.CarsApp_car.findMany({
      take: 20,
      orderBy: {
        id: 'asc'
      },
      where: {
        id: {
          in: id,
        },
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
        CarsApp_carimage: {
          select: {
            image_url: true,
          },
        },
        UsersApp_customuser: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  } else {
    data = await prisma.CarsApp_carapprovallog.groupBy({
      take: 20,
      skip: ((page - 1) * 20),
      by: ["car_id_id", "status", "created_at"],
      orderBy: {
        created_at: "desc",
      },
      where: {
        status: "P",
        car_id_id: {
          not: null
        }
      },
    });

    data = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    const id = data.map((v) => {
      return parseInt(v.car_id_id);
    });

    detail = await prisma.CarsApp_car.findMany({
      take: 20,
      skip: ((page - 1) * 20),
      orderBy: {
        id: 'asc'
      },
      where: {
        id: {
          in: id,
        },
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
        CarsApp_carimage: {
          select: {
            image_url: true,
          },
        },
        UsersApp_customuser: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  const pDetail = JSON.parse(
      JSON.stringify(detail, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  const endResultData =
      pDetail !== undefined
          ? pDetail.map(async (value) => {
            const first_name = value?.UsersApp_customuser?.first_name;
            const last_name = value?.UsersApp_customuser?.last_name;
            const carID = value?.id;
            const img = await prisma.CarsApp_carimage.findMany({
              where: {
                car_id: Number(carID),
              },
              select: {
                image_url: true,
              },
            })
                .then((imgResponse) => {
                  const img = imgResponse.map((v) => {
                    return v.image_url;
                  });
                  return img;
                })
                .catch((err) => {
                  throw new Error(err);
                });

            return {
              carModel: value?.CarsApp_carmodel?.model_name,
              carImage: img,
              carMaker: value?.CarsApp_carmanufacturer?.maker_name,
              merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
              modelData: value?.CarsApp_carmodel,
              manufacturerData: value?.CarsApp_carmanufacturer,
              carId: parseInt(value?.id),
              carName: value?.car_name,
            };
          })
          : [];

  const d = Promise.all(endResultData.map((item) => item));

  return d;
}

async function getBikePending(page) {
  let data;
  let detail;
  page = parseInt(page);
  if(page === 1 || page=== undefined || page === null) {
    data = await prisma.BikesApp_bikeapprovallog.groupBy({
      take: 20,
      by: ["bike_id_id", "status", "created_at"],
      orderBy: {
        created_at: "desc",
      },
      where: {
        status: "P",
        bike_id_id: {
          not: null
        }
      },
    });

    data = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    const id = data.map((v) => {
      return parseInt(v.bike_id_id);
    });

    console.log("id pending", id)

    detail = await prisma.BikesApp_bike.findMany({
      take: 20,
      orderBy: {
        id: 'asc'
      },
      where: {
        id: {
          in: id,
        },
      },
      include: {
        BikesApp_bikemanufacturer: {
          select: {
            maker_name: true,
            maker_country: true,
            maker_logo_url: true,
            serial: true,
          },
        },
        BikesApp_bikemodel: {
          select: {
            model_name: true,
            release_year: true,
          },
        },
        BikesApp_bikeimage: {
          select: {
            image_url: true,
          },
        },
        UsersApp_customuser: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  } else {
    data = await prisma.BikesApp_bikeapprovallog.groupBy({
      take: 20,
      skip: ((page - 1) * 20),
      by: ["bike_id_id", "status", "created_at"],
      orderBy: {
        created_at: "desc",
      },
      where: {
        status: "P",
        bike_id_id: {
          not: null
        }
      },
    });

    data = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    const id = data.map((v) => {
      return parseInt(v.bike_id_id);
    });

    detail = await prisma.BikesApp_bike.findMany({
      take: 20,
      skip: ((page - 1) * 20),
      orderBy: {
        id: 'asc'
      },
      where: {
        id: {
          in: id,
        },
      },
      include: {
        BikesApp_bikemanufacturer: {
          select: {
            maker_name: true,
            maker_country: true,
            maker_logo_url: true,
            serial: true,
          },
        },
        BikesApp_bikemodel: {
          select: {
            model_name: true,
            release_year: true,
          },
        },
        BikesApp_bikeimage: {
          select: {
            image_url: true,
          },
        },
        UsersApp_customuser: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  const pDetail = JSON.parse(
      JSON.stringify(detail, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  const endResultData =
      pDetail !== undefined
          ? pDetail.map(async (value) => {
            const first_name = value?.UsersApp_customuser?.first_name;
            const last_name = value?.UsersApp_customuser?.last_name;
            const bikeID = value?.id;
            const img = await prisma.BikesApp_bikeimage.findMany({
              where: {
                bike_id: Number(bikeID),
              },
              select: {
                image_url: true,
              },
            })
                .then((imgResponse) => {
                  const img = imgResponse.map((v) => {
                    return v.image_url;
                  });
                  return img;
                })
                .catch((err) => {
                  throw new Error(err);
                });

            return {
              bikeModel: value?.BikesApp_bikemodel?.model_name,
              bikeImage: img,
              bikeMaker: value?. BikesApp_bikemanufacturer?.maker_name,
              merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
              modelData: value?.BikesApp_bikemodel,
              manufacturerData: value?. BikesApp_bikemanufacturer,
              bikeId: parseInt(value?.id),
              bikeName: value?.bike_name,
            };
          })
          : [];

  const d = Promise.all(endResultData.map((item) => item));

  return d;
}
