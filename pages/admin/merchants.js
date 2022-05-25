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
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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
  const { packages, payments } = props;
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);
  const arr = []
  const handleChange = (e, value) => {
    setPage(value);
  };
  const totalCount = props.merchantCount || 0;
  const totalPage = Math.ceil(totalCount / 10) - 1;

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
    const merchantlist = axios.get(`/api/merchants?page=${page}&filter1=${checked1}&filter2=${checked2}&filter3=${checked3}&filter4=${checked4}`).then((v) => {
      let { merchants } = v.data;
     
      merchants = merchants || [];
      let found1 = false;

      // var list = [];
      // const mer = merchants.map((mc, k) => {
      //   console.log("mc", mc)
      //   return payments.map((pa, i) => {
      //     console.log("pa", pa)
      //     if (mc.id === pa.user_id_id) {
      //       return packages.map((p, k) => {
      //         console.log("pkg", p)
      //         if(pa.package_id_id === p.id && p.package_type === "subscription") {
      //           return list.push(p.package_name)
      //         } else {
      //           return list.push("Non-Sub")
      //         }
      //       })
      //     }
      //   });
      // });
      // console.log("Please work", list)

      // const payment_user = payments.map((v, i) => {
      //   if(m.id === v.user_id_id &&
      //     v.package_id_id === j.id && j.package_type === "subscription") {
      //     return []
      //   }
      // })

      let result = merchants.map((m, index) => {
        let found2 = false;
      
        const foundFunc = (found2) => {
          if (!found2) {
            found2 = true;
            return <div>Non Subscription</div>
          }
        }
        return (

          <TableBody key={index}>
            <TableRow>
              <StyledTableCell>
                {m.first_name !== null ? (
                  <a href={`/admin/merchants/${m.id}`}>
                    {m.first_name} {m.last_name}
                  </a>
                ) : (
                  <div>Not Specify</div>
                )}
              </StyledTableCell>

              <StyledTableCell>{m.contact_number}</StyledTableCell>
              <StyledTableCell>
                {

                  payments.map((j) => {

                    if (m.id == j.user_id_id) {

                      return packages.map((k) => {
                        if (
                          j.package_id_id == k.id &&
                          k.package_type == "subscription" && !found1
                        ) {
                          console.log("k", k);
                          console.log("pakage", k.package_name);
                          found1 = true;
                          found2 = true;
                          console.log("arr", arr.slice(-1).pop())
                          // arr.push(k.package_name);
                          return <div>{k.package_name}</div>
                          //  return arr[arr.length-1]}

                        }
                        // return <div>Non Subscribe</div>
                      });

                    }
                    // if (!found2) {
                    //   found2 = true;
                    //   return <div>non-subscribe</div>
                    // } 

                  })



                  // payments.map((j) => {
                  //   if (m.id == j.user_id_id) {
                  //     console.log("j", j);
                  //     return packages.map((k) => {
                  //       if (
                  //         j.package_id_id == k.id &&
                  //         k.package_type == "subscription"
                  //       ) {
                  //         console.log("k", k);
                  //         console.log("pakage", k.package_name);
                  //         // found = true;
                  //         console.log("arr", arr.slice(-1).pop())
                  //        // arr.push(k.package_name);
                  //         return <div>{k.package_name}</div>
                  //       //  return arr[arr.length-1]}

                  //       }
                  //       // return <div>Non Subscribe</div>
                  //     });

                  //   } else {
                  //     return 
                  //   } 

                  // }) || "UNKNOWN"


                  // packages.map(k => {
                  //   console.log(k)
                  // console.log(m.MerchantStorefront_package[0].package_name)
                  // {payments.map(j => {
                  //   console.log("J", j)
                  //   if (m.id == j.user_id_id &&
                  //     j.package_id_id === k.id && k.package_type === "subscription")
                  //     console.log("ID", j.id)
                  //      return (<h3>{k.package_name}</h3>)
                  // m.MerchantStorefront_package.length != 0 ?
                  //  m.MerchantStorefront_package[0].package_name
                  //   : "Non-subscribe"
                  // })}
                  // })
                }
                {foundFunc(found2)}
              </StyledTableCell>
              <StyledTableCell> {m.last_login}</StyledTableCell>
              <StyledTableCell>
                {" "}
                <Button
                  color="warning"
                  variant="outlined"
                  href={`/admin/merchants/${m.id}`}
                >
                  Details
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        );
      });
      setMerchants(result);
    });
  }, [page,checked1, checked2]);

  const handleChange3 = (event) => {
    setChecked1(event.target.checked);
};
const handleChange4 = (event) => {
    setChecked2(event.target.checked);
};
const handleChange5 = (event) => {
  setChecked3(event.target.checked);
};
const handleChange6 = (event) => {
  setChecked4(event.target.checked);
};
function test() {
  console.log(checked1,checked2,checked3,checked4)
}

  return (
    <>
      {/* <Button onClick={() => { console.log(merchants) }}>test</Button> */}
      <h1 className="text-4xl font-semibold text-center mb-4">Merchants</h1>

      {/* <Button onClick={()=>test()}>test</Button> */}

      {/* <div>

        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={checked1} onChange={handleChange3}  />}
            label="Non Subscription"
          />
          <FormControlLabel
            control={<Checkbox checked={checked2} onChange={handleChange4}  />}
            label="Silver"
          />
          <FormControlLabel
            control={<Checkbox checked={checked3} onChange={handleChange5}  />}
            label="Gold"
          />
          <FormControlLabel
            control={<Checkbox checked={checked4} onChange={handleChange6}  />}
            label="Diamond"
          />
        </FormGroup>

      </div> */}


      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Subscription</StyledTableCell>
                  <StyledTableCell>Last Login</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              {merchants}
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <div className={"text-center"}>
            <Stack spacing={2} className={"items-center"}>
              <Typography>Page: {page}</Typography>
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
                size="large"
              />
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
    include: {
      MerchantStorefront_paymenthistory: true,
    },
  });
  var packages = await prisma.MerchantStorefront_package.findMany({});
  var payments = await prisma.MerchantStorefront_paymenthistory.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  // const users = await prisma.UsersApp_customuser.findMany();

  // let newlo = []
  // for (const user of users) {
  //   const pay = await prisma.MerchantStorefront_paymenthistory.findFirst({
  //     where: {
  //       user_id_id: user.id,
  //     },
  //     include:{
  //       MerchantStorefront_package: {
  //         select:{
  //           id:true,
  //           package_name:true,
  //           package_type:true,
  //         },
  //       },
  //     },
  //   }).then(() => {
  //     const pkg = await prisma.MerchantStorefront_package.findFirst({
  //       where: {
  //         id: pay.package_id_id
  //       }
  //     })
  //   });
  // }

  allMerchants = JSON.parse(
    JSON.stringify(allMerchants, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  packages = JSON.parse(
    JSON.stringify(packages, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  payments = JSON.parse(
    JSON.stringify(payments, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
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
      merchantCount: merchantCount,
      payments: payments,
    },
  };
}

MerchantPage.layout = Admin;
MerchantPage.auth = true;

export default MerchantPage;