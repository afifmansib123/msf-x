import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import makeStyles from "@mui/styles/makeStyles";
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CarCrashIcon from "@mui/icons-material/CarCrash";

import Button from "@mui/material/Button";

// import Cryptr from "cryptr";
import GridItem from "components/Grid/GridItem.js";
import { format } from "date-fns";
// layout for this page
import MSF from "layouts/MSF.js";
// import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const styles = {
  pics: {
    height: "20%",
  },
  arrows: {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
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
};
import styles2 from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { es, th } from "date-fns/locale";
function StoreDashboardPage(props) {
  const { promotions, user, userId, packages, acceptedCar, rejectedCar, pendingCar } = props;
  // console.log(props.MerchantStorefront_package?.package_type);
  // console.log("MSF[user]", user);
  // const [subType, setSubType] = useState('');
  // console.log(packages);
  let subType = "";
  const useStyles = makeStyles(styles);

  const classes = useStyles();

  const useStyles2 = makeStyles(styles2);
  const classes2 = useStyles2();
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

  function test() {
    console.log(allCars);
    // console.log(acceptedCar, rejectedCar, pendingCar);
  }
  // packages.map(p =>{console.log(p.MerchantStorefront_package.package_name)});

  // sort the array in descending order and pick the last package
  let arr = [];
  packages.map((p) => {
    // console.log(p.MerchantStorefront_package.package_type);

    if (p.MerchantStorefront_package.package_type == "subscription") {
      // subType = p.MerchantStorefront_package.package_name;
      arr.push(p);
    }
  });

  // TODO sorting by id for the package, does not guarantee type of subscription!
  arr.sort((a, b) => b.id - a.id);
  if (arr.length > 0) {
    subType = arr[0].MerchantStorefront_package.package_name;
  } else {
    subType = "Unsubscribed"
  }

  return (
    <GridContainer>
      <GridItem xs={6} sm={6} md={6}>
        <h1 className="text-2xl font-bold">Welcome {user.name}</h1>
      </GridItem>
      <GridItem xs={6} sm={6} md={6}>
        <div className="text-center md:ml-[50%] md:mr-[0%]">
          <h2 className="p-2 font-bold bg-bhalogari text-white rounded">Subscrption Type: {subType}</h2>
        </div>
      </GridItem>
      {/* <Button onClick={() => { test() }}>Test</Button> */}

      <GridItem xs={12} sm={6} md={4}>
        <Card
          onClick={() => {
            location.href = "/msf/listing";
          }}
        >
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              <CarCrashIcon />
            </CardIcon>
            <p className={classes2.cardCategory} style={{ color: "#000" }}>
              Pending Vehicles
            </p>
            <h3 className={classes2.cardTitle}>{pendingCar}</h3>
          </CardHeader>
          <CardFooter stats></CardFooter>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={6} md={4}>
        <Card
          onClick={() => {
            location.href = "/msf/listing";
          }}
        >
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <CheckCircleIcon />
            </CardIcon>
            <p className={classes2.cardCategory} style={{ color: "#000" }}>
              Accept Vehicles
            </p>
            <h3 className={classes2.cardTitle}>{acceptedCar}</h3>
          </CardHeader>
          <CardFooter stats></CardFooter>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={6} md={4}>
        <Card
          onClick={() => {
            location.href = "/msf/listing";
          }}
        >
          <CardHeader color="dark" stats icon>
            <CardIcon color="danger">
              <CancelIcon />
            </CardIcon>
            <p className={classes2.cardCategory} style={{ color: "#000" }}>
              Rejected Vehicles
            </p>
            <h3 className={classes2.cardTitle}>{rejectedCar}</h3>
          </CardHeader>
          <CardFooter stats></CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <div
          style={{
            height: "55vh",
            width: "80%",
            margin: "auto",
            backgroundColor: "grey",
          }}
        >
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            showThumbs={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <IconButton
                  className={classes.arrows}
                  aria-label="arrowBackIosNew"
                  onClick={onClickHandler}
                  style={{ left: 15 }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <IconButton
                  className={classes.arrows}
                  aria-label="arrowForwardIos"
                  onClick={onClickHandler}
                  style={{ right: 15 }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              )
            }
          >
            {promotions.map((m, i) => {
              return (
                <div style={{ height: "55vh", width: "100%", margin: "auto" }} className={classes.pics}>
                  <img style={{ height: "100%", width: "100%" }} src={m.image_url} />
                </div>
              );
            })}
          </Carousel>
        </div>
        <Card>
          <CardHeader color="warning">
            <h1 className="text-xl font-bold">Packages</h1>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Subscription/Package</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Bought On</TableCell>
                    <TableCell>Status</TableCell>
                    {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map((row) => {
                    // console.log(row);
                    return (
                      <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{row?.MerchantStorefront_package?.package_name}</TableCell>
                        <TableCell>{row?.MerchantStorefront_package?.package_type}</TableCell>
                        <TableCell>{row.timestamp ? format(new Date(row?.timestamp), "dd MMM yyyy") : "-"}</TableCell>
                        <TableCell>{row?.status === true ? "PAID" : "UNPAID"}</TableCell>
                        {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                      </TableRow>
                    );
                  })}
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
  // const prisma = new PrismaClient();
  // UserInfo
  var userPackages = await prisma.MerchantStorefront_paymenthistory.findMany({
    where: {
      user_id_id: session.token.id,
    },
    include: {
      MerchantStorefront_package: true,
    },
    orderBy: { timestamp: "desc" },
  });

  // User subscription packages
  // var userSubs = await

  // The package is nested
  // userPackages = userPackages.map((p) => p.MerchantStorefront_package);
  userPackages = JSON.parse(
    JSON.stringify(userPackages, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
  );
  // Promotions
  var allPromotions = await prisma.MerchantStorefront_promotion.findMany({});
  allPromotions = JSON.parse(
    JSON.stringify(allPromotions, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  // console.log("promotions: ", allPromotions[0]);

  var acceptedCar = await prisma.CarsApp_car.findMany({
    where: {
      created_by_id: session.token.id,
      CarsApp_carapprovallog: {
        some: {
          status: "A",
        },
      },
    },
    include: {
      CarsApp_carapprovallog: true,
    },
  });
  acceptedCar = JSON.parse(
    JSON.stringify(acceptedCar, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  ).length;

  var rejectedCar = await prisma.CarsApp_car.findMany({
    where: {
      created_by_id: session.token.id,
      CarsApp_carapprovallog: {
        some: {
          status: "R",
        },
      },
    },
    include: {
      CarsApp_carapprovallog: true,
    },
  });
  rejectedCar = JSON.parse(
    JSON.stringify(rejectedCar, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  ).length;

  var pendingCar = await prisma.CarsApp_car.findMany({
    where: {
      created_by_id: session.token.id,
      CarsApp_carapprovallog: {
        some: {
          status: "P",
        },
      },
    },
    include: {
      CarsApp_carapprovallog: true,
    },
  });
  pendingCar = JSON.parse(
    JSON.stringify(pendingCar, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  ).length;

  return {
    props: {
      promotions: allPromotions,
      // next-auth prevent from sending sensitive information, passing session object will get undefined
      // session: session,
      user: session.user,
      userId: session.token.id,
      packages: userPackages,
      acceptedCar: acceptedCar,
      rejectedCar: rejectedCar,
      pendingCar: pendingCar,
    },
  };
}
StoreDashboardPage.layout = MSF;
StoreDashboardPage.auth = true;
export default StoreDashboardPage;