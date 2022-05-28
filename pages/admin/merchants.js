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
// import { isTemplateExpression } from "typescript";
import { format } from "date-fns";

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
  const [merList, setMerList] = React.useState([])
  const useStyles = makeStyles(styles);
  const [itemList, setItemList] = React.useState([])
  const { packages, payments } = props;
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);
  const [checkbox1, setCheckedBox1] = React.useState(false)
  const [checkbox2, setCheckedBox2] = React.useState(false)
  const [page, setPage] = React.useState(1);
  const [state, setState] = React.useState({
    NonSub: false,
    Sub: false,
  });
  const arrobj = {
    name: "",
    phone_num: "",
    subscription: "",
    last_login: "",
    merchantid: ""
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onCheckChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  }
  const { NonSub, Sub } = state;
  const handleChange = (e, value) => {
    setPage(value);
  };
  const onCheckChangeBox1 = (event) => {
    setCheckedBox1(event.target.checked)
  }
  const onCheckChangeBox2 = (event) => {
    setCheckedBox2(event.target.checked)
  }
  var totalCount = props.merchantCount || 0;
  var totalPage = Math.ceil(totalCount / 10);
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
    let { merchants } = props;
    merchants = merchants || [];
    let found1 = false;
    let result = merchants.map((m, index) => {
      var arrobj = {
        name: "",
        phone_num: "",
        subscription: "",
        last_login: "",
        merchantid: ""
      }
      let found2 = false;
      const foundFunc = (found2) => {
        if (!found2) {
          found2 = true;
          arrobj
          return "Non Subscription"
        }
      }
      m.first_name !== null ? (
        arrobj.name = m.first_name + " " + m.last_name
      ) : (
        arrobj.name = "Not Specify"
      )
      arrobj.phone_num = m.contact_number
      var a = ""
      payments.map((j) => {
        if (m.id == j.user_id_id) {
          return packages.map((k) => {
            if (
              j.package_id_id == k.id &&
              k.package_type == "subscription" && !found1
            ) {
              found1 = true;
              found2 = true;
              return a = k.package_name
            }
          });
        }
      })
      if (a != "") {
        arrobj.subscription = a
      } else {
        arrobj.subscription = foundFunc(found2)
      }
      arrobj.last_login = m.last_login
      arrobj.merchantid = m.id
      merList.push(arrobj)
    })
    setItemList(merList)
    setMerList(merList)
  }, [])
  function filterSub(box1, box2) {
    if (box1 == false && box2 == false || box1 == true && box2 == true) {
      totalCount = itemList.length || 0; // 59
      totalPage = Math.ceil(itemList.length / 10); // 5
      return itemList.slice((page - 1) * 10, 10 * page)
    }
    if (box1 == true && box2 == false) {
      const z = itemList.filter(function (el) {
        return (el.subscription == "Non Subscription");
      })
      totalCount = z.length || 0;
      totalPage = Math.ceil(z.length / 10);
      return z.slice((page - 1) * 10, 10 * page)
    } else {
      const a = itemList.filter(function (el) {
        return (el.subscription != "Non Subscription");
      })
      totalCount = a.length || 0;
      totalPage = Math.ceil(a.length / 10);
      return a.slice((page - 1) * 10, 10 * page)
    }
  }
  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-4">Merchants</h1>
      <div>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox onChange={onCheckChangeBox1} name="NonSub" />}
            label="Non Subscription"
          />
          <FormControlLabel
            control={<Checkbox onChange={onCheckChangeBox2} name="Sub" />}
            label="Subscription"
          />
        </FormGroup>
      </div>
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
              <TableBody>
                {filterSub(checkbox1, checkbox2).map((item, index) => {
                  return (
                    <TableRow>
                      <StyledTableCell>{item.name}</StyledTableCell>
                      <StyledTableCell>{item.phone_num}</StyledTableCell>
                      <StyledTableCell>{item.subscription}</StyledTableCell>
                     
                      <StyledTableCell> {item.last_login
                          ? format(new Date(item?.last_login), "dd MMM yyyy")
                          : "-"}</StyledTableCell>
                      <StyledTableCell> <Button
                        color="warning"
                        variant="outlined"
                        href={`/admin/merchants/${item.merchantid}`}
                      >
                        Details
                      </Button></StyledTableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              {/* {merchants} */}
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