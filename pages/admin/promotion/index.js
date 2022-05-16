import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from "next/router";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@mui/material/Button";

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

function Index() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const Data = [
    ["001", "Mid Month", "Oud-Turnhout", "Jeffrey", "14 May", "16 May", "20 May", "img", <Button variant="outlined"> Edit </Button>, <Button variant="outlined"> Delete </Button>],
    ["002", "6.6", "Oud-Turnhout", "Jeffrey", "10 May", "6 June", "7 June", "img", <Button variant="outlined"> Edit </Button>, <Button variant="outlined"> Delete </Button>],
    ["003", "7.7", "Oud-Turnhout", "Jeffrey", "14 May", "16 May", "1 May", "img", <Button variant="outlined"> Edit </Button>, <Button variant="outlined"> Delete </Button>],
    ["004", "Christmas", "Oud-Turnhout", "Jeffrey", "14 May", "16 May", "20 May", "img", <Button variant="outlined"> Edit </Button>, <Button variant="outlined"> Delete </Button>],
  ]

  

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Promotions</h4>

          </CardHeader>
          <CardBody>
            <Button variant="outlined" href="/admin/promotion/new"> Add </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Headline", "Description", "Created by", "Created at", "Start at", "End at", "img", "Edit", "Delete"]}
              tableData={Data}
            />

          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Index.layout = Admin;

export default Index;
