import React from "react";
import { useState, useRef } from "react";
import makeStyles from '@mui/styles/makeStyles';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
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
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image'
import test_card from './test_card.jpg';

function GiftCardDetail(props) {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelected] = useState(null);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const useStyles = makeStyles(styles);
  const inputElement = useRef();

  const onClickUpdate = (cardRecord) => {
    handleClickOpen(cardRecord, "approve");
  }
  const handleSubmit = () => {
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
  }
  return (
    <>
      <GridContainer>
        <GridItem xs={2.5} sm={2.5} md={2.5}>
          <Image src={test_card} width={500} height={500} />
        </GridItem>
        <GridItem xs={9.5} sm={9.5} md={9.5}>
          <Card>
            <CardHeader color={props.tableHeaderColor}>
              <h4 className={classes.cardTitleWhite}>Gift Card Update</h4>
              <p className={classes.cardCategoryWhite}>
                Change the remaining usage of a card
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor={props.tableHeaderColor}
                tableHead={props.tableHead}
                tableData={
                  [["0001", "008593845", "Active", "Car Wash, Tire Change", "8", "UPDATE HERE"]]
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          <FormControl>
            <InputLabel htmlFor="uses-input">Remaining uses:</InputLabel>
            <Input id="uses-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Type here to update remaining uses.</FormHelperText>
            <IconButton aria-label="update"><EditIcon /></IconButton>
          </FormControl>
        </GridItem>
      </GridContainer>
    </>
  );
}

GiftCardDetail.defaultProps = {
  tableHeaderColor: "danger",
  tableHead: ["Card ID", "Serial Number", "Status", "Perks", "Remaining Uses", "UPDATE USES"],
};

GiftCardDetail.propTypes = {
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


export default GiftCardDetail;
