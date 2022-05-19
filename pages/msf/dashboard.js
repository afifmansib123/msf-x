import React, { useState } from "react";
import { useRouter } from "next/router";
// import makeStyles from "@mui/styles/makeStyles";
// layout for this page
import MSF from "layouts/MSF.js";
// import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";

import { getSession, useSession, signOut } from "next-auth/react";
import AccessDenied from "components/accessDenied";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
// import Cryptr from "cryptr";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PrismaClient } from "@prisma/client";

import { format } from 'date-fns'
function Storefront(props) {
  const { promotions, user, packages } = props;
  console.log("MSF[user]", user);

  // const { data: session, status } = useSession();
  // const cryptr = new Cryptr(process.env.NEXT_PUBLIC_BG_API_SECRET_KEY);

  // const useStyles = makeStyles(styles);
  // const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  // When rendering client side don't display anything until loading is complete
  // console.log("Session Status", status);
  // if (typeof window !== "undefined" && status) return null;

  // If session exists, display content

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleTestUpdateInfo = () => {
    // This is to test call the API to update info
    // const access_token = localStorage.getItem("access_token");
    // const token = cryptr.decrypt(access_token);
    console.log("Sessoin Info", session);
    alert("See session info in Dev Console");
  };

  function convertTime(date) {
    var readable = new Date(date);
    var m = readable.getMonth();
    var d = readable.getDay();
    var y = readable.getFullYear();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var fulldate = months[m] + " " + d + ", " + y;
    return fulldate;
  }

  return (
    <GridContainer>
      <h1 className="text-2xl font-bold">Welcome {user.name}</h1>
      {/* <h1>Merchant ID: {id}</h1> */}
      {/* <Button onClick={handleSignOut}>Sign Out</Button>
      <Button onClick={handleTestUpdateInfo}>test Update Info</Button> */}
      <GridItem xs={12} sm={12} md={12}>
        <div className="relative flex items-center">
          <div id="slider" className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
            {promotions.map((m, i) => {
              return (
                <div
                  key={i}
                  className="relative h-64 m-8 overflow-hidden bg-indigo-500 rounded-lg w-10/12 inline-block p-2"
                >
                  <div className="absolute z-30 flex w-full h-full">
                    <div className="relative z-30 w-5/6 px-5 py-3 text-white md:py-3 md:w-1/2 whitespace-normal">
                      <h2 className="text-4xl w-5/6 overflow-wrap">{m.headline}</h2>
                      <div className="text-xl w-[32rem] overflow-wrap">{m.description}</div>
                      <div className="absolute bottom-5 left-5">
                        <div className="text-xl">Strat at {convertTime(m.start_at)}</div>
                        <div className="text-xl">End at {convertTime(m.end_at)}</div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-0 flex w-full h-full">
                      <div className="w-3/12 h-full bg-indigo-500"></div>
                      <div className="relative w-1/3">
                        <svg
                          fill="currentColor"
                          viewBox="0 0 100 100"
                          className="absolute inset-y-0 z-20 h-full text-indigo-500"
                        >
                          <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
                        </svg>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 100 100"
                          className="absolute inset-y-0 z-10 h-full ml-6 text-white opacity-50"
                        >
                          <polygon points="0,0 100,0 50,100 0,100"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 block w-9/12 h-full">
                    <img alt="Snowy mountain lake" className="object-cover h-full min-w-full" src={m.image_url} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h1 className="text-xl font-bold">Packages</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Bought On</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.package_name}
                  </TableCell>
                  <TableCell>{row.created_at ? format(new Date(row.created_at),"dd MMM yyyy"):"-"}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GridItem>
    </GridContainer>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log("dashboard.session", session);
  const prisma = new PrismaClient();

  // UserInfo
  var userPackages = await prisma.merchantStorefront_merchantpackage.findMany({
    where: {
      user_id_id: session.token.id,
    },
    select: {
      MerchantStorefront_package: true,
    },
    orderBy: { created_at: "desc" },
  });

  // The package is nested
  userPackages = userPackages.map((p) => p.MerchantStorefront_package);
  userPackages = JSON.parse(
    JSON.stringify(userPackages, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  console.log("package", userPackages);

  // Promotions
  var allPromotions = await prisma.MerchantStorefront_promotion.findMany({});
  allPromotions = JSON.parse(
    JSON.stringify(allPromotions, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  // console.log("promotions: ", allPromotions[0]);

  return {
    props: {
      promotions: allPromotions,
      // next-auth prevent from sending sensitive information, passing session object will get undefined
      // session: session,
      user: session.user,
      packages: userPackages,
    },
  };
}

Storefront.layout = MSF;
Storefront.auth = true;
export default Storefront;
