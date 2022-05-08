import React from "react";
import { useState, useRef } from "react";
import makeStyles from '@mui/styles/makeStyles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CusButton from "components/CustomButtons/Button"
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@mui/material/Icon";

import PropTypes from 'prop-types';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";

function CarApproveLog(props) {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelected] = useState(null);
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const inputElement = useRef();

  const handleClickOpen = (carRecord) => {
    setSelected(carRecord);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const validateForm = (reason) => {
    return reason.trim() !== "";
  }

  const handleSubmit = (type) => {
    const reason = inputElement.current.value;
    if (validateForm(reason)) {
        console.log("reason is filled")
    } else {
      alert("Please specify your reason.")
      inputElement.current.focus();
      return
    }

    const data = {
      car: selectedCar,
      reason: reason,
      type: type
    }

    props.callback(data)
    setSelected(null);
    setOpen(false);
  }

  var showedData = props.tableData.map((value, index) => {

    return [value.record_ID, value.Merchant_Name, value.Car_Maker, value.Car_Model, (<img src={value.Preview_Image[0]} width={350} height={350}/>),
      (<Button onClick={() => handleClickOpen(value)}>Detail</Button>), "", ""]
  } );

  return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
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
          <Dialog open={open} onClose={handleClose} fullWidth fullScreen>
            <DialogTitle>
              {
              (selectedCar!=null) ? (selectedCar.carOverview.carName): ""
            }
            </DialogTitle>
            <DialogContent>
              <ul style={{overflowX: "auto", whiteSpace: "nowrap", padding: 0, margin: 0}}>
                {
                  selectedCar!=null ? (selectedCar.Preview_Image.map((value) => {
                    return (
                        <li style={{display: "inline-block", marginInlineEnd: 18}}>
                          <img src={value} width={350} height={350}/>
                        </li>
                    )
                  })) : ""
                }
              </ul>
              <br/>
              <DialogContentText>
                Description
                <Divider/>
                <p>
                  {
                    (selectedCar!=null) ? (selectedCar.carOverview.description): "-"
                  }
                </p>
              </DialogContentText>

              <br/>
              <DialogContentText>
                Car's Model
                <Divider/>
                <div>
                  condition: {(selectedCar!=null) ? (selectedCar.carOverview.condition): "-" }
                </div>
              </DialogContentText>

              <br/>
              <DialogContentText>
                Car's Detail
                <Divider/>
                <GridContainer>
                  <GridItem xs={4} sm={4} md={4}>
                    Body : { (selectedCar!=null) ? (selectedCar.carOverview.body): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    Engine (cc) : { (selectedCar!=null) ? (selectedCar.carOverview.engineCapacity): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    Drive : { (selectedCar!=null) ? (selectedCar.carOverview.drive): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    Mileage (km) : { (selectedCar!=null) ? (selectedCar.carOverview.mileage): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    No. of Seats : { (selectedCar!=null) ? (selectedCar.carOverview.seatingCapacity): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    Transmission : { (selectedCar!=null) ? (selectedCar.carOverview.transmission_type): "-" }
                  </GridItem>


                  <GridItem xs={4} sm={4} md={4}>
                    Fuel Type : { (selectedCar!=null) ? (selectedCar.carOverview.fuelType): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    Exterior Colour : { (selectedCar!=null) ? (selectedCar.carOverview.exterior_color): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    Interior Colour : { (selectedCar!=null) ? (selectedCar.carOverview.interior_color): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    City : { (selectedCar!=null) ? (selectedCar.carOverview.body): "-" }
                  </GridItem>

                  <GridItem xs={4} sm={4} md={4}>
                    Status : { (selectedCar!=null) ? (selectedCar.carOverview.status): "-" }
                  </GridItem>

                </GridContainer>
              </DialogContentText>

              <br/>
              <DialogContentText>
                Car's Features
                <Divider/>

                <GridContainer>
                  <GridItem>
                    <Card>
                      <CardBody>
                        <GridContainer>
                          <GridItem >
                            Body
                          </GridItem>
                          <GridItem>
                            Smt
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem>
                    <Card>
                      <CardBody>
                        <GridContainer>
                          <GridItem >
                            Body
                          </GridItem>
                          <GridItem>
                            Smt
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem>
                    <Card>
                      <CardBody>
                        <GridContainer>
                          <GridItem >
                            Body
                          </GridItem>
                          <GridItem>
                            Smt
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>

                </GridContainer>
              </DialogContentText>

              <br/>
              <DialogContentText>
                Explain your reason <span style={{color:"red"}}>**</span>
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
                  variant="outlined"
                  defaultValue={" "}
                  rows={10}
                  inputProps={{
                    style: {
                      scrollBehavior: "auto"
                    },
                  }}
              />

            </DialogContent>
            <DialogActions>
              <Button color="info" onClick={handleClose}>Close</Button>
              <CusButton color="success" round={true} onClick={() => handleSubmit("approve")}>Approve</CusButton>
              <CusButton color="danger" round={true} onClick={() => handleSubmit("reject")}>Reject</CusButton>
            </DialogActions>
          </Dialog>
        </div>
      </>
  );
}

CarApproveLog.defaultProps = {
  tableHeaderColor: "danger",
  tableHead: ["RecordID", "Merchant", "Car Maker", "Car Model", "Preview Image", "", "", ""],
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
