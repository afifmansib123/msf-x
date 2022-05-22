import { PrismaClient } from "@prisma/client";
import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {

    console.log("data11", req.body)
    const { body: data } = req;
    let newMessage = await prisma.MerchantStorefront_messagetoadmin.create({
      data: {
        user_id_id: data.user_id_id,
        subject: data.subject,
        message: data.message,
        status: 'waiting',
        updated_at: new Date(),
      }
    });

    newMessage = JSON.parse(JSON.stringify(newMessage, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
    return res.status(200).json({
      data: newMessage,
    });

  } else if (req.method === "GET") {

    const { page } = req.query;
    try {
      const data = await getMessageList(parseInt(page));
      console.log(data)

      return res.status(200).json(data);
    } catch (e) {
      console.error(e)
      return res.status(200).json([]);
    }
  }

}
async function getMessageList(page) {
  let messages;

  if (page === 1) {
    messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
      take: 5,
      orderBy: {
        id: 'asc'
      },

    });
  } else {
    messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
      skip: (page * 5),
      take: 5,
      orderBy: {
        id: 'asc'
      },

    });
  }

  messages = JSON.parse(
    JSON.stringify(messages, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
  ) || [];



  messages = Promise.all(messages.map((item) => item));
  messages = await messages;
  console.log(messages);

  return {
    messages: messages,
  }
}


