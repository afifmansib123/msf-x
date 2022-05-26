import React, {useState, useMemo} from "react";
import PropTypes from "prop-types";
import {useQuery} from "react-query";
import Box from "@mui/material/Box";


// react plugin for creating charts
import makeStyles from '@mui/styles/makeStyles';

// @mui/icons-material
import Car from "@mui/icons-material/DirectionsCar";
import Bike from "@mui/icons-material/TwoWheeler";

// layout for this page
import MSF from "layouts/MSF.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

//components
import CarListing from "../../components/MSF/Listing/CarListing.js";
import BikeListing from "../../components/MSF/Listing/BikeListing.js";
import {getSession} from "next-auth/react";

import prisma from "/PrismaConnect";


function Listing(props) {

  const { cars } = props;
  const { bikes } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  console.log(props.cars);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title="Uploaded List:"
          headerColor="bhalogari"
          tabs={[
            {
              tabName: "Car",
              tabIcon: Car,
              tabContent: (
                <>
                  <CarListing cars={cars}/>
                </>
              ),
            },
            {
              tabName: "Bike",
              tabIcon: Bike,
              tabContent: (
                <>
                  <BikeListing bikes={bikes}/>
                </>
              ),
            },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}

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
      CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel: true,
      CarsApp_carimage: true,
    },
  });

  var bikes = await prisma.bikesApp_bike.findMany({
    where: {
      created_by_id: user_id,
    },
    include: {
      BikesApp_bikemanufacturer: true,
      BikesApp_bikemodel: true,
      BikesApp_biketype: true,
      BikesApp_bikeimage: true,
    },
  });

  cars = JSON.parse(JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
  bikes = JSON.parse(JSON.stringify(bikes, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

  // console.log(cars[0]);
  // console.log("session", session);
  // console.log("user_id", user_id);
  return { props: { cars: cars , bikes: bikes} };
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
>>>>>>> uat
}
*/

Listing.layout = MSF;
Listing.auth = true;

export default Listing;