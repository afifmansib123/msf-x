/**
 * Sample Car API
 */
 import prisma from "/PrismaConnect";

export default async function handler(req, res) {
    const {page, status, searchTitle} = req.query;
    // console.log(status)
    try {
        const data = await getCarList(parseInt(page), status, searchTitle);
        return res.status(200).json(data);
    } catch (e) {
        console.error(e)
        return res.status(200).json([]);
    }

}

async function getCarList(page, status, searchTitle) {
    let cars;
    if (searchTitle) {
        let textArr = searchTitle.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        console.log(textArr)
        var merchant_id = [];
        if (textArr.length === 1) {
            console.log("case 1")
            merchant_id = await prisma.UsersApp_customuser.findMany({
                take:30,
                where: {
                    first_name: {
                        startsWith: textArr[0]
                    }
                },
                select: {
                    id: true
                }
            }).catch(e => {
                console.error(e)
            })

        } else {
            merchant_id = await prisma.UsersApp_customuser.findMany({
                take: 30,
                where: {
                    first_name: {
                        startsWith: textArr[0]
                    },
                    last_name: {
                        startsWith: textArr[1]
                    }
                },
                select: {
                    id: true
                }
            }).catch(e => {
                console.error(e)
            });

        }

        merchant_id = JSON.parse(
            JSON.stringify(merchant_id, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
        ) ?? [];
        console.log("merchant id", merchant_id)

        merchant_id = merchant_id.map(v => {
            return v.id
        })
        console.log("merchant id mapping", merchant_id)

        if (merchant_id.length > 0) {
            cars = await prisma.CarsApp_carapprovallog.findMany({
                orderBy: {
                    id: 'asc'
                },
                include: {
                    CarsApp_car: {
                        include: {
                            CarsApp_carmanufacturer: true,
                            CarsApp_carmodel: true,
                            UsersApp_customuser: true
                        }
                    }
                }
            });

            //https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
            //https://github.com/prisma/prisma/discussions/11172
            //https://stackoverflow.com/questions/69731954/filtering-relations-with-include-and-where
            // not work don't know why
            // cars = await prisma.CarsApp_carapprovallog.findMany({
            //     orderBy: {
            //         id: 'asc'
            //     },
            //     include: {
            //         CarsApp_car: {
            //             include: {
            //                 CarsApp_carmanufacturer: true,
            //                 CarsApp_carmodel: true,
            //                 UsersApp_customuser: {
            //                     where: {
            //                         id: merchant_id
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // });

            cars = JSON.parse(
                JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
            ) || [];

            cars = cars.filter(car => {
                let id = car?.CarsApp_car?.UsersApp_customuser?.id;
                if (id) {
                    return merchant_id.includes(id);
                } else {
                    return false
                }

            });

        } else {
            cars = [];
        }

    } else {
        status = JSON.parse(status);
        if (page === 1) {
            cars = await prisma.CarsApp_carapprovallog.findMany({
                take: 20,
                orderBy: {
                    id: 'asc'
                },
                where: filtering(status),
                include: {
                    CarsApp_car: {
                        include: {
                            CarsApp_carmanufacturer: true,
                            CarsApp_carmodel: true,
                            UsersApp_customuser: true
                        }
                    }
                }
            });
        } else {
            cars = await prisma.CarsApp_carapprovallog.findMany({
                skip: ((page - 1) * 20),
                take: 20,
                where: filtering(status),
                orderBy: {
                    id: 'asc'
                },
                include: {
                    CarsApp_car: {
                        include: {
                            CarsApp_carmanufacturer: true,
                            CarsApp_carmodel: true,
                            UsersApp_customuser: true
                        }
                    }
                }
            });
        }

        cars = JSON.parse(
            JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
        ) || [];
    }

    cars = cars.map(async v => {
        let first_name = "UNKNOWN";
        let last_name = "NAME";
        let img = '';
        let store_name = '-';

        if (v.CarsApp_car?.UsersApp_customuser) {
            first_name = v.CarsApp_car?.UsersApp_customuser?.first_name;
            last_name = v.CarsApp_car?.UsersApp_customuser?.last_name
        }

        if (v.CarsApp_car?.id) {
            img = await prisma.CarsApp_carimage.findMany({
                where: {
                    car_id: Number(v.CarsApp_car.id),
                },
                select: {
                    image_url: true,
                },
            }).then((imgResponse) => {
                const img = imgResponse.map((v) => {
                    return v.image_url;
                });
                return img;
            }).catch((err) => {
                throw new Error(err);
            });
        }

        if (v.CarsApp_car?.UsersApp_customuser?.id) {
            let userStore = await prisma.MerchantStorefront_store.findFirst({
                where: {
                    owner_user_id: BigInt(v.CarsApp_car.UsersApp_customuser?.id),
                },
            }).catch(e => {
                throw new Error(e)
            });

            userStore = JSON.parse(
                JSON.stringify(userStore, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
            );
            store_name = userStore?.name;
        }

        return {
            car: v.CarsApp_car,
            img: img,
            status: v.status,
            first_name: first_name,
            last_name: last_name,
            store: store_name
        }
    });

    cars = Promise.all(cars.map((item) => item));
    cars = await cars;

    return {
        cars: cars,
    }
}

function filtering(status) {
    let filterJson = {};
    let statusArr = [];
    if (status.Approved) {
        statusArr.push("A")
    }

    if (status.Rejected) {
        statusArr.push("R")
    }

    if (status.Pending) {
        statusArr.push("P")
    }

    if (statusArr.length > 0) {
        filterJson = {
            status: {
                in: statusArr
            }
        }
    }

    return filterJson
}




