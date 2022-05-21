import * as React from "react";
import { useRouter } from "next/router";

import Link from "next/link";

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
import axios from "axios";

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
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [merchants, setMerchants] = React.useState([]);
  const router = useRouter();

  const handleChange = (e, value) => {
    setPage(value);
  };
  const totalCount = props.merchantCount || 0;
  const totalPage = Math.ceil(totalCount/10) - 1;


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

  React.useEffect(() => {
    const merchantlist = axios.get(`/api/merchants?page=${page}`).then((v) => {
      let {merchants} = v.data;
      console.log(merchants)
      merchants = merchants || [];
      
      let result = merchants.map((m, index) => {
        return (
          <TableBody key={index}>
            <TableRow   >
              <StyledTableCell>
                {
                  m.first_name !== null ?
                    <a href={`/admin/merchants/${m.id}`}>
                      {m.first_name} {m.last_name}
                    </a> : <div>
                      Not Specify
                    </div>
                }
              </StyledTableCell>

              <StyledTableCell>{m.contact_number}</StyledTableCell>

              {
                m.MerchantStorefront_package.length != 0 ?
                  <StyledTableCell> {m.MerchantStorefront_package[0].package_name} </StyledTableCell>
                  : <StyledTableCell>Non-subscribe</StyledTableCell>
              }
              <StyledTableCell> {m.last_login}
              </StyledTableCell>
              <StyledTableCell> <Button color="warning" variant="outlined" href={`/admin/merchants/${m.id}`}>
                Details
              </Button></StyledTableCell>
            </TableRow>
          </TableBody>
        )
      })
      setMerchants(result)
    })

  }, [page]);


  return (


    <>
      {/* <Button onClick={() => { console.log(merchants) }}>test</Button> */}
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
              {/* {merchants.map((m, i) => {
              {merchants.map((m, i) => {
                return (
                  <TableBody>
                    <TableRow   >
                      <StyledTableCell>
                        {
                          m.first_name !== null ?
                            <a href={`/admin/merchants/${m.id}`}>
                              {m.first_name} {m.last_name}
                            </a> : <div>
                              Not Specify
                            </div>
                        }
                      </StyledTableCell>

                      <StyledTableCell>{m.contact_number}</StyledTableCell>

                      {
                        m.MerchantStorefront_package.length != 0 ?
                          <StyledTableCell> {m.MerchantStorefront_package[0].package_name} </StyledTableCell>
                          : <StyledTableCell>Non-subscribe</StyledTableCell>
                      }


                      <StyledTableCell> {m.last_login}
                      </StyledTableCell>
                      <StyledTableCell> <Button color="warning" variant="outlined" href={`/admin/merchants/${m.id}`}>
                        Details
                      </Button></StyledTableCell>
                    </TableRow>

                   {console.log("Original", m)}
                   {console.log("Package",packages)}
                  {m.MerchantStorefront_paymenthistory.map ( k=> {
                    return ( <TableRow   >
                    {packages.map(v => {
                      console.log("Package",v)
                    
                        
                      if (m.id === k.user_id_id && k.package_id_id === v.id ){
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



                    {m.MerchantStorefront_package.map(v => {

                      return (<>
                        <TableRow   >
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
                        </TableRow>

                      </>

                      )
                    })}
                  </TableBody>
                );
              })} */}
              {merchants}

            </Table>
          </TableContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <div className={"text-center"}>
            <Stack spacing={2} className={"items-center"}>
              <Typography>Page: {page}</Typography>
              <Pagination count={totalPage} page={page} onChange={handleChange} showFirstButton showLastButton size="large" />
            </Stack>
          </div>
        </GridItem>
      </GridContainer>

    </>
  );
}



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

    
      MerchantStorefront_package: true,
     

    },
    include:{
      MerchantStorefront_paymenthistory: true,

      MerchantStorefront_package: true,
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
  // console.log("Transformed", allMerchants[0]);
  let merchantCount = await prisma.UsersApp_customuser.count();
  return {
    props: {
      merchants: allMerchants,
      packages: packages,
    },
  };
}

MerchantPage.layout = Admin;
MerchantPage.auth = true

export default MerchantPage;
