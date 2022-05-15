import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
    // example url:  /api/gift?status=success&&trn=sdakdaskdj12321321 --> for transaction success
    //example url: /api/gift?status=fail&&trn=sdakdaskdj12321321 --> for transaction success

  const { query } = req;

  if (query.status === "success") {
    console.log("test")
    // add record to DB

    // and redirect to msf/giftcard

    res.redirect(302, '/msf/giftcard')

  } else {

    // Redirect to msf/giftcard but shows error

    res.redirect(302, '/msf/giftcard?error=Failed')

  }

}