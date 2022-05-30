import prisma from "/PrismaConnect";

export default async function handler(req, res) {
    if(req.method == "POST") {
        prisma.
        res.status(200).json({})
    }
}