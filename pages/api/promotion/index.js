import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
    try {
        res.status(200).json({ name: 'John Doe' })
    } catch (e) {
        return res.status(400).json({
            error: e,
            result: null
        });
    }
}

