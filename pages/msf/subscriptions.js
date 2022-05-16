import React, {useState, useEffect} from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import MSF from "layouts/MSF.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReadMore from "../../components/ReadMore/ReadMore";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import axios from "axios";
import {useSession} from "next-auth/react";

function Subscriptions() {

  const [expanded, setExpanded] = useState(false);
  const [packages, setPackages] = useState([]);
  const [details, setDetails] = useState([]);
  const {data: session, status} = useSession();

  const handleChange = (panel) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BG_API}merchant-storefront/packages/`);
        const information = await fetch(`${process.env.NEXT_PUBLIC_BG_API}merchant-storefront/package-details/`);
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
  }, [])

  // console.log("Packages =>", packages);

// console.log("package Informations =>", details);

  const buyPackage = (subPackage) => async (e) => {
    // console.log(subPackage);

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
  }

  return (
    // <div>
    // </div>
    <GridContainer>
      {
        packages.map((item, index) => {
          return (
            <GridItem xs={12} sm={12} md={4}>
              <div className="flex justify-center">
                <Avatar className="w-36 h-36 rounded-full border text-center text-[#fafafa] bg-[#f06425] bg-cover"/>
              </div>
              <Card>
                <Accordion expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)}>
                  <div className="w-full flex flex-col">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="text-white text-6xl"/>}
                      aria-controls={`panel${item.id}bh-content`}
                      id={`panel${item.id}bh-header`}
                      className="flex justify-center bg-[#f06424] rounded-lg m-5 text-white"
                    >
                      <CardHeader className="text-2xl font-bold text-center">


                        <p>{item.description}</p>
                        <p>({item.package_name})</p>


                      </CardHeader>
                    </AccordionSummary>

                    <CardHeader>
                      <div className="-mt-5 text-center font-bold text-[#f06424]">
                        <p className="text-4xl">TK. {item.price}</p>
                        {item.id !== 1 &&
                          <p className="text-2xl">Per Month</p>
                        }
                        {item.id === 1 &&
                          <p className="text-2xl">Per Ad Post</p>
                        }
                      </div>
                    </CardHeader>
                  </div>

                  {/* <CardHeader className="text-center text-2xl font-bold"></CardHeader> */}
                  <CardBody>
                    {/* <ReadMore> */}
                    <div className="p-4 rounded-lg text-white text-xl bg-[#f06425]">
                      <p className="p-2 text-center font-bold text-2xl underline">Key Features</p>
                      <ul className="py-4 px-10 list-disc text-center">
                        {
                          details.map((pitem, index) => {
                            if (item.id === pitem.package_id) {
                              return (
                                <li key={index}>{pitem.perks}</li>
                              )
                            }
                          })
                        }
                      </ul>

                      {/*<div className="p-2 text-center">*/}
                      {/*  <p className="font-bold text-2xl underline">Monthly Paid Advertisement Benefits-</p>*/}
                      {/*  <p className="text-1xl">Slider Banners(1), Featured Section Cars(2),*/}
                      {/*    Facebook-Static-Posts(4), Blog/Articles(1)</p>*/}
                      {/*</div>*/}
                      {/*<div className="p-2 text-center">*/}
                      {/*  <p className="font-bold text-2xl underline">Monthly Paid Advertisement Benefits-</p>*/}
                      {/*  <p className="text-1xl">Slider Banners(2), Featured Section Cars(4),*/}
                      {/*    Facebook-Static-Posts(3), Dynamic/Motion (2), Blog/Articles(3), Review Videos*/}
                      {/*    (1)</p>*/}
                      {/*</div>*/}

                    </div>
                    {/* </ReadMore> */}
                  </CardBody>
                </Accordion>
              </Card>
              <div className="flex justify-center">
                <button
                  className="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]"
                  onClick={buyPackage(item)}>
                  BUY NOW
                </button>
              </div>
            </GridItem>
          )
        })
      }
    </GridContainer>
  )
}


Subscriptions.layout = MSF;

export default Subscriptions