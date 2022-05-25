/**
 * 
 */
 import prisma from "/PrismaConnect";
 // import formidable from "formidable";
 // import fs from "fs";
 
 
 export const config = {
     api: {
         bodyParser: true,
     },
 };
 
 export default async function handler(req, res) {
     // let { id } = req.query;
     console.log(req.body);
     if (req.method === "PATCH") {
         try {
             let { body } = req;
             // console.log(body);
             let { first_name, last_name, email, user_id, date_of_birth, gender, post_code, nid_number, country, tin_number, address, contact_number } = body;
 
             let patchedUser = await prisma.UsersApp_customuser.update({
                 where: {
                     id: user_id,
                 },
                 data: {
                     first_name,
                     last_name,
                     email,
                     date_of_birth,
                     gender,
                     post_code,
                     nid_number,
                     country,
                     tin_number,
                     address,
                     contact_number
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
 
 