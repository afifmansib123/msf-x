/**
 * See https://github.com/sslcommerz/SSLCommerz-NodeJS
 * TODO validate transaciton
 * TODO check status of a transasction
 */

import { PrismaClient } from "@prisma/client";
import uuid from "react-uuid";

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "bhalo61261f787f02b";
const store_passwd = "bhalo61261f787f02b@ssl";
const is_live = false; //true for live, false for sandbox

// export SSLC_STORE_ID=bhalo61261f787f02b
// export SSLC_STORE_PASS=bhalo61261f787f02b@ssl
// export SSLC_TR_IP=https://api-a.bhalogari.com
// export PAYMENT_METHOD=SSLCOMMERZ
// export PAYMENT_SUCCESS_URL=https://bhalogari-web-uat.herokuapp.com/payment-status?status=success
// export PAYMENT_FAIL_URL=https://bhalogari-web-uat.herokuapp.com/payment-status?status=fail
// export PAYMENT_CANCEL_URL=https://bhalogari-web-uat.herokuapp.com/payment-status?status=cancel
// export PAYMENT_IPN_URL=https://api-a.bhalogari.com/api/payment/ipn
// export MERCHANT_PAYMENT_SUCCESS_URL=http://localhost:3000/msf/subscriptions?status=success
// export MERCHANT_PAYMENT_FAIL_URL=http://localhost:3000/msf/subscriptions?status=fail
// export MERCHANT_PAYMENT_CANCEL_URL=http://localhost:3000/msf/subscriptions?status=cancel
// export MERCHANT_PAYMENT_IPN_URL=http://18.136.247.15:8000/api/merchant-storefront/package-payment-ipn/
// export ISSANDBOX=TRUE

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { body } = req;
    // 1. Extract data
    // 2. pass to SSLC
    // 3. Create a record in payment history
    // 4. Generate Transaction ID (TRX)
    // ssl_settings = {'store_id': settings.SSLC_STORE_ID, 'store_pass': settings.SSLC_STORE_PASS, 'issandbox': settings.ISSANDBOX}
    // sslcz = SSLCOMMERZ(ssl_settings)

    // post_body = {}
    // post_body['total_amount'] = total_amount
    // post_body['currency'] = "BDT"
    // post_body['tran_id'] = tran_id
    // # post_body['success_url'] = settings.PAYMENT_SUCCESS_URL
    // post_body['success_url'] = 'https://api-a.bhalogari.com/api/merchant-storefront/package-payment-ipn/'
    // # post_body['success_url'] = 'http://127.0.0.1:8000/api/merchant-storefront/package-payment-ipn/'
    // post_body['fail_url'] = settings.MERCHANT_PAYMENT_FAIL_URL
    // post_body['cancel_url'] = settings.MERCHANT_PAYMENT_CANCEL_URL
    // post_body['ipn_url'] = settings.MERCHANT_PAYMENT_IPN_URL
    // post_body['emi_option'] = 0
    // post_body['cus_name'] = cus_name
    // post_body['cus_email'] = customer.email
    // post_body['cus_phone'] = customer.contact_number
    // post_body['cus_add1'] = customer.address
    // post_body['cus_city'] = cus_city
    // post_body['cus_country'] = cus_country
    // post_body['shipping_method'] = shipping_method
    // # post_body['multi_card_name'] = 'visacard,mastercard,amexcard'
    // post_body['num_of_item'] = num_of_item
    // post_body['product_name'] = product_name
    // post_body['product_category'] = product_category
    // post_body['product_profile'] = product_profile
    // post_body['vat'] = vat
    const trn_id = uuid();
    const total_amount = parseInt(body.total_amount);
    const user_id = parseInt(body.user_id);
    const package_id = parseInt(body.package_id);
    const cus_name = "test_name"
    const cus_email = "customer@example.com"
    const pay_method = parseInt(body.pay_method) || 3;

    const success_url = `http://localhost:3000/api/gift?status=success&trx_id=${trn_id}&total_amount=${total_amount}&user_id=${user_id}&package_id=${package_id}&pay_method=${pay_method}`;
    const fail_url = `http://localhost:3000/api/gift?status=fail&trx_id=${trn_id}&total_amount=${total_amount}&user_id=${user_id}&package_id=${package_id}&pay_method=${pay_method}`;
    const cancel_url = `http://localhost:3000/api/gift?status=cancel&trx_id=${trn_id}&total_amount=${total_amount}&user_id=${user_id}&package_id=${package_id}&pay_method=${pay_method}`;

    const data = {
      total_amount: total_amount,
      currency: "BDT",
      tran_id: trn_id, // use unique tran_id for each api call
      success_url: success_url,
      fail_url: fail_url,
      cancel_url: cancel_url,
      ipn_url: "http://localhost:3000/admin/giftcard/payment/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: cus_name,
      cus_email: cus_email ,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    // .then(apiResponse => {
    //     // Redirect the user to payment gateway
    //     let GatewayPageURL = apiResponse.GatewayPageURL
    //     res.redirect(GatewayPageURL)
    //     console.log('Redirecting to: ', GatewayPageURL)
    // });
    // Redirect the user to payment gateway
    console.log("apiResponse",apiResponse)
    let {GatewayPageURL} = apiResponse;
    if (!GatewayPageURL) {
      return res.status(200).send("http://localhost:3000/api/gift?status=fail")
    }
    return res.status(200).send(GatewayPageURL);
    // console.log("Redirecting to: ", GatewayPageURL);
    // res.status(200).json({ trx: uuid(), ...req.body });
    // return;
  }
  /*
   const prisma = new PrismaClient();
   var cars = await prisma.CarsApp_car.findMany({
     where: {
       // business_user: true,
     },
     // include: {
     //   BusinessesApp_businesstype: true,
     //     // CarsApp_carmodel: true,
     //   }
   })
 
   cars = JSON.parse(
     JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? value.toString() : value))
   );
 
 
   console.log(cars)
   */

  // res.status(200).json("Hello");
}
