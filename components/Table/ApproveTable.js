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
                                                    <Card>
                                                        {/*<Image src={v.Preview_Image[0]} alt="" title="" width="100%" height="100%" layout="responsive" objectFit="contain"/>*/}
                                                        <CardHeader>
                                                            <img src={v.Preview_Image[0]}  width={250}/>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <p>Request Date:</p>
                                                            {console.log(v.create_at)}
                                                            <p>{v.create_at}</p>
                                                        </CardBody>
                                                        <CardFooter>
                                                            <Button >History</Button>
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
