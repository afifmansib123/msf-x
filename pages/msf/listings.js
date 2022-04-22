import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Button } from "@mui/material";
// layout for this page
import MSF from "layouts/MSF.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { PrismaClient } from "@prisma/client";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
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
};

function Listing(props) {
  const { cars } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const carRow = cars.map((car) => [
    car.car_name,
    `${car.CarsApp_carmanufacturer.maker_name} ${car.CarsApp_carmodel.model_name}`,
    car.fixed_price,
    car.no_of_views,
  ]);
  return (
    <div>
      <h1>You have {cars.length} listings</h1>
      <div className="grid grid-cols-2">
        <div>
          <Button variant="outlined" startIcon={<DirectionsCarFilledIcon />}>
            New Car
          </Button>
          <Button variant="outlined" startIcon={<TwoWheelerIcon />}>
            New Bike
          </Button>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>My Listing</h4>
                {/* <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p> */}
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Maker/Model", "Price", "#Views"]}
                  tableData={carRow}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  var allCars = await prisma.carsApp_car.findMany({
    where: {
      created_by_id: 19,
    },
    include: {
      CarsApp_carmanufacturer: true,
      CarsApp_carmodel: true,
    },
  });

  allCars = JSON.parse(JSON.stringify(allCars, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

  console.log("Original", allCars[0]);
  // allCars = allCars.map((car) => {
  //   // Convert each fields.
  //   // Ex: the id was a BigInt and cannot be serialised to JSON, so convert to Number
  //   let car2 = {};
  //   car2["id"] = Number(car.id);
  //   car2["maker"] = car.CarsApp_carmanufacturer.maker_name;
  //   car2["fixed_price"] = Number(car.fixed_price);
  //   car2["view_count"] =
  //   return car2;
  // });
  console.log("Transformed", allCars[0]);

  return {
    props: {
      cars: allCars,
    },
  };
}

Listing.layout = MSF;

export default Listing;
