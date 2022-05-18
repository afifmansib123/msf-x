import React from "react";
import MSF from "layouts/MSF.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomButton from '../../../components/CustomButtons/Button'
import {bhalogariCardHeader} from "../../../assets/jss/nextjs-material-dashboard";
import prisma from "../../../PrismaConnect";
import axios from "axios";
import { useRouter } from "next/router";
import {Container} from "@mui/material";

function Paymethod(props) {
    const [selectPay, setSelectPay] = React.useState(0);
    const [payid, setpayid] = React.useState(0);
    const {choices} = props;
    const router = useRouter();
    const choicesarr = choices||["choice 1", "choice 2", "choice 3", "choice 4"];
    let {total_amount, user_id, package_id,cus_name } = router.query;
    total_amount = parseInt(total_amount);
    user_id = parseInt(user_id);
    package_id = parseInt(package_id);

    const onClickHandle = (index, id) => {
        setSelectPay(index);
        setpayid(id)
    }

    const choiceBtn = () => {
        return choicesarr.map((v, index) => {
            return (<GridItem xs={12} sm={12} md={12} key={index}>
                {selectPay===index && <div onClick={() => {onClickHandle(index, v.id)}} className={"text-bhalogari text-center font-extrabold border-bhalogari shadow-bhalogari shadow-md border-2 md:p-5 md:rounded-xl md:text-3xl "}>
                    { v.payment_method || v}
                </div>}
                {
                    selectPay!==index &&  <div onClick={() => {onClickHandle(index, v.id)}} className={"text-center border-gray-100 hover:border-bhalogari border-[1px] md:p-5 md:rounded-xl  md:text-3xl "}>
                        { v.payment_method || v}
                    </div>
                }

            </GridItem>)
        })
    }

    const buyPackage = async () => {
        if (payid === 3) {
            await buyPackageOnline();
        } else {
            await buyOther();
        }
    }

    const buyPackageOnline = async (e) => {
        const dataParams = {
            total_amount: total_amount, // the amount goes to SSL checkout page
            user_id: user_id,
            package_id: package_id,
            cus_name: cus_name,
            pay_method: 3
        };

        const response = await axios.post(
            `/api/payment/payonline`,
            dataParams
        );
        // await router.push(response.data);
        await router.replace(response.data);
    }

    const buyOther = async (e) => {
        const dataParams = {
            total_amount: total_amount, // the amount goes to SSL checkout page
            user_id: user_id,
            package_id: package_id,
            cus_name: cus_name,
            pay_method: payid
        };
        const response = await axios.post(
            `/api/payment/others`,
            dataParams
        );
        await router.replace(response.data);
    }

    return (
            <div className={"container mx-auto flex"}>
                <Card className={"self-center justify-center items-center md:mx-40"}>
                    <CardHeader color={"bhalogari"}><h1 className={"font-semibold text-center md:text-2xl md:p-4 md:px-[10rem]"}>Choose Payment Method</h1></CardHeader>
                    <CardBody className={"w-full"}>
                        <GridContainer>
                            {choiceBtn()}
                            <GridItem xs={12} sm={12} md={12}>
                                <div className={"text-right"}>
                                    <CustomButton onClick={() => buyPackage()} color={"primary"} size="lg" style={{
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
    )
}

export async function getServerSideProps(context) {
    let paymethods = await prisma.PaymentsApp_paymentmethod.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    paymethods =  JSON.parse(JSON.stringify(paymethods, (key, value) => (typeof value === "bigint" ? parseInt(value) : value)));
    return {
        props: {
            choices: paymethods
        }
    }
}
Paymethod.layout = MSF;
Paymethod.auth = true;
export default Paymethod;