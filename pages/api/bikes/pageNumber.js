import prisma from "/PrismaConnect";

export default async function handler(req, res) {
    const statusArr = [];
    var filtering = {};
    let {page, status, searchBy, searchState} = req.query;
    if (status) {
        status = JSON.parse(status);
        if (status.Approved) {
            statusArr.push("A");
        }
        if (status.Rejected) {
            statusArr.push("R");
        }

        if (status.Pending) {
            statusArr.push("P");
        }
    }

    if (searchState) {
        searchState = JSON.parse(searchState);
    }

    if (statusArr.length > 0) {
        filtering = {
            status: {
                in: statusArr
            }
        }
    }

    console.log(filtering)

    let bikeCount = await prisma.BikesApp_bikeapprovallog.count({
        where: filtering
    });

    return res.status(200).json({data: bikeCount});

}