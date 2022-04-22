import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import makeStyles from '@mui/styles/makeStyles';
import Icon from "@mui/material/Icon";
// @mui/icons-material
import Store from "@mui/icons-material/Store";
import Warning from "@mui/icons-material/Warning";
import DateRange from "@mui/icons-material/DateRange";
import LocalOffer from "@mui/icons-material/LocalOffer";
import Update from "@mui/icons-material/Update";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import AccessTime from "@mui/icons-material/AccessTime";
import Accessibility from "@mui/icons-material/Accessibility";
import BugReport from "@mui/icons-material/BugReport";
import Code from "@mui/icons-material/Code";
import Cloud from "@mui/icons-material/Cloud";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Image from 'next/image'

import { bugs, website, server } from "variables/general.js";

import PropTypes from 'prop-types';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function CarApproveLog() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Car Approve Log</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={["ID", "Merchant", "Car Maker", "Car Model", "Preview Image"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger", <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" width={250} height={250}/>],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao", <Image
                  alt="The guitarist in the concert."
                  src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                  width={120}
                  height={120}
                  layout="responsive"
                  />],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands", <Image
                  alt="The guitarist in the concert."
                  src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                  width={250}
                  height={250}
                  layout="responsive"
                  />],
                  ["4", "Philip Chaney", "$38,735", "Korea, South", <Image
                  alt="The guitarist in the concert."
                  src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
                  width={250}
                  height={250}
                  layout="responsive"
                  />],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
  );
}

export default CarApproveLog;
