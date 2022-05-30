// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  // const prisma = new PrismaClient();
  var packages = await prisma.MerchantStorefront_package.findMany({
    // where: {
    // business_user: true,
    // },
    include: {
      MerchantStorefront_packagedetails: true,
    },
  });

  packages = JSON.parse(
    JSON.stringify(packages, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  console.log(packages);

  res.status(200).json(packages);
}
