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

// plugins
import Joi, {errors} from "joi-browser";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@mui/material/Button";

export default function Price() {
    const [carAskingPrice, setAskingPrice] = useState({
        price: undefined,
        sale_price: undefined,
        custom_price: "Call for price",
    });
    const [inputErrors, setError] = useState({});

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const schema = {
        asking_price: Joi.number().positive().integer().min(100000).max(500000000).required(),
        selling_price: Joi.number().positive().integer().min(100000).max(500000000).required(),
    };

    const propertyValidate = (name, value) => {
        const obj = {[name]: value};
        const singleSchema = {[name]: schema[name]};
        const {error} = Joi.validate(obj, singleSchema);

        return error ? error.details[0].message : null;
    };

    const propertyValidationHelper = (name, value) => {
        const errors = {...inputErrors};
        const errorMessage = propertyValidate(name, value);
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        setError(errors);
    };

    const onCarPriceChange = ({target: input}) => {
        const {name, value} = input;
        if (name === "selling_price") {
            propertyValidationHelper("selling_price", value);
        } else if (name === "asking_price") {
            propertyValidationHelper("asking_price", value);
        }
        setAskingPrice({...carAskingPrice, [name]: value});
    };

    const [carDescription, setCarDescription] = useState("");

    const onCarDescriptionChange = (event, editor) => {
        const data = editor.getData();
        let element = document.createElement("div");
        element.innerHTML = data;
        setCarDescription(element.textContent || element.innerText);
    };

    const [carVideoLink, setCarVideoLink] = useState({
        video1: "",
        video2: "",
    });

    const videoName = ["video1", "video2"];

    const onCarVideoLinkChange = ({target: input}) => {
        setCarVideoLink({...carVideoLink, [input.name]: input.value});
    };

    return (
        <GridContainer>
            <h2 className={classes.paperTitle}>Set your asking price</h2>
            <p className={classes.carPriceText}>
                Please kindly set the asking price and final price for your car. You can also opt for our buyers to call
                for
                price of your car.
            </p>
            <GridItem item xs={12} sm={12} md={4}>
                <TextField
                    value={carAskingPrice.price}
                    name={"asking_price"}
                    autoComplete="off"
                    fullWidth
                    onChange={onCarPriceChange}
                    placeholder={"Asking Price"}
                    variant="outlined"
                />
                {inputErrors.asking_price && (
                    <div
                        style={{
                            position: "absolute",
                            color: "#ff2d2d",
                            paddingTop: "2px",
                            fontSize: "12px",
                        }}
                    >
                        {inputErrors.asking_price}
                    </div>
                )}
            </GridItem>

            <GridItem item xs={12} sm={12} md={4}>
                <TextField
                    value={carAskingPrice.price}
                    name={"selling_price"}
                    autoComplete="off"
                    fullWidth
                    onChange={onCarPriceChange}
                    placeholder={"Selling Price"}
                    variant="outlined"
                />
                {inputErrors.selling_price && (
                    <div
                        style={{
                            position: "absolute",
                            color: "#ff2d2d",
                            paddingTop: "2px",
                            fontSize: "12px",
                        }}
                    >
                        {inputErrors.selling_price}
                    </div>
                )}
            </GridItem>

            <GridItem item xs={12} sm={12} md={4}>
                <TextField
                    value={carVideoLink.video1}
                    name={videoName[0]}
                    autoComplete="off"
                    fullWidth
                    onChange={onCarVideoLinkChange}
                    placeholder={"Video Link"}
                    variant="outlined"
                />
            </GridItem>

            <GridItem item xs={12} sm={12} md={8}>
                <CKEditor
                    name="description"
                    editor={ClassicEditor}
                    onChange={onCarDescriptionChange}
                    config={{placeholder: "Add Description"}}
                />
            </GridItem>

            <GridItem item xs={12} sm={12} md={4}>
                <Button
                    variant="contained"
                    color="inherit"
                    // disabled={loading}
                    className={classes.button}
                    // startIcon={<AirportShuttleIcon />}
                    // onClick={handleSubmit}
                >
                    submit listing
                </Button>
            </GridItem>

        </GridContainer>
    );
}
