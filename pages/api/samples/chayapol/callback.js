// import { prisma, PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  const { query } = req;
  if (query.status === "success") {
    // add record to DB
    // and redirect to msf/giftcard
    res.redirect(302, '/msf/giftcard')
  } else {
    // Redirect to msf/giftcard but shows error
    res.redirect(302, '/msf/giftcard?error=Failed')
  }
}
sssss