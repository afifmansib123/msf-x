import React from "react";
import Link from "next/link";
import Login from "../components/Login/Login";

function Index(props) {
  return (
    <div className="m-10">
      {/* <h1 className="font-bold text-3xl">Bhalogari Merchant Storefront</h1>
      Sell Your Cars Like a Pro!
      <ul>
        <li>
          <Link href="/msf">Merchant Storefront</Link>
        </li>
        <li>
          <Link href="/admin">BG Admin Panel</Link>
        </li>
      </ul> */}
      <Login/>
    </div>
  );
}

export default Index;
