import React, { useState, useEffect } from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import MSF from "layouts/MSF.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReadMore from '../../components/ReadMore/ReadMore';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

function Subscriptions() {

  const [expanded, setExpanded] = useState(false);
  const [carTypes, setCarTypes] = useState([]);

  const  handleChange = (panel) => (event, isExpanded) => {
      event.preventDefault();
      setExpanded(isExpanded ? panel : false);
  }

  useEffect(() => {
      (async () => {
          try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BG_API}merchant-storefront/packages/`);
            const json = await response.json();
            setCarTypes(json);
        }catch (err){
            console.log("Error", err)
        }
    })
},[])

  console.log("Car Types =>",carTypes);
  
  return (
    // <div>
    // </div>
    <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <div className="flex justify-center">
                        <Avatar className="w-36 h-36 rounded-full border text-center text-[#fafafa] bg-[#f06425] bg-cover" />
                </div>

                <Card>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <div className="w-full flex flex-col">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className="text-white text-6xl"/>}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className="flex justify-center bg-[#f06424] rounded-lg m-5 text-white"
                                    >
                                        <CardHeader className="text-2xl font-bold text-center">
                                                    <p>Individual Basic</p>
                                                    <p>(Silver)</p>
                                        </CardHeader>
                                    </AccordionSummary>

                                    <CardHeader>
                                        <div className="-mt-5 text-center font-bold text-[#f06424]">
                                            <p className="text-4xl">TK. 500</p>
                                            <p className="text-2xl">Per Ad Post</p>
                                        </div>
                                    </CardHeader>
                                </div>
                                
                    {/* <CardHeader className="text-center text-2xl font-bold"></CardHeader> */}
                        <CardBody>
                            {/* <ReadMore> */}
                                <div className="p-4 rounded-lg text-white text-xl bg-[#f06425]">
                                        <p className="p-2 text-center font-bold text-2xl underline">Key Features</p>
                                        <ul className="py-4 px-10 list-disc text-center">
                                            <li>Free Registration</li>
                                            <li>Ad Live within 24 Hours</li>
                                            <li>Sales Commission Not Required</li>
                                            <li>2 Months Ad-Life</li>
                                            <li>TK. 200 Ad Renewal Fee</li>
                                            <li>Monthly Paid Advertisement Benefits.</li>
                                            <li>No Paid Advertisements</li>
                                        </ul>

                                        
                                </div>
                            {/* </ReadMore> */}
                        </CardBody>
                    </Accordion>
                </Card>
                <div className="flex justify-center">
                    <button class="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]">
                            BUY NOW
                    </button>
                </div>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
                {/* <div class="w-36 h-36 bg-[#f06424] rounded-full"></div> */}
                <div className="flex justify-center">
                    <Avatar className="w-36 h-36 rounded-full border text-center text-[#fafafa] bg-[#f06425] bg-cover" />
                </div>
                <Card>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                
                                            {/* <div className="m-3">
                                                <ExpandMoreIcon />
                                            </div> */}
                                <div className="w-full flex flex-col">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className="text-white text-6xl"/>}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                        className="flex justify-center bg-[#f06424] rounded-lg m-5 text-white"
                                    >
                                        <CardHeader className="text-2xl font-bold text-center">
                                                    <p>Business Regular</p>
                                                    <p>(Gold)</p>
                                        </CardHeader>
                                    </AccordionSummary>

                                    <CardHeader>
                                        <div className="-mt-5 text-center font-bold text-[#f06424]">
                                            <p className="text-4xl">TK. 12,000</p>
                                            <p className="text-2xl">Per Month</p>
                                        </div>
                                    </CardHeader>
                                </div>
                                
                    {/* <CardHeader className="text-center text-2xl font-bold"></CardHeader> */}
                        <CardBody>
                            {/* <ReadMore> */}
                                <div className="p-4 rounded-lg text-white text-xl bg-[#f06425]">
                                        <p className="p-2 text-center font-bold text-2xl underline">Key Features</p>
                                        <ul className="py-4 px-10 list-disc text-center">
                                            <li>Free Registration</li>
                                            <li>Maximum 70 Car/Bike Ads per Month (TK. 1,000 Per Additional Listing)</li>
                                            <li>Ad Live nithin 8 Hours</li>
                                            <li>Advanced User Dashboard</li>
                                            <li>Analytics-Traffic, Click Through Rate (CTR) Data, Demographics, Leads/Sales Summary</li>
                                            <li>Sales Commission Not Required</li>
                                            <li>4 Months Ad-Life</li>
                                            <li>TK. 500 Ad Renewal Fee</li>
                                            <li>Regular Verified Memebrship Badge</li>
                                        </ul>

                                        <div className="p-2 text-center">
                                            <p className="font-bold text-2xl underline">Monthly Paid Advertisement Benefits-</p>
                                            <p className="text-1xl">Slider Banners(1), Featured Section Cars(2), Facebook-Static-Posts(4), Bolg/Articles(1)</p>
                                        </div>
                                </div>
                            {/* </ReadMore> */}
                        </CardBody>
                    </Accordion>
                </Card>
                <div className="flex justify-center">
                    <button class="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]">
                            BUY NOW
                    </button>
                </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            {/* <div class="w-36 h-36 bg-[#f06424] rounded-full"></div> */}
            <div className="flex justify-center">
                <Avatar className="w-36 h-36 rounded-full border text-center text-[#fafafa] bg-[#f06425] bg-cover" />
            </div>
            <Card>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                
                                            {/* <div className="m-3">
                                                <ExpandMoreIcon />
                                            </div> */}
                                <div className="w-full flex flex-col">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon className="text-white text-6xl"/>}
                                        aria-controls="panel3bh-content"
                                        id="panel3bh-header"
                                        className="flex justify-center bg-[#f06424] rounded-lg m-5 text-white"
                                    >
                                        <CardHeader className="text-2xl font-bold text-center">
                                                    <p>Business Plus</p>
                                                    <p>(Diamond)</p>
                                        </CardHeader>
                                    </AccordionSummary>

                                    <CardHeader>
                                        <div className="-mt-5 text-center font-bold text-[#f06424]">
                                            <p className="text-4xl">TK. 20,000</p>
                                            <p className="text-2xl">Per Month</p>
                                        </div>
                                    </CardHeader>
                                </div>
                                
                    {/* <CardHeader className="text-center text-2xl font-bold"></CardHeader> */}
                        <CardBody>
                            {/* <ReadMore> */}
                                <div className="p-4 rounded-lg text-white text-xl bg-[#f06425]">
                                        <p className="p-2 text-center font-bold text-2xl underline">Key Features</p>
                                        <ul className="py-4 px-10 list-disc text-center">
                                            <li>Free Registration</li>
                                            <li>Weekly 2 Times CRM Outbound Sales Calls</li>
                                            <li>Unlimited Car/Bike Ads Per Month</li>
                                            <li>Advanced User Dashboard + Company Profile</li>
                                            <li>Analytics-Traffic, Click Through Rate (CTR) Data, Demographics, Leads/Sales Summary</li>
                                            <li>Live Chat/ Query Management Tool</li>
                                            <li>Sales Commission Not Required</li>
                                            <li>8 Months Ad-Life</li>
                                            <li>TK. 500 Ad Renewal Fee</li>
                                            <li>Exclusive Verified Memebrship Badge</li>
                                        </ul>

                                        <div className="p-2 text-center">
                                            <p className="font-bold text-2xl underline">Monthly Paid Advertisement Benefits-</p>
                                            <p className="text-1xl">Slider Banners(2), Featured Section Cars(4), Facebook-Static-Posts(3), Dynamic/Motion (2), Bolg/Articles(3), Review Videos (1)</p>
                                        </div>
                                </div>
                            {/* </ReadMore> */}
                        </CardBody>
                    </Accordion>
                </Card>
                <div className="flex justify-center">
                    <button class="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]">
                            BUY NOW
                    </button>
                </div>
            </GridItem>
    </GridContainer>        
  )
}


Subscriptions.layout = MSF;

export default Subscriptions