/**
 * PATCH to update logo_url and backdrop_url
 * @param {*} req
 * @param {*} res
 */

import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  let { id } = req.query;
  if (req.method === "PUT") {
    try {
      let { body } = req;
      console.log(body);

      let patchedStore = await prisma.MerchantStorefront_store.update({
        where: {
          id: BigInt(id),
        },
        data: body,
      });

      patchedStore = JSON.parse(
        JSON.stringify(patchedStore, (key, value) => (typeof value === "bigint" ? value.toString() : value))
      );

      res.status(200).json(patchedStore);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "PATCH") {
    try {
      let { body } = req;
      // console.log(body);
      let { logo_url, backdrop_url } = body;

      let patchedStore = await prisma.MerchantStorefront_store.update({
        where: {
          id: BigInt(id),
        },
        data: {
          logo_url,
          backdrop_url,
        },
      });

      patchedStore = JSON.parse(
        JSON.stringify(patchedStore, (key, value) => (typeof value === "bigint" ? value.toString() : value))
      );

      res.status(200).json(patchedStore);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
