import React from "react";
import { getSession } from "next-auth/react";

// layout for this page
import MSF from "layouts/MSF.js";
// import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import UploadedCarsList from "../../components/UploadedCarsList/UploadedCarsList";

const listing = ({ data }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 justify-center items-center rounded-lg border bg-white sm:p-8 p-2 sm:mx-32 lg:mx-0 md:mx-4 mt lg:space-x-1 gap-5 ">
        {data.results.map((data) => (
          <UploadedCarsList key={data.car_id} data={data}></UploadedCarsList>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const session = await getSession();
  console.log(session);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BG_API}api/cars/user-car-list/41/?format=json`
  );
  const data = await res.json();
  console.table(data);
  // Pass data to the page via props
  return { props: { data } };
}

listing.layout = MSF;

export default listing;
