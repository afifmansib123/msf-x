
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
    // const prisma = new PrismaClient();
    const { page } = req.query;
    try {
        console.log("page",page)
        const data = await getMerchantList(page?parseInt(page):1);
        return res.status(200).json(data);
    } catch (e) {
        console.error(e)
        return res.status(200).json([]);
    }

}

async function getMerchantList(page=1) {
    let merchants;

    if (page === 1) {
        merchants = await prisma.UsersApp_customuser.findMany({
            take: 10,
            orderBy: {
                id: 'asc'
            },
            
        });
    } else {
        merchants = await prisma.UsersApp_customuser.findMany({
            skip: (page * 10),
            take: 10,
            orderBy: {
                id: 'asc'
            },
           
        });
    }

    merchants = JSON.parse(
        JSON.stringify(merchants, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
    ) || [];

    

    merchants = Promise.all(merchants.map((item) => item));
    merchants = await merchants;
    console.log(merchants);

    return {
        merchants: merchants,
    }
}
