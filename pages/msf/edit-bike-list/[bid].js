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
import BikeUpdate from "components/MSF/Update/BikeUpdate.js";



function cid() {

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <CustomTabs
                    title="Upload Car / Bike:"
                    headerColor="bhalogari"
                    tabs={[
                        {
                            tabName: "Bike",
                            tabIcon: Bike,
                            tabContent: (
                                <>
                                    <BikeUpdate/>
                                </>
                            ),
                        },
                    ]}
                />
            </GridItem>
        </GridContainer>
    );
}

cid.layout = MSF;

export default cid;