import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Admin from "layouts/Admin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardTable from 'components/VerifyTable/GiftCardApproveTable';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
// import { prisma, PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";
import Link from 'next/link'
import { useRouter } from "next/router";

function Verification(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();

  const callback = (package_id_id) => {
    router.push({ pathname: `/admin/verify/${package_id_id}`});
    console.log(package_id_id);
  }

  const OnpackageBtnClick = (user_id) => {
    router.push(`/admin/verify/${user_id}`);
}
  return (
      <CardTable
        callback={callback}
        tableData={props.tableData}
        //OnpackageBtnClick ={OnpackageBtnClick}
      />
  );
}
const Verifystyle = {
    cardColor: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
          color: "#777",
          fontSize: "65%",
          fontWeight: "400",
          lineHeight: "1",
        },
      },
      SearchButton:{
          marginRight: "10%"
      },
      box: {  
      }
}
export async function getServerSideProps() {
    // const prisma = new PrismaClient();
    var tableData = await prisma.MerchantStorefront_merchantpackage.findMany({
      include:{
        MerchantStorefront_package:true,
      }
    })
    //var tableData = await prisma.MerchantStorefront_merchantperkhistory.findMany()
    console.log(tableData);

    tableData = JSON.parse(
      JSON.stringify(tableData, (key, value)=> (typeof value === "bigint" ? value.toString(): value))
    );
    
  return {
      props: {
        tableData: tableData
      }
    }
  }
  Verification.layout = Admin;
  
  export default Verification;
