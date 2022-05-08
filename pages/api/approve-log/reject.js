import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() ;

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const data = await updateApprove(req.body);
            if (data != null || data != undefined) {
                return res.status(200).json({
                        error: null,
                        result: data
                    }
                );
            } else {
                throw new Error("data is null");
            }
        } else {
            throw new Error("Wrong method");
        }
    } catch (e) {
        return res.status(400).json({
            error: e,
            result: null
        });
    }
}

async function updateApprove({review_string, approval_id, record_id}) {
    const updateLog = await prisma.CarsApp_carapprovallogs.update({
        where: {
            id: record_id
        },
        data: {
            is_approved: false,
            updated_at: new Date(),
            approved_by_id: approval_id,
            review: review_string
        }
    }).catch(e => {
        throw new Error(e)
    });

    return updateLog
}
