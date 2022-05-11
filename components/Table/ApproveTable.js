import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CusButton from "components/CustomButtons/Button"
import CardFooter from "components/Card/CardFooter.js";

import PropTypes from 'prop-types';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import {
    Button,
} from "@mui/material";
import CustomTabs from "../CustomTabs/CustomTabs";

import CancelIcon from '@mui/icons-material/Cancel';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PendingIcon from '@mui/icons-material/Pending';
import CardAvatar from "../Card/CardAvatar";

function CarApproveLog(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const handleClickOpen = (carRecord) => {
        props.callback(carRecord.carId);
    };

    const onClickedHistoryBtn = (carid) => {
        props.historyBtnClicked(carid)
    }

    var showedData = props.tableData.map((value, index) => {

        return [(
            <img src={value.Preview_Image[0]} width={350}/>), "", "",
            (<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <div className="col mr-4 font-medium">Car Name</div>
                    <div className="col-md-8">{value.carName}</div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <div className="col-3 mr-4 font-medium">Merchant Name</div>
                    <div className="col-md-8">{value.Merchant_Name}</div>
                </GridItem>


                <GridItem xs={12} sm={12} md={12}>
                    <span className="mr-4 font-medium">Car Maker</span>
                    <span>{value.Car_Maker}</span>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <span className="mr-4 font-medium">Car Country</span>
                    <span>{value.manufacturerData.maker_country}</span>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <span className="mr-4 font-medium">Car Model</span>
                    <span>{value.Car_Model}</span>
                </GridItem>
                <GridItem>
                    <CusButton round color="danger" onClick={() => handleClickOpen(value)}>Detail</CusButton>
                </GridItem>
            </GridContainer>)]
    });

    const pendingActivityLogCard = ()=> {
        return props.pendingTab.map(v => {
        return (
            <GridItem>
                <Card className="border-2 border-sky-500 border-solid" style={{height: 450}}>
                    <CardHeader color="warning" className="text-center">
                        <h1 className="text-center font-medium text-lg my-2">{v.carName}</h1>
                    </CardHeader>

                    <CardBody>
                        <CardAvatar plain>
                            <img src={v.Preview_Image[0]} style={{width: 250, alignContent:"center", alignItems:"center"}}/>
                        </CardAvatar>
                        <div className="mt-10">
                            <span className="font-medium mr-4">Requested Name:</span>
                            <span>{v.Merchant_Name}</span>
                        </div>
                        <div>
                            <span className="font-medium mr-4">Request Date:</span>
                            <span>{v.create_at}</span>
                        </div>
                    </CardBody>
                    <CardFooter plain>
                        <Button variant="outlined" onClick={() => {onClickedHistoryBtn(v.carId)}}>History</Button>
                        <div className="text-right">
                            <span className="mr-4 text-sm">Status:</span>
                            <CusButton disabled round color="warning" size="sm">PENDING</CusButton>
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        )
    })};

    const rejectedActivityLogCard = ()=> {
        return props.rejectedTab.map(v => {
            console.log(v.create_at)
            return (
                <GridItem>
                    <Card className="border-2 border-sky-500 border-solid" style={{height: 450 ,scrollableY: "auto"}}>
                        <CardHeader color="danger" className="text-center">
                            <h1 className="text-center font-medium text-lg my-2">{v.carName}</h1>
                        </CardHeader>

                        <CardBody>
                            <CardAvatar plain>
                                <img src={v.Preview_Image[0]} style={{width: 250, alignContent:"center", alignItems:"center"}}/>
                            </CardAvatar>
                            <div className="mt-10">
                                <span className="font-medium mr-4">Requested Name:</span>
                                <span>{v.Merchant_Name}</span>
                            </div>
                            <div>
                                <span className="font-medium mr-4">Rejected Name:</span>
                                <span>{v.approveBy}</span>
                            </div>

                            <div>
                                <span className="font-medium mr-4">Reason:</span>
                                <span>{v.reason}</span>
                            </div>

                            <div>
                                <span className="font-medium mr-4">Rejected Date:</span>
                                <span>{v.create_at}</span>
                            </div>
                        </CardBody>
                        <CardFooter plain>
                            <Button variant="outlined" onClick={() => {onClickedHistoryBtn(v.carId)}}>History</Button>
                            <div className="text-right">
                                <span className="mr-4 text-sm">Status:</span>
                                <CusButton disabled round color="danger" size="sm">REJECTED</CusButton>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            )
        })};

    const approvedActivityLogCard = ()=> {
        return props.approvedTab.map(v => {
            return (
                <GridItem>
                    <Card className="border-2 border-sky-500 border-solid" style={{height: 450, scrollableY: "auto"}}>
                        <CardHeader color="success" className="text-center">
                            <h1 className="text-center font-medium text-lg my-2">{v.carName}</h1>
                        </CardHeader>

                        <CardBody>
                            <CardAvatar plain>
                                <img src={v.Preview_Image[0]} style={{width: 250, alignContent:"center", alignItems:"center"}}/>
                            </CardAvatar>
                            <div className="mt-10">
                                <span className="font-medium mr-4">Requested Name:</span>
                                <span>{v.Merchant_Name}</span>
                            </div>
                            <div>
                                <span className="font-medium mr-4">Approval Name:</span>
                                <span>{v.approveBy}</span>
                            </div>
                            <div>
                                <span className="font-medium mr-4">Reason:</span>
                                <span>{v.reason}</span>
                            </div>
                            <div>
                                <span className="font-medium mr-4">Approved Date:</span>
                                <span>{v.create_at}</span>
                            </div>
                        </CardBody>
                        <CardFooter plain>
                            <Button variant="outlined" onClick={() => {onClickedHistoryBtn(v.carId)}}>History</Button>
                            <div className="text-right">
                                <span className="mr-4 text-sm">Status:</span>
                                <CusButton disabled round color="success" size="sm">APPROVED</CusButton>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            )
        })};

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
                                tabIcon: PendingIcon,
                                tabContent: (
                                    <GridContainer>
                                        {pendingActivityLogCard()}
                                    </GridContainer>
                                )
                            },
                            {
                                tabName: "Rejected",
                                tabIcon: CancelIcon,
                                tabContent: (
                                    <GridContainer>
                                        {rejectedActivityLogCard()}
                                    </GridContainer>
                                ),
                            },
                            {
                                tabName: "Approved",
                                tabIcon: AddTaskIcon,
                                tabContent: (
                                    <GridContainer>
                                        {approvedActivityLogCard()}
                                    </GridContainer>
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
    tableHeaderColor: "warning"
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
    approvedTab: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    historyBtnClicked: PropTypes.func
};


export default CarApproveLog;
