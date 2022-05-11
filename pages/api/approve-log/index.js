import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
    try {
        if(req.method === "POST" && req.body.car_id !== undefined) {
            const data = await createData(parseInt(req.body.car_id));
            res.status(200).json("sucessful");
        } else if(req.method === "GET") {
            console.log("inthis case")
            const dataGet = await getPending();
            console.table(dataGet);
            res.status(200).json(dataGet);
        } else {
            throw new Error("No body");
        }
    } catch(e) {
        console.log("error case")
        res.status(400).json({
            error: e,
            result: null
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
            review: null
        }
    }).catch(err => {
        throw new Error(err);
    });

    return car_approve
}

export async function getPending() {
    var data = await prisma.CarsApp_carapprovallog.groupBy({
        by: ['car_id_id', 'status', 'created_at'],
        orderBy: {
            created_at: 'desc'
        },
        where: {
            status: {
                in: ["A", "R"]
            }
        }
    });

    const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
    var approved_id_data = parsedData.map(v => {
        return parseInt(v.car_id_id)
    })

    var filter_non_approve = await prisma.CarsApp_carapprovallog.groupBy({
        by: ['car_id_id', 'status'],
        where: {
            car_id_id: {
                notIn: approved_id_data
            },
            status: 'P'
        }
    })
    const endResult = JSON.parse(JSON.stringify(filter_non_approve, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    const id = endResult.map(v => {
        return parseInt(v.car_id_id)
    });

    const detail = await prisma.CarsApp_car.findMany({
        where: {
            id: {
                in: id
            }
        },
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
    })

        const pDetail = JSON.parse(JSON.stringify(detail, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
        const endResultData = pDetail !== undefined?(pDetail.map(async (value) => {
            const first_name = value.UsersApp_customuser.first_name;
            const last_name = value.UsersApp_customuser.last_name;
            const carID = value.id;
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
                carModel: value.CarsApp_carmodel.model_name,
                carImage: img,
                carMaker: value.CarsApp_carmanufacturer.maker_name,
                merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
                modelData: value.CarsApp_carmodel,
                manufacturerData: value.CarsApp_carmanufacturer,
                carId: parseInt(value.id),
                carName: value.car_name
            }
        })) : []

        const d = Promise.all(endResultData.map(item => item))

        return d
}

