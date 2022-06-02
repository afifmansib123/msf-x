import React from "react";
import { useRouter } from "next/router";
import MSF from "layouts/MSF.js";
import { useSession } from "next-auth/react";
import { Button, CardContent, Container, Divider, useTheme } from "@mui/material";
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
import { getGiftPackage } from '../../api/gift/packages'
import useMediaQuery from '@mui/material/useMediaQuery';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseIcon from '@mui/icons-material/Close';

function merchantGiftCard(props) {
    const [errorDialog, setOpenDialog] = React.useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();
    const { res_status, message, title } = router.query;

    const { packages } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        if (res_status) {
            setOpenDialog(true)
        }
    }, []);

    const buyPackage = (subPackage) => async (e) => {
        await router.replace({
            pathname: '/msf/paymethod',
            query: { total_amount: subPackage.price, user_id: session.token.id, package_id: subPackage.id, cus_name: session.token.name, package_type: "gift", package_name: subPackage.package_name}
        });
    }


    const handleClose = async () => {
        setOpenDialog(false)
        await router.replace({
            pathname: '/msf/giftcard'
        })
    }

    const onCurrentPackageClick = async (user_id) => {
        await router.push(`/msf/giftcard/${user_id}`);
    }

    const packageCard = packages.map((v,index) => {
        return (<GridItem xs={12} sm={12} md={4} key={index}>
            <Card>
                <CardHeader color={"bhalogari"} className={"m-3"}>
                    <h1 className="text-center text-xl font-semibold">
                        {v.package_name}
                    </h1>

                </CardHeader>

                <CardBody className="overflow-y-auto">
                <CardContent className="text-center ml-30">
                    <div >
                        <span className="font-bold text-3xl text-bhalogari">
                            TK. {v.price}
                        </span><br></br>
                        {' '}{' '}{' '}{' '}
                        <span className="font-bold text-2xl text-bhalogari">
                            Annual
                        </span>
                    </div>
                    </CardContent>
                   
                    <CardContent className="text-left ">
                        {
                            v.packageDetail.map((i, index) => {
                                return (
                                    <div key={index}>
                                        <br />
                                        <div>{i.perks}</div>
                                        <br />
                                        {
                                            (v.packageDetail.length - 1) !== index && <Divider />
                                        }

                                    </div>

                                )
                            })
                        }
                        
                    </CardContent>
                   

                </CardBody>

             
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
            <div className="text-center md:text-right">
                <CustomButton onClick={() => {
                    onCurrentPackageClick(session.token.id)
                }} color={"primary"} style={{
                    fontWeight: "semibold",
                    background: "linear-gradient(60deg, #f06424, #fb8c00)"
                }}>
                    <h1>
                        Your Current Package
                    </h1>
                </CustomButton>
            </div>

            <br />

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <h1 className={"text-center text-bold text-5xl font-bold text-bhalogari"}>GiftCard Package</h1>
                </GridItem>
                {packageCard}
            </GridContainer>

            <div>
                <Dialog
                    className={"overflow-visible"}
                    open={errorDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullScreen={fullScreen}
                    PaperProps={{
                        style: { borderRadius: 20}
                    }}
                    fullWidth>
                    <DialogTitle id="alert-dialog-title">
                        <div className={"sticky flex text-center self-center align-middle center-block justify-center"}>
                            {res_status === "success" &&
                                <div className={"rounded-full border-[4px] border-green-800"}>
                                    <CheckOutlinedIcon color={"success"} className={"text-[7rem] text-center "}></CheckOutlinedIcon>
                                </div>
                            }

                            {( res_status === "fail" || res_status === "cancel") &&
                                <div className={"rounded-full border-[4px] border-red-800"}>
                                    <CloseIcon color={"error"} className={"text-[7rem] text-center "}></CloseIcon>
                                </div>
                            }

                        </div>

                        <div className={"text-center mt-3 text-bhalogari"}>
                            {title}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className={"text-center"}>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={"justify-center"}>
                        <Button variant={"contained"} className={"bg-bhalogari px-10"} size={"large"} onClick={handleClose}>OK</Button>
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