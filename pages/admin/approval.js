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

export async function getServerSideProps() {
    
  var url = "http://localhost:3000/log.json"

  const tableData = await fetch(url).then(value => value.json()).catch(err => console.log(err));

  return {
    props: {
      tableData: tableData
    }
  }
}

Approval.layout = Admin;

export default Approval;
