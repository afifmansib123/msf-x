import prisma from "../../../PrismaConnect";
import * as crypto from "crypto";
export default async function handler(req, res) {
    // example url:  /api/gift?status=success&&trn=sdakdaskdj12321321 --> for transaction success
    //example url: /api/gift?status=fail&&trn=sdakdaskdj12321321 --> for transaction success

  const { query } = req;

  if (query.status === "success") {
    const user_id = parseInt(query.user_id);
    const package_id = parseInt(query.package_id);
    const trx_id = query.trx_id;
    const total_amount = parseInt(query.total_amount);
    const pay_id = parseInt(query.pay_method);
    // add record to DB
    try {
      await prisma.MerchantStorefront_merchantpackage.create({
        data: {
          created_at: new Date(),
          updated_at: new Date(),
          user_id_id: user_id,
          package_id_id: package_id
        }
      }).catch(e => {throw Error(e)});

      await prisma.MerchantStorefront_paymenthistory.create({
        data: {
          status: (pay_id === 3),
          remark: null,
          timestamp: new Date(),
          updated_at: new Date(),
          package_id_id: package_id,
          payment_method_id: pay_id,
          user_id_id: user_id,
          trx_id: trx_id,
          amount: total_amount
        }
      }).catch(e => {
        throw Error(e)
      });
      await createPerkHistory(package_id, user_id);
    } catch (e) {
      console.error(e)
      return res.redirect(302, `/msf/giftcard?res_status=fail&message=${encodeURIComponent(e.message)}.&title=Something went wrong, Cannot buy the package`);
    }
    // and redirect to msf/giftcard

    return res.redirect(302, '/msf/giftcard?res_status=success&message=payment success, your have purchase the gift voucher.&title=Package Payment Succeed');

  } else if (query.status === "fail") {

    // Redirect to msf/giftcard but shows error

    return res.redirect(302, '/msf/giftcard?res_status=fail&message=payment fail, please contract admin.&title=Something went wrong, Cannot buy the package');

  } else {
    return res.redirect(302, '/msf/giftcard?res_status=cancel&message=payment have already cancel.&title=Package payment canceled');
  }

}

async function createPerkHistory(package_id, merchant_id) {
  let perks = await prisma.MerchantStorefront_perks.findMany({
    where: {
      package_id_id: package_id
    }
  }) || [];
  perks = JSON.parse(JSON.stringify(perks, (key, value) => (typeof value === "bigint" ? parseInt(value) : value)));

  console.log(perks)

  const perk_history = perks.map(perk => {
    let serial_number = perk.id.toString() + package_id.toString() + merchant_id.toString();
    serial_number = crypto.createHash('md5').update(serial_number).digest('hex');
    const amount_used = 0 ;
    const amount_remain = 10;
    const unit = perk.unit;
    const created_at = new Date();
    const expired_at = new Date()

    expired_at.setFullYear(expired_at.getFullYear() + 1);
    const perk_id = perk.id;
    const recorded_by = merchant_id;

    return {
      serial_number: serial_number,
      amount_used: amount_used,
      amount_remain: amount_remain,
      unit: unit,
      created_at: created_at,
      expired_at: expired_at,
      perk_id: perk_id,
      recorded_by: recorded_by
    }
  });

  for (const perk_data of perk_history) {
      await prisma.MerchantStorefront_merchantperkhistory.create({
        data: {
          serial : perk_data.serial_number || null,
          amount_used: perk_data.amount_used || 0,
          amount_remain: perk_data.amount_remain || 10,
          unit: perk_data.unit.toString() || null,
          recorded_by_id: perk_data.recorded_by || null,
          created_at: perk_data.created_at,
          expired_at: perk_data.expired_at,
          perk_id_id: perk_data.perk_id || null
        }
    }).catch(e => {
      console.error(e);
      throw Error(e)

    });
  }
}