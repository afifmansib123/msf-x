import React from "react";
import { useState, useRef } from "react";
import makeStyles from '@mui/styles/makeStyles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useRouter } from "next/router";
import Link from "next/link";

function CardApproveLog(props) {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelected] = useState(null);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const inputElement = useRef();

  const onClickAccept = (cardRecord) => {
    handleClickOpen(cardRecord, "approve");
  }
  const onClickReject = (cardRecord) => {
    handleClickOpen(cardRecord, "reject");
  }

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setType("");
  };

  /*const handleSubmit = () => {
    setOpen(false);
    const reason = inputElement.current.value;
    const data = {
      card: selectedCard,
      reason: reason,
      type: type
    }
    props.callback(data)
    setSelected(null);
    setType("");

  }*/
  const handleClickOpen = (Record) => {
    props.callback(Record.package_id_id);
  };

  const router = useRouter();
  const onCurrentPackageClick = (user_id) => {
    props.OnpackageBtnClick(user_id);
  };

  const showedData = props.tableData.filter(val => {
    if (search == "") {
      return val;
    } else if (
      val.serial_no.toLowerCase().includes(search.toLowerCase())
    ) {
      return val
    }
  }).map((value, index) => {
    return [value.serial_no, value.package_id_id, value.id,
    (<Button variant="outlined" onClick={() => { handleClickOpen(value) }} color="success">Details</Button>)]
  });
  return (
    <>
      <GridItem xs={12} sm={12} md={6}>
        <Paper component="form" sx={{ p: '5px 10px', display: 'flex', alignItems: 'justify-end', width: 1000 }}>
          <IconButton sx={{ p: '10px' }} aria-label="menu"></IconButton>
          <InputBase
            sx={{ ml: 0, flex: 1 }}
            placeholder="Please Enter Serial"
            inputProps={{ 'aria-label': '' }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <SearchIcon />
          </IconButton>
        </Paper>
      </GridItem>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color={props.tableHeaderColor}>
              <h4 className={classes.cardTitleWhite}>Gift Card Approval Log</h4>
              <p className={classes.cardCategoryWhite}>
                Give Card Package
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
          <DialogTitle>{type == "approve" ? "Approval Reason" : "Rejection Reason"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Explain your reason
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
            {/*<Button onClick={handleSubmit}>Submit</Button>*/}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

CardApproveLog.defaultProps = {
  tableHeaderColor: "danger",
  tableHead: ["Serial No", "Package ID", "User ID", ""],
};

CardApproveLog.propTypes = {
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

export default CardApproveLog;
