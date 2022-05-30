import { PrismaClient } from "@prisma/client";
import prisma from "PrismaConnect";
export default async function handler(req, res) {
    const prisma = new PrismaClient();
    let { page, filter1, filter2 } = req.query;
    let messages;

    if (filter1 == 'true' && filter2 == 'true') {
        console.log("option1")
        messages = await prisma.MerchantStorefront_messagetoadmin.count({
            orderBy: {
                id: 'asc'
            },
        });
    }
    else if (filter1 == 'true') {
        console.log("option2")
        messages = await prisma.MerchantStorefront_messagetoadmin.count({
            where: {
                status: 'waiting'
            },
            orderBy: {
                id: 'asc'
            },
        });
    }
    else if (filter2 == 'true') {
        console.log("option3")
        messages = await prisma.MerchantStorefront_messagetoadmin.count({
            where: {
                status: 'solved'
            },
            orderBy: {
                id: 'asc'
            },

        });
    }
    else {
        messages = await prisma.MerchantStorefront_messagetoadmin.count({
            orderBy: {
                id: 'asc'
            },
        });

    }


    return res.status(200).json({ data: messages });

}