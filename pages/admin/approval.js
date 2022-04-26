import React from "react";
import makeStyles from '@mui/styles/makeStyles';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CarTable from '../../components/Table/ApproveTable';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Approval(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const callback = (action) => {
    console.log(action);
  }

  return (
      <CarTable
        callback={callback}
        tableData={props.tableData}
      />
  );
}

export async function getServerSideProps(context) {
  var url = "http://localhost:3000/api/approve-log"

  const host = context.req.headers.host
  console.log(host)

  const response = await fetch(url).then(value => value.json()).catch(err => console.log(err));
  if(response.result != null) {
    const tableData = response.result.map(value => {
      return {
        record_ID: value.id,
        Merchant_Name: value.merchant,
        Car_Maker: value.carMaker,
        Car_Model: value.carModel,
        Preview_Image: value.carImage == "" ? `http://${host}/assets/img/car_placeholder.png`: value.carImage
      }
    });
    return {
      props: {
        tableData: tableData
      }
    }
  } else {
    return {
      props: {
        tableData: []
      }
    }
  }
}

Approval.layout = Admin;

export default Approval;
