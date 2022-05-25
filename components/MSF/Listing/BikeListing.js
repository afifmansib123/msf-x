import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import makeStyles from "@mui/styles/makeStyles";

// layout for this page
import MSF from "layouts/MSF.js";
import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";
import { useSession } from "next-auth/react";
import axios from "axios";
import UploadedBikesList from "/components/UploadedCarsList/UploadedBikesList";
import { getSession } from "next-auth/react";

export default function ListingPage(props) {
  const { bikes } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 justify-center items-center rounded-lg border bg-white sm:p-8 p-2 sm:mx-32 lg:mx-0 md:mx-4 mt lg:space-x-1 gap-5 ">
        {bikes.map((data) => (
          <UploadedBikesList key={data.bike_id} data={data}></UploadedBikesList>
        ))}
      </div>
    </div>
  );
}

ListingPage.layout = MSF;
ListingPage.auth = true;
