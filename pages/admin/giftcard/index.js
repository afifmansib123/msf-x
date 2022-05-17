import React from 'react'

import Admin from "layouts/Admin.js";
import Button from '@mui/material/Button';
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import axios from 'axios';

export default function GifCardList() {
  const {data: session, status} = useSession();
  const router = useRouter()

  // Test Pay with SSLC
  const testPayOnline = async () => {
    const dataParams = {
      total_amount: 1000, 
      user_id: session.token.id,
      package_id: 1,
      cus_name: session.token.name,
      cus_city: "",
      cus_country: "Bangladesh",
      shipping_method: "NO",
      multi_card_name: "",
      num_of_item: 1,
      product_name: `BG Gift Card 1`,
      product_category: "Gift Card",
      product_profile: "MSF",
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}payment/payonline`,
      dataParams
    );

    // TODO evaluate the response status
    console.log("Response from Gateway",res.data)
    router.push(res.data.GatewayPageURL)
  }

  return (
    <div>
      <h1 className="font-bold text-2xl">Gift Cards</h1>
      <Button onClick={()=>testPayOnline()} variant="contained" className="bg-bhalogari">Pay Online</Button>
    </div>
  )
}
GifCardList.layout = Admin;