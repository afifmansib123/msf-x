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
// import StyledTableCell from "@mui/material/StyledTableCell";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

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
  const { merchants, packages } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ff6600",
      color: "#ffff",
      fontWeight: "bold",
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,

    },
  }));

  return (


    <>
      <h1 className="text-4xl font-semibold text-center mb-4">
        Merchants
      </h1>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Subscription</StyledTableCell>
                  <StyledTableCell>Last Login</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>


              {merchants.map((m, i) => {
                return (
                  <TableBody>

                    
                    {m.MerchantStorefront_paymenthistory.map(k => {
                      return (<TableRow   >
                        {packages.map(v => {
                          console.log("Package", v)


                          if (m.id === k.user_id_id && k.package_id_id === v.id) {
                            return (
                              <>

                                <StyledTableCell>
                                  <a href={`/admin/merchants/${m.id}`}>
                                    {m.first_name} {m.last_name}
                                  </a>
                                </StyledTableCell>
                                <StyledTableCell>{m.contact_number}</StyledTableCell>

                                <StyledTableCell>{v.package_name} </StyledTableCell>
                                <StyledTableCell> {m.last_login}
                                </StyledTableCell>
                                <StyledTableCell> <Button color="warning" variant="outlined" href={`/admin/merchants/${m.id}`}>
                                  Details
                                </Button></StyledTableCell>


                              </>

                            )
                          }


                        })}


                      </TableRow>)
                    })}



                  </TableBody>
                );
              })}






            </Table>
          </TableContainer>
        </GridItem>
      </GridContainer>
    </>
  );
}


MerchantPage.layout = Admin;

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  var allMerchants = await prisma.UsersApp_customuser.findMany({
    // where: {
    //   business_user:{
    //    equals: true,
    //   } ,
    //   individual_user:{
    //     equals: true,
    //    } 
    // },

    include: {
      MerchantStorefront_paymenthistory: true,

    },

    // include: {
    //     CarsApp_carmanufacturer: true,
    //     CarsApp_carmodel: true,
    //   },
  });
  var packages = await prisma.MerchantStorefront_package.findMany({

  })

  allMerchants = JSON.parse(
    JSON.stringify(allMerchants, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  packages = JSON.parse(
    JSON.stringify(packages, (key, value) => (typeof value === "bigint" ? value.toString() : value))
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
      packages: packages,
    },
  };
}

export default MerchantPage;
