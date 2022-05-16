import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
    // example url:  /api/gift?status=success&&trn=sdakdaskdj12321321 --> for transaction success
    //example url: /api/gift?status=fail&&trn=sdakdaskdj12321321 --> for transaction success

  const { query } = req;

  if (query.status === "success") {
    const user_id = parseInt(query.user_id);
    const package_id = parseInt(query.package_id);
    const trx_id = query.trx_id;
    const total_amount = parseInt(query.total_amount);
    // add record to DB
    try {
      await prisma.MerchantStorefront_merchantpackage.create({
        data: {
          created_at: new Date(),
          updated_at: new Date(),
          user_id_id: user_id,
          package_id_id: package_id
        }
      });

      await prisma.MerchantStorefront_paymenthistory.create({
        data: {
          status: false,
          remark: null,
          timestamp: new Date(),
          updated_at: new Date(),
          package_id_id: package_id,
          payment_method_id: 3,
          user_id_id: user_id,
          trx_id: trx_id,
          amount: total_amount
        }
      });
    } catch (e) {
      console.error(e)
      return res.redirect(302, `/msf/giftcard?error=Failed&message=err`);
    }
    // and redirect to msf/giftcard

    return res.redirect(302, '/msf/giftcard');

  } else {

    // Redirect to msf/giftcard but shows error

    return res.redirect(302, '/msf/giftcard?error=Failed&message=testing');

  }

}