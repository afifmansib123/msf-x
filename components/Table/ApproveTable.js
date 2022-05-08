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
                <GridItem xs={3} sm={3} md={3}>Merchant Name</GridItem>
                <GridItem xs={9} sm={9} md={9}>{value.Merchant_Name}</GridItem>
                <GridItem xs={3} sm={3} md={3}>Car Maker</GridItem>
                <GridItem xs={9} sm={9} md={9}>{value.Car_Maker}</GridItem>
                <GridItem xs={9} sm={9} md={9}>{value.Car_Maker}</GridItem>
                <GridItem xs={9} sm={9} md={9}>{value.Car_Maker}</GridItem>
                <GridItem xs={9} sm={9} md={9}>{value.Car_Maker}</GridItem>
                <GridItem xs={9} sm={9} md={9}>{value.Car_Maker}</GridItem>
                <GridItem xs={9} sm={9} md={9}>{value.Car_Maker}</GridItem>
            </GridContainer>),
            (<Button onClick={() => handleClickOpen(value)}>Detail</Button>),  "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", ""]
    });
    // value.Merchant_Name, value.Car_Maker, value.Car_Model

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color={props.tableHeaderColor}>
                            <h4 className={classes.cardTitleWhite}>Car Approve Log</h4>
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
                                                <GridItem >
                                                    <Card>
                                                        {/*<Image src={v.Preview_Image[0]} alt="" title="" width="100%" height="100%" layout="responsive" objectFit="contain"/>*/}
                                                            <img src={v.Preview_Image[0]}  width={250} height={250}/>
                                                        <CardBody>
                                                            <p>Some text information to filled</p>
                                                        </CardBody>
                                                            <Button >History</Button>

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
