/**
 * @author Paranan Vitpornnitipacha
 * @author Mushi
 */
import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
// layout for this page
import Admin from "layouts/Admin.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import axios from "axios";
// @mui/icons-material
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { orange } from "@mui/material/colors";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

//TabPanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function PackageManagement(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { packages, perks } = props;
  const [perkList, setPerkList] = useState(perks);
  const [packageList, setPackageList] = useState(packages);
  const [value, setValue] = React.useState(0);
  const { register, handleSubmit } = useForm();
  const [featureList, setFeatureList] = useState([]);
  const router = useRouter();
  //form
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleClickOpen = (data) => {
    setOpenEdit(true);
    setPackageValue(data);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    router.push("/admin/packages");
  };
  const handleChange = (event, newValue) => {
    console.debug("handleChange[newValue]", newValue);
    setValue(newValue);
  };

  const handleRemove = async (data) => {
    // const deleteUser = await prisma.user.delete({where: {id: id}})
    if (window.confirm(`Are you sure you want to delete this record?`)) {
      try {
        // console.log("yo id", data);
        const apiURL = `${process.env.NEXT_PUBLIC_API}perk/perk`;
        // console.log("API URL", apiURL, { data: data });
        const ret = await axios.delete(apiURL, { data: data });
        // console.log("ret ja", ret);
        if (ret.status == 200) {
          // delete from perks as well
          // for (const p of perkList) {
          //   console.log("perkList", { pid: p.id, dataid: data.id });
          // }
          const newPerks = perkList.filter((item) => item.id !== data.id);
          setPerkList(newPerks);
          // location.reload();
          alert("Your data has been successfully deleted");
        } else {
          // there's an error
          alert("Error! A problem has been occured while deleting your data");
        }
      } catch (err) {
        alert("Error Caught", err);
        console.error("Error", err);
      }
    }
    // setValue(newList);
  };
  const onSubmitUpdate = async (data) => {
    // do something
    // Cannot connect to the database from here. It has to call through an API
    try {
      // console.log("yo data", data);
      const apiURL = `${process.env.NEXT_PUBLIC_API}perk/perk`;
      // console.log("API URL", apiURL, data);
      const ret = await axios.put(apiURL, data);
      // console.log("ret ja", ret);
      if (ret.status == 200) {
        alert(
          "Your new feature has been successfully updated into the database"
        );
        // search in perkList and update it
        // TODO we can do better by using map, now it's sequential search
        for (let i = 0; i < perkList.length; i++) {
          const p = perkList[i];
          if (p.id == data.id) {
            perkList[i] = data;
            break;
          }
        }
        setPerkList([...perkList]); // create new array with the same data, otherwise state will not change due to the same array ref.
      } else {
        // there's an error
        alert("Error! A problem has been occured while updating your data");
      }
    } catch (err) {
      alert("Error Caught");
      console.error("Error", err);
    }
  };

  const handleRemovePackage = async (data) => {
    if (window.confirm(`Are you sure you want to delete this record?`)) {
      try {
        // console.log("yo id", data);
        const apiURL = `${process.env.NEXT_PUBLIC_API}package/package`;
        // console.log("API URL", apiURL, { data: data });
        const ret = await axios.delete(apiURL, { data: data });
        // console.log("ret ja", ret);
        if (ret.status == 200) {
          // delete from perks as well
          // for (const p of packageList) {
          //   console.log("packageList", { pid: p.id, dataid: data.id });
          // }
          const newPackage = packageList.filter((item) => item.id !== data.id);
          setPackageList(newPackage);
          // location.reload();
          alert("Your data has been successfully deleted");
          router.push("/admin/packages");
        } else {
          // there's an error
          alert("Error! A problem has been occured while deleting your data");
        }
      } catch (err) {
        alert("Error Caught", err);
        console.error("Error", err);
      }
    }
  };

  const updatePackage = async (packagedata) => {
    try {
      // console.log("yo data", packagedata);
      const apiURL = `${process.env.NEXT_PUBLIC_API}package/package`;
      // console.log("API URL", apiURL, packagedata);
      const ret = await axios.put(apiURL, packagedata);
      // console.log("ret ja", ret);
      router.push("/admin/packages");
      if (ret.status == 200) {
        // router.push("/admin/subscriptions/package")
        alert(
          "Your new package has been successfully updated into the database"
        );
      } else {
        // there's an error
        alert("Error! A problem has been occured while updating your data");
      }
    } catch (err) {
      alert("Error Caught");
      console.error("Error", err);
    }
  };
  const [packageValue, setPackageValue] = useState([]);
  const [datas, setData] = useState([]);
  const handleForm = (data) => {
    // const newList = perkList.filter((item) => item.id !== id);
    // const deleteUser = await prisma.user.delete({where: {id: id}})
    //       // there's an error
    setOpen(true);
    setData(data);
  };
  useEffect(() => {
    const showFeature = perkList.map((value, index) => {
      // console.log(index);
      return [
        packageList.map((p, i) => {
          if (value.package_id_id === p.id) {
            return p.package_name;
          }
        }),

        packageList.map((p, i) => {
          if (value.package_id_id === p.id) {
            return p.package_type;
          }
        }),

        value.perks,
        value.description,
        value.amount,
        value.unit,
        <>
          <IconButton
            aria-label="edit"
            key={index}
            onClick={() => handleForm(value)}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="clear" onClick={() => handleRemove(value)}>
            <ClearIcon />
          </IconButton>
        </>,
      ];
    });
    setFeatureList(showFeature);
  }, [perkList]);
  //form
  return (
    <>
      <CardHeader className="text-4xl font-semibold text-center ">
        Package Management
      </CardHeader>
      <div className="w-full md:w-auto ">
        <Link href="/admin/packages/form/packageForm">
          <Button startIcon={<AddIcon />} color="warning">
            New Package
          </Button>
        </Link>
        <Card>
          {packages.map((p, i) => {
            return (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      {" "}
                      <h6
                        style={{
                          color: "#DC7633",
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        [{p.package_type} Pkg.] {p.package_name}
                      </h6>{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {/* <h6
                      style={{
                        color: "#DC7633",
                        fontWeight: 700,
                        fontSize: 20,
                      }}
                    >
                      {p.package_name} ({p.package_type} Pkg.)
                    </h6> */}
                      <div class="float-right">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleClickOpen(p)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="clear"
                          onClick={() => handleRemovePackage(p)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </div>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      display="block"
                      gutterBottom
                      color="#626567"
                      sx={{ mt: -1, mb: 3 }}
                    >
                      {p.description}
                    </Typography>
                    <h1>
                      <sup class="text-xl font-medium">৳ </sup>
                      <span class="text-4xl font-black text-gray-900">
                        {p.price}
                      </span>
                    </h1>

                    {/* <Stack direction="row" alignItems="center" gap={24}>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      color="#909497"
                      sx={{ mt: 4, mb: 4 }}
                    >
                      <p>Amount</p>
                      <br />
                      <p class="text-lg text-black">{p.amount}</p>
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      color="#909497"
                      sx={{ mt: 4, mb: 4 }}
                    >
                      <p>Unit</p>
                      <br />
                      <p class="text-lg text-black">{p.unit}</p>
                    </Typography>
                  </Stack> */}

                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ color: "Black", fontWeight: 700, fontSize: 18 }}
                      sx={{ mb: 0, mt: 4 }}
                    >
                      Key Features:
                    </Typography>
                    <TableContainer component={Paper} class="table-layout">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Features</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Amount</TableCell>
                          <TableCell align="left">Unit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {perks.map((value, index) => {
                          if (value.package_id_id === p.id) {
                            return (
                              <>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell align="left">
                                    {value.perks}
                                  </TableCell>
                                  <TableCell align="left">
                                    {value.description}
                                  </TableCell>
                                  <TableCell align="left">
                                    {value.amount}
                                  </TableCell>
                                  <TableCell align="left">
                                    {value.unit}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          }
                        })}
                      </TableBody>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </>
            );

            // <Tab label={p.package_name} {...a11yProps(p.id)} />;
          })}
        </Card>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 style={{ color: "white", fontWeight: 500, fontSize: 18 }}>
                All Features
              </h4>
            </CardHeader>
            <CardBody>
              <div>
                <Link href="/admin/packages/form/form">
                  <Button startIcon={<AddIcon />} color="warning">
                    New Feature
                  </Button>
                </Link>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Update Feature"}
                  </DialogTitle>
                  <form onSubmit={handleSubmit(onSubmitUpdate)}>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "60ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            name="id"
                            label="id"
                            value={datas.id}
                            hidden
                            {...register("id")}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Feature Name"
                            variant="outlined"
                            defaultValue={datas.perks}
                            {...register("perks")}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Feature Description"
                            variant="outlined"
                            defaultValue={datas.description}
                            {...register("description")}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            defaultValue={datas.amount}
                            {...register("amount")}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Unit"
                            variant="outlined"
                            defaultValue={datas.unit}
                            {...register("unit")}
                          />
                          {/* <div className="grid grid-cols-1 mx-10 my-4 space-x-4 space-y-5"> */}
                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                      <Button
                        onClick={handleClose}
                        autoFocus
                        color="warning"
                        type="submit"
                      >
                        Update Feature
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
                <Dialog
                  open={openEdit}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Update Package"}
                  </DialogTitle>
                  <form onSubmit={handleSubmit(updatePackage)}>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "60ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            name="id"
                            label="id"
                            value={packageValue.id}
                            hidden
                            {...register("id")}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Package Name"
                            variant="outlined"
                            defaultValue={packageValue.package_name}
                            {...register("name")}
                            // onChange={(e) => setPerkID(e.target.value)}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Package Type"
                            variant="outlined"
                            defaultValue={packageValue.package_type}
                            {...register("type")}
                            // {...unregister("unit")}
                            // onChange={(e) => setPerk(e.target.value)}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            defaultValue={packageValue.description}
                            {...register("description")}
                            // onChange={(e) => setPerk(e.target.value)}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Package Price"
                            variant="outlined"
                            defaultValue={packageValue.price}
                            {...register("price")}
                            // onChange={(e) => setPerk(e.target.value)}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            defaultValue={packageValue.amount}
                            {...register("amount")}
                            // onChange={(e) => setPerk(e.target.value)}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Unit"
                            variant="outlined"
                            defaultValue={packageValue.unit}
                            {...register("unit")}
                            // onChange={(e) => setPerk(e.target.value)}
                          />
                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                      <Button
                        onClick={handleClose}
                        type="submit"
                        color="warning"
                      >
                        Update Package
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </div>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  "Package Name",
                  "Package Type",
                  "Feature",
                  "Description",
                  "Amount",
                  "Unit",
                  "",
                ]}
                tableData={featureList}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
PackageManagement.layout = Admin;
export async function getServerSideProps() {
  const prisma = new PrismaClient();
  var packages = await prisma.MerchantStorefront_package.findMany({
    orderBy: [{ package_type: "desc" }],
  });
  var perks = await prisma.MerchantStorefront_perks.findMany({
    orderBy: [{ perks: "asc" }],
  });
  packages = JSON.parse(
    JSON.stringify(packages, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
  perks = JSON.parse(
    JSON.stringify(perks, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
  // console.log("Original", packages[0], perks[0]);
  // console.log("Transformed", packages[0], perks[0]);
  return {
    props: {
      packages: packages,
      perks: perks,
    },
  };
}
export default PackageManagement;
