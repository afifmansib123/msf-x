import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
    try {
        if(req.method === "GET") {
            const data = await getGiftPackage();
            return res.status(200).json(data);
        }
    } catch (e) {
        console.log("go error")
    }
}

export async function getGiftPackage() {
    let response = await prisma.MerchantStorefront_package.findMany({
        where: {
            package_type: "Gift"
        }
    });

    response = JSON.parse(JSON.stringify(response, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
    response = response.map(async v => {
        const id = parseInt(v.id);
        let packageDetail = await prisma.MerchantStorefront_perks.findMany({
            where: {
                package_id_id: id
            }
        });
        packageDetail = JSON.parse(JSON.stringify(packageDetail, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

        return {
            ...v,
            packageDetail: packageDetail
        }
    });

    return Promise.all(response.map((item) => item));

}