import React, { useState } from "react";
import Link from "next/link";
import Login from "../components/Login/Login";
import TopBar from "../components/TopBar/TopBar";

function Index(props) {
  return (
    <div className="">
      <TopBar></TopBar>
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
      <Login />
    </div>
  );
}

export async function getStaticProps(context) {
  // console.log("LANDING_PAGE", process.env.LANDING_PAGE);
  return {
    props: {
      // landingPage: process.env.LANDING_PAGE ? process.env.LANDING_PAGE : null,
    },
  };
}

export default Index;
