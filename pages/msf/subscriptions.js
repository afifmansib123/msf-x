import React, {useState, useEffect} from 'react';
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
                // const value = await information.json();
                console.log(information);
                if (response.status === 200) {
                    setPackages(json);
                    // setDetails(value);
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
            `${process.env.NEXT_PUBLIC_LOCAL_API}merchant-storefront/add-payment-history/`,
            dataParams
        );
        window.location = response.data.GatewayPageURL;
    }

    return (
        // <div>
        // </div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <div className="flex justify-center">
                    <Avatar className="w-36 h-36 rounded-full border text-center text-[#fafafa] bg-[#f06425] bg-cover"/>
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
                                    {
                                        packages.slice(0, 1).map((item, index) => {
                                            return (
                                                <>
                                                    <p>{item.description}</p>
                                                    <p>({item.package_name})</p>
                                                </>
                                            )
                                        })
                                    }
                                </CardHeader>
                            </AccordionSummary>

                            <CardHeader>
                                <div className="-mt-5 text-center font-bold text-[#f06424]">
                                    {
                                        packages.slice(0, 1).map((item, index) => {
                                            return (
                                                <>
                                                    <p className="text-4xl">TK. {item.price}</p>
                                                </>
                                            )
                                        })
                                    }
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
                                    {
                                        details.map((item, index) => {
                                            if (item.package_id === 1) {
                                                return (
                                                    <li key={index}>{item.package_name}</li>
                                                )
                                            }
                                        })
                                    }
                                </ul>


                            </div>
                            {/* </ReadMore> */}
                        </CardBody>
                    </Accordion>
                </Card>
                <div className="flex justify-center">
                    <button
                        className="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]"
                        onClick={buyPackage(packages[0])}>
                        BUY NOW
                    </button>
                </div>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
                {/* <div class="w-36 h-36 bg-[#f06424] rounded-full"></div> */}
                <div className="flex justify-center">
                    <Avatar className="w-36 h-36 rounded-full border text-center text-[#fafafa] bg-[#f06425] bg-cover"/>
                </div>
                <Card>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>

                        {/*  */}
                        <div className="w-full flex flex-col">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="text-white text-6xl"/>}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                className="flex justify-center bg-[#f06424] rounded-lg m-5 text-white"
                            >
                                <CardHeader className="text-2xl font-bold text-center">
                                    {
                                        packages.map((item, index) => {
                                            if (item.id === 2) {
                                                return (
                                                    <>
                                                        <p>{item.description}</p>
                                                        <p>({item.package_name})</p>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </CardHeader>
                            </AccordionSummary>

                            <CardHeader>
                                <div className="-mt-5 text-center font-bold text-[#f06424]">
                                    {
                                        packages.map((item, index) => {
                                            if (item.id === 2) {
                                                return (
                                                    <>
                                                        <p className="text-4xl">TK. {item.price}</p>
                                                    </>
                                                )
                                            }
                                        })
                                    }
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
                                    {
                                        details.map((item, index) => {
                                            if (item.package_id === 2) {
                                                return (
                                                    <li key={index}>{item.package_name}</li>
                                                )
                                            }
                                        })
                                    }
                                </ul>

                                <div className="p-2 text-center">
                                    <p className="font-bold text-2xl underline">Monthly Paid Advertisement Benefits-</p>
                                    <p className="text-1xl">Slider Banners(1), Featured Section Cars(2),
                                        Facebook-Static-Posts(4), Blog/Articles(1)</p>
                                </div>
                            </div>
                            {/* </ReadMore> */}
                        </CardBody>
                    </Accordion>
                </Card>
                <div className="flex justify-center">
                    <button
                        class="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]"
                        onClick={buyPackage(packages[1])}>
                        BUY NOW
                    </button>
                </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                {/* <div class="w-36 h-36 bg-[#f06424] rounded-full"></div> */}
                <div className="flex justify-center">
                    <Avatar className="w-36 h-36 rounded-full border text-center text-[#fafafa] bg-[#f06425] bg-cover"/>
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
                                    {
                                        packages.map((item, index) => {
                                            if (item.id === 3) {
                                                return (
                                                    <>
                                                        <p>{item.description}</p>
                                                        <p>({item.package_name})</p>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </CardHeader>
                            </AccordionSummary>

                            <CardHeader>
                                <div className="-mt-5 text-center font-bold text-[#f06424]">
                                    {
                                        packages.map((item, index) => {
                                            if (item.id === 3) {
                                                return (
                                                    <>
                                                        <p className="text-4xl">TK. {item.price}</p>
                                                    </>
                                                )
                                            }
                                        })
                                    }
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
                                    {
                                        details.map((item, index) => {
                                            if (item.package_id === 3) {
                                                return (
                                                    <li key={index}>{item.package_name}</li>
                                                )
                                            }
                                        })
                                    }
                                </ul>

                                <div className="p-2 text-center">
                                    <p className="font-bold text-2xl underline">Monthly Paid Advertisement Benefits-</p>
                                    <p className="text-1xl">Slider Banners(2), Featured Section Cars(4),
                                        Facebook-Static-Posts(3), Dynamic/Motion (2), Blog/Articles(3), Review Videos
                                        (1)</p>
                                </div>
                            </div>
                            {/* </ReadMore> */}
                        </CardBody>
                    </Accordion>
                </Card>
                <div className="flex justify-center">
                    <button
                        class="flex justify-center bg-[#f06425] hover:bg-white text-white hover:text-[#f06425] font-bold py-3 px-20 rounded border border-[#f06425]"
                        onClick={buyPackage(packages[2])}>
                        BUY NOW
                    </button>
                </div>
            </GridItem>
        </GridContainer>
    )
}


Subscriptions.layout = MSF;

export default Subscriptions