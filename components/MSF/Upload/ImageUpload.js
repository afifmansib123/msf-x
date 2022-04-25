import React, {useState, useMemo} from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import {useQuery} from "react-query";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// react plugin for creating charts
import makeStyles from "@mui/styles/makeStyles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Box from "@mui/material/Box";


export default function ImageUpload() {
    const [carFeatures, setCarFeatures] = useState([]);
    const [checkBoxInput, setCheckBoxInput] = useState([]);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const onCarFeaturesInputChange = (e) => {
        const {name} = e.target;
        const index = checkBoxInput.indexOf(parseInt(name));
        if (index !== -1) {
            const newBox = [...checkBoxInput];
            newBox.splice(index, 1);
            setCheckBoxInput(newBox);
        } else {
            setCheckBoxInput([...checkBoxInput, parseInt(name)]);
        }
    };

    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/features-list/`);
                const json = await response.json();
                setCarFeatures(json);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <GridContainer>
            <h2 className={classes.paperTitle}>UPLOAD Car Photo*</h2>
            <GridItem item xs={12} sm={12} md={4}>

            </GridItem>

        </GridContainer>
    );
}
