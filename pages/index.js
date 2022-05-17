import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Login from "../components/Login/Login";
import TopBar from "../components/TopBar/TopBar";
import sideImage from "../assets/Header/ss.0bdbffc9.png";

function Index(props) {
  return (
    <div className="">
         {/* <Image  className="float-right ..."  src={sideImage}></Image> */}
        {/* <TopBar></TopBar> */}
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
