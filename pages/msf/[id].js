/*eslint-disable*/
import React from "react";
import { useRouter } from "next/router";
import makeStyles from "@mui/styles/makeStyles";
// layout for this page
import MSF from "layouts/MSF.js";
import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";

function Storefront() {
  // const useStyles = makeStyles(styles);
  // const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Merchant ID: {id}</h1>
    </div>
  );
}

Storefront.layout = MSF;

export default Storefront;
