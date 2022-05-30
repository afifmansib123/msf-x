import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";
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
import DeleteIcon from '@mui/icons-material/Delete';
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

function DeductPerk(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const {perks} = props;
  const [perkdata, setPerkData] = useState(perks);
  const {register, handleSubmit } = useForm();
  const [allperklist, setAllperklist] = useState([]);
  const router = useRouter();
  //form
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  
  const handleClickOpen = (data) => {
    setOpenEdit(true);
    
  };
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    //router.push(`/admin/verify/`);
  };
  
  const UpdatePerkList = async (data) => {
    try {
      console.log("", data);
      const apiURL = `${process.env.NEXT_PUBLIC_API}perk/perk`;
      console.log("API URL", apiURL, data);
      const resquest = await axios.put(apiURL, data);
      console.log("request see",resquest);
      if (resquest.status == 200) {
        alert("Your perk has been successfully deducted into the database");
        for (let i = 0; i < perkdata.length; i++) {
          var p = perkdata[i];
          if (p.id == data.id) {
            perkdata[i] = data;
            break;
          }
        }
        setPerkData([...perkdata]);
      } else {
        // there's an error
        alert("Error! Somthing went wrong");
      }
    } catch (err) {
      alert("Error Caught");
      console.error("Error", err);
    }
  };

  const [voucher,setVoucher] = useState([]);
  const handlevoucherchange = (v) => {
    setOpen(true);
    setVoucher(v);
  };
  useEffect(() => {
    const ManagePerk = perkdata.map((value, index) => {
      console.log(index);
      return [value.perks,value.price,value.description,value.package_type,value.amount,value.unit,
        (<IconButton variant="outlined" key={index} onClick={() => handlevoucherchange(value)}>
            <EditIcon />
          </IconButton>),
        //   (<IconButton variant="outlined" key={index} onClick={() => Delete(value)}>
        //   <DeleteIcon/>
        // </IconButton> )
      ];
    });
    setAllperklist(ManagePerk);
  }, [perkdata]);

  const Delete = async (data) => {
    // const deleteUser = await prisma.user.delete({where: {id: id}})
    if (window.confirm(`Are you sure you want to delete this record?`)) {
      try { 
        const apiURL = `${process.env.NEXT_PUBLIC_API}perk/perk`;
        console.log("API URL", apiURL, { data: data });
        const ret = await axios.delete(apiURL, { data: data });
        console.log("ret ja", ret);
        if (ret.status == 200) {
          
          for (const p of perkdata) {
            console.log("perkList", { pid: p.id, dataid: data.id });
          }
          const newPerks = perkdata.filter((item) => item.id !== data.id);
          setPerkData(newPerks);
       
          alert("successfully deleted");
        } else {
       
          alert("Error");
        }
      } catch (err) {
        alert("Error Caught", err);
        console.error("Error", err);
      }
    }
    
  };
  
  //form
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 style={{ color: "danger", fontWeight: 500, fontSize: 18 }}>
                Manage Feature
              </h4>
            </CardHeader>
            <CardBody>
              <div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Daduct the Balance
                  </DialogTitle>
                  <form onSubmit={handleSubmit(UpdatePerkList)}>
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
                            value={voucher.id}
                            hidden
                            {...register("id")}
                          /> 

                          <TextField
                            id="perks"
                            label="Perk Name"
                            value={voucher.perks}
                            //hidden
                            {...register("perks")}
                          /> 

                          <TextField
                            id="price"
                            label="Price"
                            value={voucher.price}
                            //hidden
                            {...register("price")}
                          /> 

                          <TextField
                            id="Amount Used"
                            label="Amount Used"
                            variant="outlined"
                            defaultValue={voucher.amount}
                            {...register("amount")}
                          />

                          <TextField
                            id="Package Type"
                            label="Package Type"
                            variant="outlined"
                            value={voucher.package_type}
                            {...register("package_type")}
                          />
                          <TextField
                            id="Unit"
                            label="Unit"
                            variant="outlined"
                            value={voucher.unit}
                            {...register("unit")}
                          />

                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
                      <Button onClick={handleClose}autoFocuscolor="warning"type="submit">
                        Update 
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </div>
              <Table
                tableHeaderColor="danger"
                tableHead={["Feature","Price","Description","Package Type","Amount","Unit",""]}
                tableData={allperklist}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

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


DeductPerk.layout = Admin;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const perks = await await getManagePerk(parseInt(id));
 return {
  props: {
    perks: perks,
    },
  };
}

async function getManagePerk(package_id_id) {
  // const prisma = new PrismaClient();
  const data = await prisma.MerchantStorefront_perks.findMany({
    where: {
      package_id_id: package_id_id,
    }
  }).catch((err) => {
    throw new Error(err);
  });

  const parsedData = JSON.parse(
    JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  return parsedData;
}

export default DeductPerk;


