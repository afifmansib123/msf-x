import React from "react";
import { getSession } from "next-auth/react";
// layout for this page
import MSF from "layouts/MSF.js";
// import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import styles from "/assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import UploadedCarsList from "/components/UploadedCarsList/UploadedCarsList";

import prisma from "/PrismaConnect";
// import { PrismaClient } from "@prisma/client";

const listing = ({ data }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // const [item, setItem] = useState([]);

  // const { data: session, status } = useSession();
  // console.log("Session Status", status);

  // fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/user-car-list/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setItems(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [searchKey]);
  return (
    <div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 justify-center items-center rounded-lg border bg-white sm:p-8 p-2 sm:mx-32 lg:mx-0 md:mx-4 mt lg:space-x-1 gap-5 ">
        {data.map((data) => (
          <UploadedCarsList key={data.car_id} data={data}></UploadedCarsList>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { token } = session;
  const { id: user_id } = token;
  var cars = await prisma.carsApp_car.findMany({
    where: {
      created_by_id: user_id,
    },
    include: {
      CarsApp_carmanufacturer: true,
      CarsApp_carmodel: true,
      CarsApp_cartype: true,
      CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel:true,
      CarsApp_carimage:true
    },
  });

  cars = JSON.parse(JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

  console.log(cars[0]);
  // console.log("session", session);
  console.log("user_id", user_id);
  return { props: { data: cars } };
}

/*
export async function getServerSideProps() {
  // Fetch data from external API
  const session = await getSession();
  console.log("session",session);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BG_API}cars/user-car-list/41/?format=json`
  );
  const data = await res.json();
  console.table(data);
  // Pass data to the page via props
  return { props: { data } };
}
*/
listing.layout = MSF;

export default listing;
