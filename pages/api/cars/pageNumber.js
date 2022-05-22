import { PrismaClient } from "@prisma/client";
import prisma from "PrismaConnect";
export default async function handler(req, res) {
    const prisma = new PrismaClient();
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

    let carCount = await prisma.CarsApp_carapprovallog.count({
        where: filtering
    });

    // console.log("car count", carCount)

    return res.status(200).json({data: carCount});

}