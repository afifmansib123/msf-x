import React from "react";
import Link from "next/link";
import makeStyles from "@mui/styles/makeStyles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { PrismaClient } from "@prisma/client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

function MerchantPage(props) {
  const { merchants } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Class</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align="center">Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {merchants.map((m, i) => {
              return (
                <TableRow>
                  <TableCell>
                      {m.first_name} {m.last_name}

                  </TableCell>
                  <TableCell>
                    <a href={`/admin/merchants/${m.id}`}>
                      {m.first_name} {m.last_name}
                    </a>
                  </TableCell>
                  <TableCell>{m.contact_number}</TableCell>
                  {/* <TableCell align="center">
                    <img className="w-[120px]" src={m.image_url} />
                  </TableCell> */}
                  <TableCell align="center">{m.is_paid ? "Paid": "Not yet"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </GridItem>

    </GridContainer>
  );
}

MerchantPage.layout = Admin;

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  var allMerchants = await prisma.UsersApp_customuser.findMany({
    where: {
      business_user: true,
    },
    // include: {
    //     CarsApp_carmanufacturer: true,
    //     CarsApp_carmodel: true,
    //   },
  });

  allMerchants = JSON.parse(
    JSON.stringify(allMerchants, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  console.log("Original", allMerchants[0]);
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
  console.log("Transformed", allMerchants[0]);

  return {
    props: {
      merchants: allMerchants,
    },
  };
}

export default MerchantPage;
