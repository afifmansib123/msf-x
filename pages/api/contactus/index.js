// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";


export default async function handler(req, res) {
  // const prisma = new PrismaClient();
  const { page, filter1, filter2 } = req.query;

  if (req.method === "POST") {

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

  }
  else if (req.method === "GET") {
    try {
      const data = await getMessageList(parseInt(page), filter1, filter2);
      console.log(data)

      return res.status(200).json(data);
    } catch (e) {
      console.error(e)
      return res.status(200).json([]);
    }
  }
}

async function getMessageList(page, filter1, filter2) {
  let messages;
  console.log(filter1, filter2)

  if (page === 1) {
    if (filter1 == 'true' && filter2 == 'true') {
      console.log("option1")
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        take: 6,
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        }
      });
    }
    else if (filter1 == 'true') {
      console.log("option2")
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        take: 6,
        where: {
          status: 'waiting'
        },
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        }
      });
    }
    else if (filter2 == 'true') {
      console.log("option3")
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        take: 6,
        where: {
          status: 'solved'
        },
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        }
      });
    }
    else {
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        take: 6,
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        }
      });
    }
  }


  else {
    if (filter1 == 'true' && filter2 == 'true') {
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        skip: ((page - 1) * 6),
        take: 6,
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        }
      });
    }
    else if (filter1 == 'true') {
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        skip: ((page - 1) * 6),
        take: 6,
        where: {
          status: 'waiting'
        },
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        }
      });
    }
    else if (filter2 == 'true') {
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        skip: ((page - 1) * 6),
        take: 6,
        where: {
          status: 'solved'
        },
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        },
      });
    }
    else {
      messages = await prisma.MerchantStorefront_messagetoadmin.findMany({
        skip: ((page - 1) * 6),
        take: 6,
        orderBy: {
          id: 'asc'
        },
        include: {
          UsersApp_customuser: true,
        },
      });
    }

  }

  messages = JSON.parse(
    JSON.stringify(messages, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
  ) || [];

  messages = Promise.all(messages.map((item) => item));
  messages = await messages;

  return {
    messages: messages,
  }
}


