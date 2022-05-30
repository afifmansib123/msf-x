import prisma from "/PrismaConnect";

export default async function handler(req, res) {
   if (req.method === "GET") {
       let data = await prisma.MerchantStorefront_merchantpackage.findMany({

            include: {
                MerchantStorefront_package: {

                    select: {
                        package_name: true
                    }
                },
                UsersApp_customuser: {
                    select: {
                        id:true
                    }
                }
            }
       });

       data = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? parseInt(value) : value)));

       return res.status(200).json({
           data: data
       });
   }
}