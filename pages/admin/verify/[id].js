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
import Admin from "layouts/Admin.js";
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import IconButton from '@mui/material/IconButton';
import Image from 'next/image'
import { prisma } from "@prisma/client";

function GiftCardDetail(props) {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelected] = useState(null);
  const [type, setType] = useState("");
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const inputElement = useRef();
  const { data: session, status } = useSession();
  console.log("useSession", session);
  const { token } = session;
  const { id } = token;
  const onClickUpdate = (cardRecord) => {
    handleClickOpen(cardRecord, "approve");
  }
  const onClickAccept = (cardRecord) => {
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
  const showedDetail = props.tableData.map((value, index) => {
    return [value.perks, value.price, value.amount, value.unit, value.package_type, value.description]
  });
  return (
    <>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color={props.tableHeaderColor}>
            <h4 className={classes.cardTitleWhite}>Gift Card Approval Log</h4>
            <p className={classes.cardCategoryWhite}>
              Change the remaining usage of a card
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor={props.tableHeaderColor}
              tableHead={props.tableHead}
              tableData={showedDetail}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          {/*<FormControl>
          <InputLabel htmlFor="uses-input">Remaining uses:</InputLabel>
            <Input id="uses-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Type here to update remaining uses.</FormHelperText>
            <IconButton aria-label="update"><EditIcon /></IconButton>
        </FormControl>*/}
        </GridItem>
      </GridContainer>
    </>
  );
}
GiftCardDetail.defaultProps = {
  tableHeaderColor: "danger",
  tableHead: ["Perks", "Price", "Amount", "Unit", "Package_type", "Description"],
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

export async function getServerSideProps(context) {
  const id = context.params.id;
  const tableData = await getPackageFeature(parseInt(id));
  return {
    props: {
      tableData: tableData || null,
    },
  };
}
async function getPackageFeature(package_id_id) {
  const prisma = new PrismaClient();
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

GiftCardDetail.layout = Admin;
export default GiftCardDetail;



