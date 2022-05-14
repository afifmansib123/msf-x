import React from "react";
import { useRouter } from "next/router";
import MSF from "layouts/MSF.js";
import { useSession} from "next-auth/react";
import {Button, CardContent, Container} from "@mui/material";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CustomButton from '../../components/CustomButtons/Button'

function merchantGiftCard() {
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <h1 className={"text-center text-bold text-5xl font-bold text-bhalogari"} >GiftCard Package</h1>
                <Card profile plain>
                    <h1>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis dapibus augue, id faucibus justo. In sed ornare sem. In eleifend ante sed nulla consequat, eu rutrum massa blandit. Nulla vitae neque sed metus gravida condimentum vel quis lacus. Cras eu est fringilla, venenatis nisl a, congue dui. Nam at enim facilisis, ultricies dolor a, cursus nulla. Integer bibendum volutpat ultrices. Suspendisse sit amet ex purus. Duis id nibh viverra enim dapibus tincidunt. Integer erat ipsum, gravida vitae euismod sit amet, tincidunt non lorem. Aliquam leo lorem, suscipit nec pharetra nec, vulputate nec purus. Nulla ac felis vitae leo luctus euismod eget non ligula.
                    </h1>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color={"bhalogari"} className={"m-3"}>
                        <h1 className="text-center text-xl font-semibold">
                            Package 1
                        </h1>

                    </CardHeader>

                    <CardBody>
                        <CardContent className="text-center my-[50px]">
                            <div>Some Description</div>
                            <div>Some Description</div>
                            <div>Some Description</div>
                            <div>Some Description</div>
                            <div>Some Description</div>
                            <div>Some Description</div>
                            <div>Some Description</div>
                        </CardContent>

                    </CardBody>
                    <CardFooter>
                        <div>Some Description</div>
                    </CardFooter>
                </Card>
                <div className="justify-center item-center text-center">
                    <CustomButton  color={"primary"}>BUY NOW</CustomButton>
                </div>

            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color={"bhalogari"}>
                        <h1 className="text-center text-xl font-semibold">
                            Package 2
                        </h1>

                    </CardHeader>
                    <CardBody className="text-center my-[50px]">
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                    </CardBody>
                    <CardFooter>
                        <div>Some Description</div>
                        <CustomButton round>BUY</CustomButton>
                    </CardFooter>
                </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color={"bhalogari"}>
                        <h1 className="text-center text-xl font-semibold">
                            Package 3
                        </h1>
                    </CardHeader>
                    <CardBody className="text-center my-[50px]">
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                        <div>Some Description</div>
                    </CardBody>
                    <CardFooter>
                        <div>Some Description</div>
                        <CustomButton round>BUY</CustomButton>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

merchantGiftCard.layout = MSF;
export default merchantGiftCard;