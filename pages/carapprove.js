import React from "react";
import { useState, useRef } from "react";
import makeStyles from '@mui/styles/makeStyles';

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";

import PropTypes from 'prop-types';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function CarApproveLog(props) {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelected] = useState(null);
  const [type, setType] = useState("");

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const inputElement = useRef();
  
  const onClickAccept = (carRecord) => {
    handleClickOpen(carRecord, "approve");
  }

  const onClickReject = (carRecord) => {
    handleClickOpen(carRecord, "reject");
  }

  const handleClickOpen = (carRecord, type) => {
    setSelected(carRecord);
    setOpen(true);
    setType(type)
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setType("");
  };

  const handleSubmit = () => {
    setOpen(false);
    const reason = inputElement.current.value;

    const data = {
      car: selectedCar,
      reason: reason,
      type: type
    }

    props.callback(data)
    setSelected(null);
    setType("");

  }

  const showedData = props.tableData.map((value, index) => {

    return [value.record_ID, value.Merchant_Name, value.Car_Maker, value.Car_Model, (<img src={value.Preview_Image} width={350} height={350}/>),
     (<Button variant="outlined" onClick={() => onClickAccept(value)} color="success">Accept</Button>),
      <Button variant="outlined" onClick={() => onClickReject(value)} color="error">Reject</Button>]
  });

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color={props.tableHeaderColor}>
              <h4 className={classes.cardTitleWhite}>Car Approve Log</h4>
              <p className={classes.cardCategoryWhite}>
                Pending Car's approve
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor={props.tableHeaderColor}
                tableHead={props.tableHead}
                tableData={showedData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <div>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>{type == "approve" ? "Aprroval Reason": "Rejected Reason"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              explain your reason
            </DialogContentText>
            <TextField
              inputRef={inputElement}
              autoFocus
              margin="dense"
              id="name"
              label="Reason"
              type="text"
              multiline
              fullWidth
              variant="filled"
              defaultValue={" "}
              inputProps={{
                style: {
                  height: "400px",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}


export async function getServerSideProps() {
  var url = "http://localhost:3000/log.json"

  const tableData = await fetch(url).then(value => value.json()).catch(err => console.log(err));

  return {
    props: {
      tableData: tableData
    }
  }
}


CarApproveLog.defaultProps = {
  tableHeaderColor: "danger",
  tableHead: ["RecordID", "Merchant", "Car Maker", "Car Model", "Preview Image", "", ""],
};

CarApproveLog.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  callback: PropTypes.func
};


export default CarApproveLog;
