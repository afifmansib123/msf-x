import prisma from "/PrismaConnect";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};



export default async function handler(req, res) {
  var promo;

  if (req.method === "GET") {
    let data = await prisma.MerchantStorefront_promotion.findMany({
      orderBy: { 
        start_at: 'desc'
      }
    });

    data = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
    return res.status(200).json({
      data: data,
    });


  } else if (req.method === "POST") {
    // console.log("req", req); // if bodyParser = false, there won't be "body" attribute in req.
    // const { body: data } = req;
    // console.log("req.body", req.body);

    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      // console.log("fields", fields)
      // console.log("files", files)
      await saveFile(files.file);

      promo = {
        headline: fields.headline,
        description: fields.description,
        image_url: `/banner/${files.file.newFilename}.jpg`,
        created_by_id: parseInt(fields.created_by_id),
        // created_at: new Date(),  default to database
        start_at: new Date(fields.start_at),
        end_at: new Date(fields.end_at),
        // UsersApp_customuser: fields.created_by_id, // Redundant, not sure we should use it.
      };

      // return res.status(201).send("");

      try {
        var newPromo = await prisma.MerchantStorefront_promotion.create({
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

    const saveFile = async (file) => {
      const data = fs.readFileSync(file.filepath);
      fs.writeFileSync(`public/banner/${file.newFilename}.jpg`, data);
      await fs.unlinkSync(file.filepath);
    };
  }
}
