import React, { useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import MSF from "layouts/MSF.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReadMore from "../../components/ReadMore/ReadMore";
import Snackbar from "components/Snackbar/Snackbar.js";
import { CardContent } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AddAlert from "@mui/icons-material/AddAlert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { orange } from "@mui/material/colors";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react"


function Subscriptions(props) {
  const [expanded, setExpanded] = useState(false);
  const [packages, setPackages] = useState([]);
  const [details, setDetails] = useState([]);
  const { data: session, status } = useSession();
  const [snackMsg, setSnackMsg] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  };

  const router = useRouter();

  // console.log("test", props.packagesType)



  useEffect(() => {
    if (router.query.status) {
      setOpen(true);
      setSnackMsg("Your Payment is - " + router.query.status);
    }
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}merchant-storefront/packages/`
        );
        const information = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}merchant-storefront/package-details/`
        );
        const json = await response.json();
        const value = await information.json();
        if (response.status === 200) {
          setPackages(json);
          setDetails(value);
        } else {
          console.log("Data Not Found");
        }
      } catch (err) {
        console.log("Error", err);
      }
    })();
  }, []);

  // console.log("Packages =>", packages);

  // console.log("package Informations =>", details);

  const buyPackage = (subPackage) => async (e) => {
    console.log(subPackage.id);
    // props.packagesType
    const isSubcription = props.packagesType.filter(function (el) {
      return (el.package_id_id == subPackage.id)
    })

    // console.log("result", renderPerkItems)
    if (isSubcription == []) {
      const dataParams = {
        total_amount: subPackage.price, // the amount goes to SSL checkout page
        user_id: session.token.id,
        package_id: subPackage.id,
        cus_name: session.token.name,
        cus_city: "",
        cus_country: "Bangladesh",
        shipping_method: "NO",
        multi_card_name: "",
        num_of_item: 1,
        product_name: `BG Subscription Package - ${subPackage.package_name}`,
        product_category: "Service",
        product_profile: "General",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BG_API}merchant-storefront/add-payment-history/`,
        dataParams
      );
      window.location = response.data.GatewayPageURL;

    } else {
      alert("You already have this subcription")
    }
  };

  return (
    // <div>
    // </div>
    <GridContainer>
      {packages.map((item, index) => {
        return (
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color={"bhalogari"} className={"m-3"}>
                <h1 className="text-center text-xl font-semibold">
                  {item.description}({item.package_name})
                </h1>
              </CardHeader>
              <CardBody className="overflow-y-auto">
                <CardContent className={"m-30"}>
                  <div className="mb-35 text-center font-bold text-[#f06424]">
                    <p className="text-4xl">TK. {item.price}</p>
                    {item.id !== 1 && <p className="text-2xl">Per Month</p>}
                    {item.id === 1 && <p className="text-2xl ">Per Ad Post</p>}
                  </div>
                </CardContent>
                <CardContent className="text-left">
                  <h3 className="text-lg font-bold -mt-2.5 mb-2">
                    Key Features
                  </h3>
                  {details.map((pitem, index) => {
                    if (item.id === pitem.package_id) {
                      return (
                        <div className="flex py-1.5">
                          {" "}
                          <CheckCircleIcon sx={{ color: orange[800] }} />
                          <div key={index} className="right px-4 ">
                            {pitem.perks}
                          </div>
                        </div>
                      );
                    }
                  })}
                </CardContent>
              </CardBody>
            </Card>
            <div className="flex justify-center">
              <button
                className="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]"
                onClick={buyPackage(item)}
              >
                BUY NOW
              </button>
            </div>
          </GridItem>
        );
      })}
      <Snackbar
        place="br"
        color="bhalogari"
        icon={AddAlert}
        message={snackMsg}
        open={open}
        onclose={handleClose}
        closeNotification={() => setOpen(false)}
        close
      />
    </GridContainer>
  );
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  // const id = context.params.id
  // const { data: session, status } = useSession();
  const session = await getSession(context)

  var myPackageTypes = await prisma.MerchantStorefront_paymenthistory.groupBy({
    by: ['package_id_id'],
    where: {
      user_id_id: session.token.id,

    }
  })

  //see what packageType that they buy.
  myPackageTypes = JSON.parse(
    JSON.stringify(myPackageTypes, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  return {
    props: {
      packagesType: myPackageTypes.sort((a, b) => a.package_id_id - b.package_id_id),
    },
  }
}

Subscriptions.layout = MSF;
export default Subscriptions;

