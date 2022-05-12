import React from "react";
import Link from "next/link";
import TopBar from "../components/TopBar/TopBar";

function Index(props) {
  return (
    <div>
      <TopBar></TopBar>
      <h1 className="font-bold text-3xl">Bhalogari Merchant Storefront</h1>
      Sell Your Cars Like a Pro!
      <ul>
        <li>
          <Link href="/msf">Merchant Storefront</Link>
        </li>
        <li>
          <Link href="/admin">BG Admin Panel</Link>
        </li>
      </ul>
    </div>
  );
}

export default Index;
