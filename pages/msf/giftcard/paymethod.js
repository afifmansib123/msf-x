import React from "react";
import MSF from "layouts/MSF.js";
import {Button, CardContent, Container, Divider} from "@mui/material";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CustomButton from '../../../components/CustomButtons/Button'
import {bhalogariCardHeader} from "../../../assets/jss/nextjs-material-dashboard";
import prisma from "../../../PrismaConnect";

import axios from "axios";

function Paymethod(props) {
    const [selectPay, setSelectPay] = React.useState(0);
    const {choices} = props;
    const choicesarr = choices||["choice 1", "choice 2", "choice 3", "choice 4"];

    // React.useEffect(() => {
    //
    // }, [selectPay])

    const onClickHandle = (index) => {
        setSelectPay(index);
    }

    const choiceBtn = () => {
        return choicesarr.map((v, index) => {
            return (<GridItem xs={12} sm={12} md={12} key={index}>
                {selectPay===index && <div onClick={() => {onClickHandle(index)}} className={"border-bhalogari border-2 p-10 rounded text-3xl"}>
                    { v.payment_method || v}
                </div>}
                {
                    selectPay!==index &&  <div onClick={() => {onClickHandle(index)}} className={"border-gray-100 hover:border-bhalogari border-2 p-10 rounded text-lg"}>
                        { v.payment_method || v}
                    </div>
                }

            </GridItem>)
        })
    }

    const buyPackage = () => {
        console.log("test")

    }

    const buyPackageOnline = (subPackage) => async (e) => {
        console.log("package", subPackage.id)
        const dataParams = {
            total_amount: subPackage.price, // the amount goes to SSL checkout page
            user_id: session.token.id,
            package_id: subPackage.id,
            cus_name: session.token.name,
        };

        const response = await axios.post(
            `/api/payment/payonline`,
            dataParams
        );
        // await router.push(response.data);
        await router.replace(response.data);
    }

    return (
        <>
            <div className={"container mx-auto h-screen flex"}>
                <Card className={"h-fit self-center justify-center items-center mx-20"}>
                    <CardHeader color={"bhalogari"}><h1 className={"font-semibold text-center text-2xl p-4 px-[10rem]"}>Choose Payment Method</h1></CardHeader>
                    <CardBody className={"w-fit"}>
                        <GridContainer>
                            {choiceBtn()}
                            <GridItem xs={12} sm={12} md={12}>
                                <div className={"text-right"}>
                                    <CustomButton onClick={buyPackage} color={"primary"} size="lg" style={{
                                            fontWeight: "bold",
                                            background: "linear-gradient(60deg, #f06424, #fb8c00)"
                                        }}>
                                        Next
                                    </CustomButton>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    let paymethods = await prisma.PaymentsApp_paymentmethod.findMany();
    paymethods =  JSON.parse(JSON.stringify(paymethods, (key, value) => (typeof value === "bigint" ? parseInt(value) : value)));
    return {
        props: {
            choices: paymethods
        }
    }
}

export default Paymethod;