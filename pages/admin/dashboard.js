import * as React from "react";
import axios from "axios";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import makeStyles from "@mui/styles/makeStyles";
import Icon from "@mui/material/Icon";
// @mui/icons-material
import Store from "@mui/icons-material/Store";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PaidIcon from "@mui/icons-material/Paid";
import CallIcon from "@mui/icons-material/Call";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";



import { bugs, website, server } from "variables/general.js";

import { emailsSubscriptionChart, completedTasksChart } from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import prisma from "PrismaConnect";
import { getSession } from "next-auth/react";

function Dashboard(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();


  return (
    <div>
      <h1 className="text-2xl font-bold">Listing Waiting for Review</h1>

      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card
            onClick={() => {
              location.href = "/admin/approval";
            }}
          >
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <RateReviewIcon>content_copy</RateReviewIcon>
              </CardIcon>
              <p className={classes.cardCategory}>Cars to be Reviewed</p>
              <h3 className={classes.cardTitle}>{props.carApproval}</h3>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card
            onClick={() => {
              location.href = "/admin/listings";
            }}
          >
            <CardHeader color="dark" stats icon>
              <CardIcon color="danger">
                <DirectionsCarIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Cars</p>
              <h3 className={classes.cardTitle}>{props.totalCar}</h3>
            </CardHeader>
            <CardFooter stats>

            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card
            onClick={() => {
              location.href = "/admin/merchants";
            }}
          >
            <CardHeader color="danger" stats icon>
              <CardIcon color="dark">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Total Merchants</p>
              <h3 className={classes.cardTitle}>{props.totalMerchant}</h3>
            </CardHeader>
            <CardFooter stats>

            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PaidIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Sales</p>
              <h3 className={classes.cardTitle}>৳ {props.totalPayment}</h3>
            </CardHeader>
            <CardFooter stats>

            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card onClick={() => { location.href = '/admin/messages' }}>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <CallIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Contact Admin</p>
              <h3 className={classes.cardTitle}>{props.totalMessage}</h3>
            </CardHeader>
            <CardFooter stats>

            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Graps */}
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              {/* <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="dark">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("Dashboard.session", session);

  if (!session.token.isStaff) {
    // If the user is not a statff, prevent from proceeding
    return {
      redirect: {
        permanent: false,
        destination: "/?error=UserNotAllowed",
      },
      props: {},
    };
  }

  let carApproval = await prisma.CarsApp_carapprovallog.count({
    where: {
      is_approved: false,
    },
  });
  let carCount = await prisma.CarsApp_car.count();
  let merchantCount = await prisma.UsersApp_customuser.count();
  let paymentCount = await prisma.MerchantStorefront_paymenthistory.aggregate({
    _sum: {
      amount: true,
    },
  });
  let messageCount = await prisma.MerchantStorefront_messagetoadmin.count();


  return {
    props: {
      carApproval: carApproval,
      totalCar: carCount,
      totalMerchant: merchantCount,
      totalPayment: paymentCount._sum.amount,
      totalMessage: messageCount
    },
  };
}

Dashboard.layout = Admin;
//Dashboard.auth = true
export default Dashboard;
