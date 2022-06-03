
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
    const {page, status, searchTitle} = req.query;
    try {
        const data = await getBikeList(parseInt(page), status, searchTitle);
        return res.status(200).json(data);
    } catch (e) {
        console.error(e)
        return res.status(200).json([]);
    }

}

async function getBikeList(page, status, searchTitle) {
    let bikes;
    if (searchTitle) {
        let textArr = searchTitle.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        console.log(textArr)
        var merchant_id = [];
        if (textArr.length === 1) {
            console.log("case 1")
            merchant_id = await prisma.UsersApp_customuser.findMany({
                take: 30,
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
            bikes = await prisma.BikesApp_bikeapprovallog.findMany({
                orderBy: {
                    id: 'asc'
                },
                include: {
                    BikesApp_bike: {
                        include: {
                            BikesApp_bikemanufacturer: true,
                            BikesApp_bikemodel: true,
                            UsersApp_customuser: true
                        }
                    }
                }
            });

            bikes = JSON.parse(
                JSON.stringify(bikes, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
            ) || [];

            bikes = bikes.filter(car => {
                let id = car?.BikesApp_bike?.UsersApp_customuser?.id;
                if (id) {
                    return merchant_id.includes(id);
                } else {
                    return false
                }

            });

        } else {
            bikes = [];
        }

    } else {
        status = JSON.parse(status);
        if (page === 1) {
            bikes = await prisma.BikesApp_bikeapprovallog.findMany({
                take: 20,
                orderBy: {
                    id: 'asc'
                },
                where: filtering(status),
                include: {
                    BikesApp_bike: {
                        include: {
                            BikesApp_bikemanufacturer: true,
                            BikesApp_bikemodel: true,
                            UsersApp_customuser: true
                        }
                    }
                }
            });
        } else {
            bikes = await prisma.BikesApp_bikeapprovallog.findMany({
                skip: ((page - 1) * 20),
                take: 20,
                where: filtering(status),
                orderBy: {
                    id: 'asc'
                },
                include: {
                    BikesApp_bike: {
                        include: {
                            BikesApp_bikemanufacturer: true,
                            BikesApp_bikemodel: true,
                            UsersApp_customuser: true
                        }
                    }
                }
            });
        }

        bikes = JSON.parse(
            JSON.stringify(bikes, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
        ) || [];
    }

    bikes = bikes.map(async v => {
        let first_name = "UNKNOWN";
        let last_name = "NAME";
        let img = '';
        let store_name = '-';

        if (v.BikesApp_bike?.UsersApp_customuser) {
            first_name = v.BikesApp_bike?.UsersApp_customuser?.first_name;
            last_name = v.BikesApp_bike?.UsersApp_customuser?.last_name
        }

        if (v.BikesApp_bike?.id) {
            img = await prisma.BikesApp_bikeimage.findMany({
                where: {
                    bike_id: Number(v.BikesApp_bike.id),
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

        if (v.BikesApp_bike?.UsersApp_customuser?.id) {
            let userStore = await prisma.MerchantStorefront_store.findFirst({
                where: {
                    owner_user_id: BigInt(v.BikesApp_bike.UsersApp_customuser?.id),
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
            bike: v.BikesApp_bike,
            img: img,
            status: v.status,
            first_name: first_name,
            last_name: last_name,
            store: store_name
        }
    });

    bikes = Promise.all(bikes.map((item) => item));
    bikes = await bikes;

    return {
        bikes: bikes,
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




