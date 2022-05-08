import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() ;
/*
 * {
 *   id: autogen
 *   is_approved: false(give),
 *   created_at: Date
 *   update_at: Date
 *   approve_by_id: null --> at first (realation db)
 *   car_id_id: car id -->   (relation db)
 *
 * }
 *
 *
 * */
export default async function handler(req, res) {
    try {
        if(req.method == "POST") {
            if(req.body.car_id == undefined) {
                throw new Error("No body");
            }
            const data = await createData(req.body.car_id);
            return res.status(200).json({
                error: null,
                result: data
            });
        }

        if(req.method == "GET") {
            const data = await getAllApprove()
            return res.status(200).json({
                error: null,
                result: data
            });
        }
    } catch(e) {
        return res.status(400).json({
            error: e,
            result: null
        });
    }
}

async function createData(car_id) {
    const car_approve = await prisma.CarsApp_carapprovallogs.create({
        data: {
            is_approved: false,
            created_at: new Date(),
            updated_at: new Date(),
            approved_by_id: null,
            car_id_id: car_id,
            review: null
        }
    }).catch(err => {
        throw new Error(err);
    });

    return car_approve
}

// async function getAllApprove() {
//     const data = await prisma.CarsApp_carapprovallogs.findMany({
//         where: {
//           is_approved: false
//         },
//         include: {
//           CarsApp_car: {
//             include: {
//               CarsApp_carmanufacturer: {
//                 select: {
//                   maker_name: true,
//                     maker_country: true,
//                     maker_logo_url: true,
//                     serial: true
//                 }
//               },
//               CarsApp_carmodel: {
//                 select: {
//                   model_name: true,
//                     release_year: true,
//                 }
//               },
//               CarsApp_carimage: {
//                 select: {
//                   image_url: true
//                 }
//               },
//                 UsersApp_customuser: {
//                 select: {
//                     first_name: true,
//                     last_name: true
//                 }
//             },
//                 CarsApp_carbodytype: true,
//                 CarsApp_cartype: true,
//                 CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor: true,
//                 CarsApp_carwheel: true,
//                 CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor: true,
//                 CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel: true
//             }
//           }
//         },
//
//       }).catch(err => {throw new Error(err)});
//
//
//       const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
//
//       const endResultData = parsedData != undefined?(parsedData.map(async (value) => {
//           const first_name = value.CarsApp_car.UsersApp_customuser.first_name;
//           const last_name = value.CarsApp_car.UsersApp_customuser.last_name;
//           const carID = value.CarsApp_car.id;
//           const img = await prisma.CarsApp_carimage.findMany({
//                   where: {
//                       car_id: Number(carID)
//                   },
//                   select: {
//                       image_url: true
//                   }
//               }).then(imgResponse => {
//               const img = imgResponse.map((v) => {
//                   return v.image_url;
//               });
//               return img
//           }).catch(err => {
//               throw new Error(err)
//           })
//
//           // const img = value.CarsApp_car.CarsApp_carimage.image_url == undefined ? "" : value.CarsApp_car.CarsApp_carimage.image_url
//
//
//           return {
//               id: value.id,
//               carModel: value.CarsApp_car.CarsApp_carmodel.model_name,
//               carImage: img,
//               carMaker: value.CarsApp_car.CarsApp_carmanufacturer.maker_name,
//               merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
//               modelData: value.CarsApp_car.CarsApp_carmodel,
//               manufacturerData: value.CarsApp_car.CarsApp_carmanufacturer,
//               carOverview: {
//                   carName: value.CarsApp_car.car_name,
//                   seatingCapacity: value.CarsApp_car.seating_capacity,
//                   engineCapacity: value.CarsApp_car.engine_capacity,
//                   drive: value.CarsApp_car.drive,
//                   mileage: value.CarsApp_car.mileage,
//                   transmission_type: value.CarsApp_car.transmission_type,
//                   description: value.CarsApp_car.description,
//                   fuelType: value.CarsApp_car.CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel.fuel_type,
//                   condition: value.CarsApp_car.CarsApp_cartype.car_type,
//                   sell_option: value.CarsApp_car.sell_option,
//                   body: value.CarsApp_car.CarsApp_carbodytype.body_name,
//                   status: value.CarsApp_car.car_status,
//                   interior_color: value.CarsApp_car.CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor.car_color,
//                   exterior_color: value.CarsApp_car.CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor.car_color
//               }
//           }
//       })) : []
//
//        const d = Promise.all(endResultData.map(item => item))
//
//       return d
// }

export async function getAllApprove() {
    const data = await prisma.CarsApp_carapprovallogs.findMany({
        where: {
            approved_by_id: {equals: null},
            review: null
        },
        include: {
            CarsApp_car: {
                include: {
                    CarsApp_carmanufacturer: {
                        select: {
                            maker_name: true,
                            maker_country: true,
                            maker_logo_url: true,
                            serial: true
                        }
                    },
                    CarsApp_carmodel: {
                        select: {
                            model_name: true,
                            release_year: true,
                        }
                    },
                    CarsApp_carimage: {
                        select: {
                            image_url: true
                        }
                    },
                    UsersApp_customuser: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    }
                }
            }
        },

    }).catch(err => {throw new Error(err)});


    const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    const endResultData = parsedData != undefined?(parsedData.map(async (value) => {
        const first_name = value.CarsApp_car.UsersApp_customuser.first_name;
        const last_name = value.CarsApp_car.UsersApp_customuser.last_name;
        const carID = value.CarsApp_car.id;
        const img = await prisma.CarsApp_carimage.findMany({
            where: {
                car_id: Number(carID)
            },
            select: {
                image_url: true
            }
        }).then(imgResponse => {
            const img = imgResponse.map((v) => {
                return v.image_url;
            });
            return img
        }).catch(err => {
            throw new Error(err)
        })


        return {
            id: value.id,
            carModel: value.CarsApp_car.CarsApp_carmodel.model_name,
            carImage: img,
            carMaker: value.CarsApp_car.CarsApp_carmanufacturer.maker_name,
            merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
            modelData: value.CarsApp_car.CarsApp_carmodel,
            manufacturerData: value.CarsApp_car.CarsApp_carmanufacturer,
            carId: value.car_id_id
        }
    })) : []

    const d = Promise.all(endResultData.map(item => item))

    return d
}