import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CusButton from "components/CustomButtons/Button";
import CardFooter from "components/Card/CardFooter.js";
import PropTypes from "prop-types";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { Button } from "@mui/material";
import CustomTabs from "../CustomTabs/CustomTabs";
import CancelIcon from "@mui/icons-material/Cancel";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PendingIcon from "@mui/icons-material/Pending";
import CardAvatar from "../Card/CardAvatar";

function CarApproveLog(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const handleClickOpen = (carRecord) => {
    props.callback(carRecord.carId);
  };

  const onClickedHistoryBtn = (carid) => {
    props.historyBtnClicked(carid);
  };

  var showedData = props.tableData.map((value, index) => {
    return [
      <img src={value.Preview_Image[0]} className="w-[200px] md:w-[300px]" />,
      <div className="grid grid-cols-2">
        <div className="col mr-4 font-medium">Car Name</div>
        <div className="col-md-8">{value.carName}</div>

        <div className="col-3 mr-4 font-medium">Merchant Name</div>
        <div className="col-md-8">{value.Merchant_Name}</div>

        <span className="mr-4 font-medium">Car Maker</span>
        <span>{value.Car_Maker}</span>

        <span className="mr-4 font-medium">Car Country</span>
        <span>{value.manufacturerData.maker_country}</span>

        <span className="mr-4 font-medium">Car Model</span>
        <span>{value.Car_Model}</span>
        <div className="col-span-2">
          <CusButton round color="danger" onClick={() => handleClickOpen(value)}>
            Review
          </CusButton>
        </div>
      </div>,
    ];
  });

  const CarCard = ({ data, status }) => {
    if (data === null || !data || data.length === 0) {
      return <h2 className="text-black">No Data</h2>;
    } else {
      return (
        <div className="grid grid-cols-1">
          <div className="flex flex-row">
            <img src={data.Preview_Image[0]} className="w-[120px] md:w-[240px] mb-2 mr-2" />
            <div className="">
              <h1 className="font-medium text-lg my-2">{data.carName}</h1>
              <div className="mt-10">
                <span className="font-medium mr-4">Requested Name:</span>
                <span>{data.Merchant_Name}</span>
              </div>
              <div>
                <span className="font-medium mr-4">Request Date:</span>
                <span>{data.create_at}</span>
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  onClickedHistoryBtn(data.carId);
                }}
              >
                History
              </Button>
              <CusButton disabled round color="warning" size="sm">
                {status}
              </CusButton>
            </div>
          </div>
        </div>
      );
    }
  };
  const pendingActivityLogCard = () => {
    return props.pendingTab.map((v) => {
      return <CarCard data={v} status="Pending" />;
    });
  };

  const rejectedActivityLogCard = () => {
    return props.rejectedTab.map((v) => {
      console.log(v.create_at);
      return <CarCard data={v} status="Rejected" />;
    });
  };

  const approvedActivityLogCard = () => {
    return props.approvedTab.map((v) => {
      return <CarCard data={v} status="Accepted" />;
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Waiting for Review ({showedData.length})</h2>
      <span>
        Merchants have submitted the cars to be approved. Once these are approved, they will be shown on the public
      </span>
      <Card>
        <CardBody>
          <div className="grid gap-4 grid-cols-2 w-1/2">{showedData}</div>
          {showedData.length === 0 && (
            <div className=" h-[200px]">
              <div className=" absolute right-1/2 bottom-1/2 text-4xl text-gray-200 font-semibold">No Data</div>
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CustomTabs
          title="Approval History"
          headerColor="info"
          tabs={[
            {
              tabName: "Pending",
              tabIcon: PendingIcon,
              tabContent: <div>{pendingActivityLogCard()}</div>,
            },
            {
              tabName: "Rejected",
              tabIcon: CancelIcon,
              tabContent: <div>{rejectedActivityLogCard()}</div>,
            },
            {
              tabName: "Approved",
              tabIcon: AddTaskIcon,
              tabContent: <div>{approvedActivityLogCard()}</div>,
            },
          ]}
        />
      </Card>
    </>
  );
}

CarApproveLog.defaultProps = {
  tableHeaderColor: "warning",
};

CarApproveLog.propTypes = {
  tableHeaderColor: PropTypes.oneOf(["warning", "primary", "danger", "success", "info", "rose", "gray"]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  callback: PropTypes.func,
  pendingTab: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  rejectedTab: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  approvedTab: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  historyBtnClicked: PropTypes.func,
};

export default CarApproveLog;
