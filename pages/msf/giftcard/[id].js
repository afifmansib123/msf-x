import React from "react";
import { useRouter } from "next/router";
import MSF from "layouts/MSF.js";
import { useSession } from "next-auth/react";
import { Button, CardContent, Container, Divider } from "@mui/material";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CustomButton from '../../../components/CustomButtons/Button'

function CurrentGiftCard() {
    return (
        <Container>
            <h1>test</h1>
        </Container>
    )
}

CurrentGiftCard.layout = MSF;
export default CurrentGiftCard;