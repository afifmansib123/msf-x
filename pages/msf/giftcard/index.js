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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function merchantGiftCard() {
    const [errorDialog, setOpenDialog] = React.useState(false);
    const router = useRouter();
    const { error } = router.query;

    React.useEffect(() => {
        if (error) {
            setOpenDialog(true)
            console.log("err case")
            console.log("hello world")
        } else {
            setOpenDialog(false)
        }
    }, [])

    const handleClose = () => {
        setOpenDialog(false)
        router.push({
            pathname: '/msf/giftcard'})}

    const onBuyClicked = () => {
        console.log("test clicked")
    }

    const onCurrentPackageClick = (user_id) => {
        router.push(`/msf/giftcard/${user_id}`);
    }

    return (
        <>
            <Container>
                <div className="text-right">
                    <CustomButton onClick={() => {
                        onCurrentPackageClick(12)
                    }}
                        color={"primary"} style={{ fontWeight: "semibold", background: "linear-gradient(60deg, #f06424, #fb8c00)" }}>
                        <h1>
                            Your Current Package
                        </h1>
                    </CustomButton>
                </div>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h1 className={"text-center text-bold text-5xl font-bold text-bhalogari"} >GiftCard Package</h1>
                        <Card profile plain>
                            {/* TODO change this description to be more meaningful */}
                            <h1>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis dapibus augue, id faucibus justo. In sed ornare sem. In eleifend ante sed nulla consequat, eu rutrum massa blandit. Nulla vitae neque sed metus gravida condimentum vel quis lacus. Cras eu est fringilla, venenatis nisl a, congue dui. Nam at enim facilisis, ultricies dolor a, cursus nulla. Integer bibendum volutpat ultrices. Suspendisse sit amet ex purus. Duis id nibh viverra enim dapibus tincidunt. Integer erat ipsum, gravida vitae euismod sit amet, tincidunt non lorem. Aliquam leo lorem, suscipit nec pharetra nec, vulputate nec purus. Nulla ac felis vitae leo luctus euismod eget non ligula.
                            </h1>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader color={"bhalogari"} className={"m-3"}>
                                <h1 className="text-center text-xl font-semibold">
                                    Sedan/Hatcback/Wagon
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
                                <div>
                                    <span className="font-bold text-3xl text-bhalogari">
                                        TK. 35,000
                                    </span>
                                    {' '}{' '}{' '}{' '}
                                    <span className="font-semibold text-2xl text-red-600">
                                        /Annal
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                        <div className="text-center">
                            <CustomButton onClick={() => {
                                onBuyClicked()
                            }}
                                color={"primary"} size="lg" round style={{ fontWeight: "bold", background: "linear-gradient(60deg, #f06424, #fb8c00)", paddingLeft: "100px", paddingRight: "100px" }}>BUY NOW</CustomButton>
                        </div>

                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader color={"bhalogari"} className={"m-3"}>
                                <h1 className="text-center text-xl font-semibold">
                                    SUV/Crossover/Compact
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
                                <div>
                                    <span className="font-bold text-3xl text-bhalogari">
                                        TK. 75,000
                                    </span>
                                    {' '}{' '}{' '}{' '}
                                    <span className="font-semibold text-2xl text-red-600">
                                        /Annal
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                        <div className="text-center">
                            <CustomButton
                                onClick={() => {
                                    onBuyClicked()
                                }}
                                color={"primary"} size="lg" round style={{ fontWeight: "bold", background: "linear-gradient(60deg, #f06424, #fb8c00)", paddingLeft: "100px", paddingRight: "100px" }}>BUY NOW</CustomButton>
                        </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader color={"bhalogari"} className={"m-3"}>
                                <h1 className="text-center text-xl font-semibold">
                                    Mini Bus/Van/Jeep
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
                                <div>
                                    <span className="font-bold text-3xl text-bhalogari">
                                        TK. 1,00,000
                                    </span>
                                    {' '}{' '}{' '}{' '}
                                    <span className="font-semibold text-2xl text-red-600">
                                        /Annal
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                        <div className="text-center">
                            <CustomButton
                                onClick={() => {
                                    onBuyClicked()
                                }}
                                color={"primary"} size="lg" round style={{ fontWeight: "bold", background: "linear-gradient(60deg, #f06424, #fb8c00)", paddingLeft: "100px", paddingRight: "100px" }}>BUY NOW</CustomButton>
                        </div>
                    </GridItem>
                </GridContainer>
            </Container>

            <div>
                <Dialog
                    open={errorDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </>

    );
}

merchantGiftCard.layout = MSF;
export default merchantGiftCard;