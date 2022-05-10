import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CusButton from "components/CustomButtons/Button"
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@mui/material/Icon";
import Image from 'next/image'

import PropTypes from 'prop-types';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Container
} from "@mui/material";
import CustomTabs from "../CustomTabs/CustomTabs";
import BugReport from "@mui/icons-material/BugReport";
import Tasks from "../Tasks/Tasks";
import {bugs, server, website} from "../../variables/general";
import Code from "@mui/icons-material/Code";
import Cloud from "@mui/icons-material/Cloud";
import CardAvatar from "../Card/CardAvatar";

function CarApproveLog(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const handleClickOpen = (carRecord) => {
        props.callback(carRecord.carId);
    };

    var showedData = props.tableData.map((value, index) => {

        return [(
            <img src={value.Preview_Image[0]}/>), "", "",
            (<GridContainer>
                <GridItem xs={4} sm={4} md={4} style={{fontWeight: 'bold'}}>Merchant Name</GridItem>
                <GridItem xs={8} sm={8} md={8}>{value.Merchant_Name}</GridItem>
                <GridItem xs={4} sm={4} md={4} style={{fontWeight: 'bold'}}>Car Maker</GridItem>
                <GridItem xs={8} sm={8} md={8}>{value.Car_Maker}</GridItem>
                <GridItem xs={4} sm={4} md={4} style={{fontWeight: 'bold'}}>Car Country</GridItem>
                <GridItem xs={8} sm={8} md={8}>{value.manufacturerData.maker_country}</GridItem>
                <GridItem xs={4} sm={4} md={4} style={{fontWeight: 'bold'}}>Car Model</GridItem>
                <GridItem xs={8} sm={8} md={8}>{value.Car_Model}</GridItem>

            </GridContainer>),
            (<CusButton color="rose" onClick={() => handleClickOpen(value)}>Approval Detail</CusButton>),  "", "", "", "", "", "", ""]
    });
    // value.Merchant_Name, value.Car_Maker, value.Car_Model

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color={props.tableHeaderColor}>
                            <h4 className={classes.cardTitleWhite} style={{fontWeight: 'bolder'}}>APPROVE LOG</h4>
                            <p className={classes.cardCategoryWhite}>
                                Pending Car's approve
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor={props.tableHeaderColor}
                                tableHead={props.tableHead}
                                tableData={showedData}
                            />
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs
                        title="LOG ACTIVITY:"
                        headerColor="info"
                        tabs={[
                            {
                                tabName: "Pending",
                                tabIcon: BugReport,
                                tabContent: (
                                    <GridContainer>
                                        {props.pendingTab.map(v => {
                                            return (
                                                <GridItem>
                                                    <Card className="border-2 border-sky-500 border-solid" style={{height: 450}}>
                                                        {/*<Image src={v.Preview_Image[0]} alt="" title="" width="100%" height="100%" layout="responsive" objectFit="contain"/>*/}
                                                        <CardHeader color="warning" className="text-center">
                                                            <h1 className="text-center font-medium text-lg my-2">{v.carName}</h1>
                                                        </CardHeader>

                                                        <CardBody>
                                                            <CardAvatar plain>
                                                                <img src={v.Preview_Image[0]} style={{width: 250, alignContent:"center", alignItems:"center"}}/>
                                                            </CardAvatar>
                                                            <div className="mt-10">
                                                                <span className="font-medium mr-4">Request Date:</span>
                                                                <span>{v.create_at}</span>
                                                            </div>
                                                            <div>
                                                                <span className="font-medium mr-4">Requested Name:</span>
                                                                <span>{v.create_at}</span>
                                                            </div>


                                                        </CardBody>
                                                        <CardFooter plain>
                                                            <Button variant="outlined">History</Button>
                                                            <div className="text-right">
                                                                <span className="mr-4 text-sm">Status:</span>
                                                                <CusButton disabled round color="warning" size="sm">PENDING</CusButton>
                                                            </div>
                                                        </CardFooter>
                                                    </Card>
                                                </GridItem>
                                            )
                                        })}
                                    </GridContainer>
                                )
                            },
                            {
                                tabName: "Rejected",
                                tabIcon: Code,
                                tabContent: (
                                    <Container>
                                        {props.rejectedTab.map(v => {
                                            return (
                                                <Card>
                                                    <CardHeader>
                                                        <img src={v.Preview_Image[0]} width={250} height={250}/>
                                                    </CardHeader>
                                                    <CardBody>

                                                    </CardBody>
                                                </Card>)
                                        })}
                                    </Container>
                                ),
                            },
                            {
                                tabName: "Approved",
                                tabIcon: Cloud,
                                tabContent: (
                                    <Container>
                                        {props.approvedTab.map(v => {
                                            return (
                                                <Card>
                                                    <CardHeader>
                                                        <img src={v.Preview_Image[0]} width={250} height={250}/>
                                                    </CardHeader>
                                                    <CardBody>

                                                    </CardBody>
                                                </Card>)
                                        })}
                                    </Container>
                                ),
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
        </>
    );
}

CarApproveLog.defaultProps = {
    tableHeaderColor: "danger"
};

CarApproveLog.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray",
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    callback: PropTypes.func,
    pendingTab: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    rejectedTab: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    approvedTab: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
};


export default CarApproveLog;
