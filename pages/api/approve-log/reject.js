import prisma from "../../../PrismaConnect";

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

async function updateApprove({review_string, approval_id, car_id}) {
    const car_approve = await prisma.CarsApp_carapprovallog.create({
        data: {
            is_approved: false,
            created_at: new Date(),
            updated_at: new Date(),
            approved_by_id: approval_id,
            car_id_id: car_id,
            review: review_string,
            status: "R"
        }
    }).catch(err => {
        throw new Error(err);
    });

    return car_approve
}
