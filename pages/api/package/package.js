// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  //POST: Create new package
  try {
    const { body: data } = req;
    // const prisma = new PrismaClient();
    if (req.method === "POST") {
      const { body: data } = req;
      var newPackage = await prisma.MerchantStorefront_package.create({
        data: {
          // id: BigInt(data.id),
          package_name: data.name,
          price: BigInt(data.price),
          package_type: data.type,
          created_at: new Date(),
          updated_at: new Date(),
          description: data.description,
          amount: data.amount,
          unit: data.unit,
        },
      });

      // Handle BigInt issue (Some fields in PostgreSQL is BigInt, but JS does know BigInt)
      newPackage = JSON.parse(
        JSON.stringify(newPackage, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
      console.log("newPerk", newPackage);
      res.status(200).json(newPackage);
    } else if (req.method === "PUT") {
      const { body: data } = req;
      // console.log("Im from front", data.id)
      var updatedPackage = await prisma.MerchantStorefront_package.update({
        where: {
          id: BigInt(data.id),
        },
        data: {
          // id: BigInt(data.id),
          package_name: data.name,
          price: BigInt(data.price),
          package_type: data.type,
          unit: data.unit,
          description: data.description,
          amount: data.amount,
          // created_at: new Date(),
          updated_at: new Date(),
        },
      });

      updatedPackage = JSON.parse(
        JSON.stringify(updatedPackage, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
      // console.log("newPerk", newPerk);
      res.status(200).json(updatedPackage);
    } else if (req.method === "DELETE") {
      const { body: data } = req;
      // console.log("Im from front", data.id)
      var deletedPerk = await prisma.MerchantStorefront_package.delete({
        where: {
          id: BigInt(data.id),
        },
      });

      deletedPerk = JSON.parse(
        JSON.stringify(deletedPerk, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );

      res.status(200).json(deletedPerk);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  //res.status(200).json(data);
  return;
}
