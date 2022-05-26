import prisma from "../../../PrismaConnect";
import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    var promo;
    try {
        const id = req.query.id;
        console.log(id)
        if (req.method == "GET" && id != undefined) {
            const int_id = parseInt(id);
            const data = await prisma.MerchantStorefront_promotion.findUnique({
                where: {
                    id: int_id
                }
            }).catch(err => { throw new Error(err) });

            const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

            return res.status(200).json({
                data: parsedData
            })
        }

        else if (req.method == "DELETE" && id != undefined) {
            const int_id = parseInt(id);
            const deletePromo = await prisma.MerchantStorefront_promotion.delete({
                where: {
                    id: int_id,
                },
            }).catch(err => { throw new Error(err) });
            return res.status(200).json({
                success: true,
            })
        }


        else if (req.method === "PUT" && id != undefined) {
            const int_id = parseInt(id);
            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {

                promo = {
                    headline: fields.headline,
                    description: fields.description,
                    image_url: fields.file,
                    created_by_id: parseInt(fields.created_by_id),
                    // created_at: new Date(),  default to database
                    start_at: new Date(fields.start_at),
                    end_at: new Date(fields.end_at),
                    // UsersApp_customuser: fields.created_by_id, // Redundant, not sure we should use it.
                }

                try {
                    //   console.log("promo", promo);
                    var newPromo = await prisma.MerchantStorefront_promotion.update({
                        where: {
                            id: int_id,
                        },
                        data: promo,
                    });

                    newPromo = JSON.parse(
                        JSON.stringify(newPromo, (key, value) => (typeof value === "bigint" ? value.toString() : value))
                    );

                    //   console.log("newPromo", newPromo);
                    res.status(200).json(newPromo);
                } catch (err) {
                    console.error(err);
                    res.status(500).json(err);
                }
            });

        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
