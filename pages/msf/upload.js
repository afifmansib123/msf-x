import React, {useState, useMemo} from "react";
import PropTypes from "prop-types";
import {useQuery} from "react-query";
import Box from "@mui/material/Box";


// react plugin for creating charts
import makeStyles from '@mui/styles/makeStyles';

// @mui/icons-material
import Car from "@mui/icons-material/DirectionsCar";
import Bike from "@mui/icons-material/TwoWheeler";

// layout for this page
import MSF from "layouts/MSF.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

//components
import BasicInfo from "components/MSF/Upload/BasicInfo.js";
import Details from "components/MSF/Upload/Details.js";


function Upload() {

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs
                        title="Upload Car / Bike:"
                        headerColor="dark"
                        tabs={[
                            {
                                tabName: "Car",
                                tabIcon: Car,
                                tabContent: (
                                  <GridContainer spacing={2}>
                                    <GridItem item xs={12} sm={12} md={6} className={classes.uploadOptions}>
                                    </GridItem>
                                    <GridItem item xs={12} sm={12} md={6} className={classes.uploadOptions}>
                                      <BasicInfo />
                                    </GridItem>

                                    <GridItem item xs={12} sm={12} md={12} className={classes.uploadOptions}>
                                      <Details />
                                    </GridItem>
                                  </GridContainer>

                                ),
                            },
                            {
                                tabName: "Bike",
                                tabIcon: Bike,
                                tabContent: (
                                    <div></div>
                                ),
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
    );
}

Upload.layout = MSF;

export default Upload;