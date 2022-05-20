import React, { useState, Component, CSSProperties } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useRouter } from "next/router";

// layout for this page
import MSF from "layouts/MSF.js";
// import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";

import { getSession, useSession, signOut } from "next-auth/react";
import AccessDenied from "components/accessDenied";

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
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PrismaClient } from "@prisma/client";

import { format } from 'date-fns'

const styles = {
  pics: {
    height: '20%',
  },
  arrows: {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },

}


function Storefront(props) {
  const { promotions, user, packages } = props;
  console.log("MSF[user]", user);
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // const { data: session, status } = useSession();
  // const cryptr = new Cryptr(process.env.NEXT_PUBLIC_BG_API_SECRET_KEY);

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





  return (
    <GridContainer>
      <h1 className="text-2xl font-bold pl-4">Welcome {user.name}</h1>
      <GridItem xs={12} sm={12} md={12}>

        <div style={{ height: '55vh', width: '80%', margin: 'auto', backgroundColor: 'grey' }}>
          <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <IconButton className={classes.arrows} aria-label="arrowBackIosNew" onClick={onClickHandler} style={{ left: 15 }}>
                  <ArrowBackIosNewIcon />
                </IconButton>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <IconButton className={classes.arrows} aria-label="arrowForwardIos" onClick={onClickHandler} style={{ right: 15 }}>
                  <ArrowForwardIosIcon />
                </IconButton>
              )
            }

          >
            {promotions.map((m, i) => {
              return (
                <div style={{ height: '55vh', width: '100%', margin: 'auto' }} className={classes.pics}>
                  <img style={{ height: '100%', width: '100%' }} src={m.image_url} />

                </div>
              );
            })}
          </Carousel>

        </div>


        <Card>
          <CardHeader color="warning" >
            <h1 className="text-xl font-bold">Packages</h1>
          </CardHeader>
          <CardBody>
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
                      <TableCell>{row.created_at ? format(new Date(row.created_at), "dd MMM yyyy") : "-"}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>


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
