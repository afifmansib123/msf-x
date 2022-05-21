/**
 * List of stores
 * @author Chayapol
 */
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  let data = await prisma.MerchantStorefront_store.findMany({
    // orderBy: {
    //   start_at: 'desc'
    // }
  });
  console.log(data);
  data = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
  res.status(200).json({ data: data });
}
