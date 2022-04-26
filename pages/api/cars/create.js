import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method == "POST") {
        prisma.
        res.status(200).json({})
    }
}