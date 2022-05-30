import prisma from "/PrismaConnect";

export default async function handler(req, res) {
    try {
        const id = req.query.id;
        console.log(id)
        if(req.method == "GET" && id != undefined) {
            const int_id = parseInt(id);
            const data = await getDetail(int_id)
            return res.status(200).json({
                error: null,
                result: data
            });
        }
    } catch(e) {
        console.error(e)
        return res.status(400).json({
            error: e,
            result: null
        });
    }
}

async function getDetail(id) {
    const data = await prisma.CarsApp_carapprovallog.findUnique({
        where: {
            id: id
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
                    },
                    CarsApp_carbodytype: true,
                    CarsApp_cartype: true,
                    CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor: true,
                    CarsApp_carwheel: true,
                    CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor: true,
                    CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel: true
                }
            }
        },

    }).catch(err => {throw new Error(err)});

    console.log(data);
    const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    console.log(parsedData);

    const first_name = parsedData.CarsApp_car.UsersApp_customuser.first_name;
    const last_name = parsedData.CarsApp_car.UsersApp_customuser.last_name;
    const carID = parsedData.CarsApp_car.id;
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

    const jsonData = {
        id: parsedData.id,
        carModel: parsedData.CarsApp_car.CarsApp_carmodel.model_name,
        carImage: img,
        carMaker: parsedData.CarsApp_car.CarsApp_carmanufacturer.maker_name,
        merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
        modelData: parsedData.CarsApp_car.CarsApp_carmodel,
        manufacturerData: parsedData.CarsApp_car.CarsApp_carmanufacturer,
        carOverview: {
            carName: parsedData.CarsApp_car.car_name,
            seatingCapacity: parsedData.CarsApp_car.seating_capacity,
            engineCapacity: parsedData.CarsApp_car.engine_capacity,
            drive: parsedData.CarsApp_car.drive,
            mileage: parsedData.CarsApp_car.mileage,
            transmission_type: parsedData.CarsApp_car.transmission_type,
            description: parsedData.CarsApp_car.description,
            fuelType: parsedData.CarsApp_car.CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel.fuel_type,
            condition: parsedData.CarsApp_car.CarsApp_cartype.car_type,
            sell_option: parsedData.CarsApp_car.sell_option,
            body: parsedData.CarsApp_car.CarsApp_carbodytype.body_name,
            status: parsedData.CarsApp_car.car_status,
            interior_color: parsedData.CarsApp_car.CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor.car_color,
            exterior_color: parsedData.CarsApp_car.CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor.car_color
        }
    }

    return jsonData
}