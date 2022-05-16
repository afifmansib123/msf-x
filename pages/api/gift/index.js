import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
    // example url:  /api/gift?status=success&&trn=sdakdaskdj12321321 --> for transaction success
    //example url: /api/gift?status=fail&&trn=sdakdaskdj12321321 --> for transaction success

  const { query } = req;

  if (query.status === "success") {
    console.log("test")
    // add record to DB
    try {
      await prisma.MerchantStorefront_merchantpackage.create({
        data: {
          created_at: new Date(),
          updated_at: new Date(),
          user_id_id: 20,
          package_id_id:6
        }
      });

      await prisma.MerchantStorefront_paymenthistory.create({
        data: {
          status: false,
          remark: null,
          timestamp: new Date(),
          updated_at: new Date(),
          package_id_id: 6,
          payment_method_id: 1,
          user_id_id: 20
        }
      });
    } catch (e) {
      res.redirect(302, `/msf/giftcard?error=Failed&&message=${e}`);
    }
    // and redirect to msf/giftcard

    res.redirect(302, '/msf/giftcard');

  } else {

    // Redirect to msf/giftcard but shows error

    res.redirect(302, '/msf/giftcard?error=Failed&&message=testing');

  }

}