import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PrismaClient } from "@prisma/client";

// layout for this page
import Admin from "layouts/Admin.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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

//font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

//form
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import { method } from "cypress/types/bluebird";

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
  const [value, setValue] = React.useState(0);
  const { register, handleSubmit } = useForm();
  const [featureList, setFeatureList] = useState([]);

  //form
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    console.debug("handleChange[newValue]", newValue);
    setValue(newValue);
  };

  const handleRemove = async (data) => {
    // const deleteUser = await prisma.user.delete({where: {id: id}})
    if (window.confirm(`Are you sure you want to delete this record?`)) {
      try {
        console.log("yo id", data);
        const apiURL = `${process.env.NEXT_PUBLIC_API}perk/perk`;
        console.log("API URL", apiURL, { data: data });

        const ret = await axios.delete(apiURL, { data: data });
        console.log("ret ja", ret);

        if (ret.status == 200) {
          // delete from perks as well
          for (const p of perkList) {
            console.log("perkList", { pid: p.id, dataid: data.id });
          }
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
      console.log("yo data", data);
      const apiURL = `${process.env.NEXT_PUBLIC_API}perk/perk`;
      console.log("API URL", apiURL, data);

      const ret = await axios.put(apiURL, data);

      console.log("ret ja", ret);

      if (ret.status == 200) {
        alert("Your new feature has been successfully added into the database");
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
        alert("Error! A problem has been occured while adding your data");
      }
    } catch (err) {
      alert("Error Caught");
      console.error("Error", err);
    }
  };
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
      console.log(index);

      return [
        value.id,
        value.perks,
        value.description,
        value.amount,
        value.price,
        <>
          {/* <Link href="/admin/subscriptions/form/editform"> */}
          <IconButton aria-label="edit" key={index} onClick={() => handleForm(value)}>
            {/* onClick={() => handleClickOpen} */}
            <EditIcon />
          </IconButton>

          {/* </Link> */}
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
      <CardHeader className="text-4xl font-semibold text-center ">Package Management</CardHeader>
      <div className="w-full md:w-auto ">
        <Card>
          {/* <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 700,
            width: 1200,
            m: 0,
          }}
        > */}
          <div className="flex w-full md:w-auto">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              textColor="primary"
              indicatorColor="primary"
              sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
            >
              {packages.map((p, i) => {
                return <Tab label={p.package_name} {...a11yProps(p.id)} />;
              })}
            </Tabs>

            {packages.map((p, i) => {
              return (
                <TabPanel value={value} index={i}>
                  <Stack direction="row" alignItems="center" gap={25}>
                    <h6 style={{ color: "#e25f24", fontWeight: 700, fontSize: 20 }}>
                      {p.description} ({p.package_name})
                    </h6>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </Stack>
                  <Typography variant="caption" display="block" gutterBottom sx={{ mt: 2, mb: 0 }}>
                    Created at
                  </Typography>
                  <Typography variant="body1" gutterBottom style={{ color: "Black", fontWeight: 500 }} sx={{ mb: 4 }}>
                    {p.created_at}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ color: "Black", fontWeight: 700, fontSize: 18 }}
                    sx={{ mb: -3 }}
                  >
                    Key Features:
                  </Typography>
                  {/* <Table tableData={showPerk} /> */}
                </TabPanel>
              );
            })}
            {/* </Box> */}
          </div>
        </Card>
      </div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 style={{ color: "white", fontWeight: 500, fontSize: 18 }}>Pakage's Key Features</h4>
            </CardHeader>
            <CardBody>
              <div>
                <Link href="/admin/subscriptions/form/form">
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
                  <DialogTitle id="alert-dialog-title">{"Update Feature"}</DialogTitle>
                  <form onSubmit={handleSubmit(onSubmitUpdate)}>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="outlined-basic"
                            label="Feature ID"
                            variant="outlined"
                            defaultValue={datas.id}
                            // onChange={(e) => setPerkID(e.target.value)}
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
                            label="Amount"
                            variant="outlined"
                            defaultValue={datas.amount}
                            {...register("amount")}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            defaultValue={datas.price}
                            {...register("price")}
                          />

                          {/* <div className="grid grid-cols-1 mx-10 my-4 space-x-4 space-y-5"> */}
                          <TextField
                            id="outlined-basic"
                            label="Feature Description"
                            variant="outlined"
                            defaultValue={datas.description}
                            {...register("description")}
                          />
                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                      <Button onClick={handleClose} autoFocus color="warning" type="submit">
                        Update Feature
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>

                {/* <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Add New Feature"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Feature ID"
                          variant="outlined"
                          value={perkID}
                          onChange={(e) => setPerkID(e.target.value)}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Feature Description"
                          variant="outlined"
                          value={perk}
                          onChange={(e) => setPerk(e.target.value)}
                        />
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={addPerk} autoFocus color="warning">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog> */}
              </div>

              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Feature", "Description", "Amount", "Price", ""]}
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

  var packages = await prisma.MerchantStorefront_package.findMany({});

  var perks = await prisma.MerchantStorefront_perks.findMany({
    orderBy: [{ perks: "asc" }],
  });

  packages = JSON.parse(
    JSON.stringify(packages, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  perks = JSON.parse(JSON.stringify(perks, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

  console.log("Original", packages[0], perks[0]);

  console.log("Transformed", packages[0], perks[0]);

  return {
    props: {
      packages: packages,
      perks: perks,
    },
  };
}

export default PackageManagement;
