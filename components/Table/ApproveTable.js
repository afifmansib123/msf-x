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
        props.callback(carRecord.carId, carRecord.record_ID);
    };


    var showedData = props.tableData.map((value, index) => {

        return [value.record_ID, value.Merchant_Name, value.Car_Maker, value.Car_Model, (
            <img src={value.Preview_Image[0]} width={350} height={350}/>),
            (<Button onClick={() => handleClickOpen(value)}>Detail</Button>), "", ""]
    });


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
                                    <Container>
                                        {props.pendingTab.map(v => {
                                            return (
                                                <Card>
                                                    <CardHeader>
                                                        <img src={v.Preview_Image[0]} width={100} height={100}/>
                                                    </CardHeader>
                                                    <CardBody>

                                                    </CardBody>
                                                </Card>)
                                        })}
                                    </Container>
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
                                                        <img src={v.Preview_Image[0]} width={100} height={100}/>
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
                                                        <img src={v.Preview_Image[0]} width={100} height={100}/>
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
    tableHeaderColor: "danger",
    tableHead: ["RecordID", "Merchant", "Car Maker", "Car Model", "Preview Image", "", "", ""],
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
