import React from "react";
import {useRouter} from "next/router";
import MSF from "layouts/MSF.js";
import {useSession} from "next-auth/react";
import {Button, CardContent, Container, Divider} from "@mui/material";
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
import {getGiftPackage} from '../../api/gift/packages'
import axios from "axios";

function merchantGiftCard(props) {
    const [errorDialog, setOpenDialog] = React.useState(false);
    const [paymentDialog, setPaymentDialog] = React.useState(false);
    const router = useRouter();
    const {data: session, status} = useSession();
    const {res_status, message, title} = router.query;
    const {packages} = props;
    console.log("token id", session);

    React.useEffect(() => {
        // if (res_status==="fail") {
        //     setOpenDialog(true)
        // } else {
        //     setOpenDialog(false)
        // }
        if (res_status) {
            setOpenDialog(true)
        }
    }, []);

    // const buyPackage = (subPackage) => async (e) => {
    //     console.log("package", subPackage.id)
    //     const dataParams = {
    //         total_amount: subPackage.price, // the amount goes to SSL checkout page
    //         user_id: session.token.id,
    //         package_id: subPackage.id,
    //         cus_name: session.token.name,
    //     };
    //
    //     const response = await axios.post(
    //         `/api/payment/payonline`,
    //         dataParams
    //     );
    //     // await router.push(response.data);
    //     await router.replace(response.data);
    // }
    const buyPackage = (subPackage) => async (e) => {
        // console.log("package", subPackage.id)
        // const dataParams = {
        //     total_amount: subPackage.price, // the amount goes to SSL checkout page
        //     user_id: session.token.id,
        //     package_id: subPackage.id,
        //     cus_name: session.token.name,
        // };
        //
        // const response = await axios.post(
        //     `/api/payment/payonline`,
        //     dataParams
        // );
        // await router.push(response.data);
        await router.push({pathname: '/msf/giftcard/paymethod',
                query: {total_amount: subPackage.price, user_id: session.token.id, package_id: subPackage.id,cus_name: session.token.name }});
    }


    const handleClose = () => {
        setOpenDialog(false)
        router.push({
            pathname: '/msf/giftcard'
        })
    }

    const onCurrentPackageClick = (user_id) => {
        router.push(`/msf/giftcard/${user_id}`);
    }

    const packageCard = packages.map(v => {
        return (<GridItem xs={12} sm={12} md={4}>
            <Card>
                <CardHeader color={"bhalogari"} className={"m-3"}>
                    <h1 className="text-center text-xl font-semibold">
                        {v.package_name}
                    </h1>

                </CardHeader>

                <CardBody className="overflow-y-auto">
                    <CardContent className="text-center">
                        {
                            v.packageDetail.map((i,index) => {
                                return (
                                    <>
                                        <br/>
                                        <div>{i.perks}</div>
                                        <br/>
                                        {
                                            (v.packageDetail.length - 1) !== index && <Divider/>
                                        }

                                    </>

                                )
                            })
                        }
                    </CardContent>

                </CardBody>

                <CardFooter>
                    <div>
                        <span className="font-bold text-3xl text-bhalogari">
                            TK. {v.price}
                        </span>
                        {' '}{' '}{' '}{' '}
                        <span className="font-semibold text-2xl text-red-600">
                            /Annal
                        </span>
                    </div>
                </CardFooter>
            </Card>
            <div className="text-center">
                <CustomButton onClick={buyPackage(v)} color={"primary"} size="lg" round style={{
                    fontWeight: "bold",
                    background: "linear-gradient(60deg, #f06424, #fb8c00)",
                    paddingLeft: "100px",
                    paddingRight: "100px"
                }}>BUY NOW</CustomButton>
            </div>

        </GridItem>)
    });

    return (
        <>
                <div className="text-right">
                    <CustomButton onClick={() => {
                        onCurrentPackageClick(12)
                    }} color={"primary"} style={{
                        fontWeight: "semibold",
                        background: "linear-gradient(60deg, #f06424, #fb8c00)"
                    }}>
                        <h1>
                            Your Current Package
                        </h1>
                    </CustomButton>
                </div>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h1 className={"text-center text-bold text-5xl font-bold text-bhalogari"}>GiftCard Package</h1>
                        <Card profile plain>
                            {/* TODO change this description to be more meaningful */}
                            <h1>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis dapibus augue, id
                                faucibus justo. In sed ornare sem. In eleifend ante sed nulla consequat, eu rutrum massa
                                blandit. Nulla vitae neque sed metus gravida condimentum vel quis lacus. Cras eu est
                                fringilla, venenatis nisl a, congue dui. Nam at enim facilisis, ultricies dolor a,
                                cursus nulla. Integer bibendum volutpat ultrices. Suspendisse sit amet ex purus. Duis id
                                nibh viverra enim dapibus tincidunt. Integer erat ipsum, gravida vitae euismod sit amet,
                                tincidunt non lorem. Aliquam leo lorem, suscipit nec pharetra nec, vulputate nec purus.
                                Nulla ac felis vitae leo luctus euismod eget non ligula.
                            </h1>
                        </Card>
                    </GridItem>
                    {packageCard}
                </GridContainer>

            <div>
                <Dialog
                    open={errorDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                           {message}
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

export async function getServerSideProps(context) {
    const packages = await getGiftPackage() || [];
    return {
        props: {
            packages: packages
        }
    }
}

merchantGiftCard.layout = MSF;
merchantGiftCard.auth = true;

export default merchantGiftCard;