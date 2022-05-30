// Show data of a merchant
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  // const prisma = new PrismaClient();
  const { id } = req.query;
  try {
    console.log("id", id);
    // const data = await getMerchantList(page?parseInt(page):1);
    let merchant = await prisma.UsersApp_customuser.findUnique({
      where: { id: BigInt(id) },
    });

    merchant =
      JSON.parse(JSON.stringify(merchant, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))) || [];

    let store = await prisma.MerchantStorefront_store.findFirst({
      where: { owner_user_id: BigInt(id) },
    });

    store =
      JSON.parse(JSON.stringify(store, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))) || [];

    return res.status(200).json({ merchant, store });
  } catch (e) {
    console.error(e);
    return res.status(200).json(e);
  }
}

async function getMerchantList(page = 1) {
  let merchants;

  if (page === 1) {
    merchants = await prisma.UsersApp_customuser.findMany({
      take: 10,
      orderBy: {
        id: "asc",
      },
    });
  } else {
    merchants = await prisma.UsersApp_customuser.findMany({
      skip: page * 10,
      take: 10,
      orderBy: {
        id: "asc",
      },
    });
  }

  merchants =
    JSON.parse(JSON.stringify(merchants, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))) || [];

  merchants = Promise.all(merchants.map((item) => item));
  merchants = await merchants;
  console.log(merchants);

  return {
    merchants: merchants,
  };
}
