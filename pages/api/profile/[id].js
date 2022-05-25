/**
 * PATCH to update logo_url and backdrop_url
 * @param {*} req
 * @param {*} res
 */

 import prisma from "/PrismaConnect";

 export default async function handler(req, res) {
     let { id } = req.query;
     if (req.method === "PATCH") {
         try {
             let { body } = req;
             // console.log(body);
             let { image_url } = body;
 
             let patchedUser = await prisma.UsersApp_customuser.update({
                 where: {
                     id: BigInt(id),
                 },
                 data: {
                     image_url
                 },
             });
 
             patchedUser = JSON.parse(
                 JSON.stringify(patchedUser, (key, value) => (typeof value === "bigint" ? value.toString() : value))
             );
 
             res.status(200).json(patchedUser);
         } catch (error) {
             console.error(error);
             res.status(500).json(error);
         }
     }
 }
 