import React, {useState, useMemo} from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import {useQuery} from "react-query";
import div from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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


function Upload() {
    const [carType, setCarType] = useState();
    const [carTypes, setCarTypes] = useState([]);
    const [carMaker, setCarMaker] = useState();
    const [carMakers, setCarMakers] = useState([]);
    const [carModel, setCarModel] = useState();
    const [carModels, setCarModels] = useState([]);
    const [modelOptions] = React.useState([
        {
            title: "Condition*",
            selectText: "Select Condition",
        },
        {
            title: "Maker*",
            selectText: "Select Maker",
        },
        {
            title: "Model*",
            selectText: "Select Model",
        },
        {
            title: "Car Grade/Package",
            selectText: "Car Grade",
        },
        {
            title: "Model Year",
            selectText: "Select Year",
        },
        {
            title: "Engine Number",
            selectText: "Engine Number",
        },
        {
            title: "Chassis Number*",
            selectText: "Chassis Number",
        },
        {
            title: "Registration Year",
            selectText: "Select Registration Year",
        },
        {
            title: "Registration Number",
            selectText: "Registration Number",
        },
    ]);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const onCarTypeChange = (e) => {
        setCarType(e.target.value);
    };
    const onCarMakerChange = (e, name) => {
        setCarMaker(e.target.value);
        (async () => {
            try {
                const response = await fetch(`${process.env.BG_API}cars/model-list/?maker_name=${name}`)
                const json = await response.json();
                if (response.status === 200) {
                    setCarModels(json.result);

                } else {

                }
            } catch (err) {

            }
        })();
    };
    const onCarModelChange = (e) => {
        setCarModel(e.target.value);
    };

    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.BG_API}cars/car-type/`);
                const json = await response.json();
                let response1 = await fetch(`${process.env.BG_API}cars/car-manufacturer/`);
                const json1 = await response1.json();
                setCarTypes(json);
                setCarMakers(json1);
                // console.log(json1);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <div>
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
                                    <div>
                                        <GridContainer spacing={2}>
                                            <GridItem item xs={12} sm={12} md={4} className={classes.uploadOptions}>
                                                <FormControl className="w-full">
                                                    <InputLabel id="demo-simple-select-label">Car Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={carType}
                                                        label="Car Types"
                                                        onChange={onCarTypeChange}
                                                    >
                                                        {carTypes.map((l, index) => {
                                                            return <MenuItem key={index}
                                                                             value={l.type_id}>{l.type_name}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>

                                            </GridItem>
                                            <GridItem item xs={12} sm={12} md={4} className={classes.uploadOptions}>
                                                <FormControl className="w-full">
                                                    <InputLabel id="demo-simple-select-label">Maker</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={carMaker}
                                                        label="Car Makers"
                                                        // onChange={onCarMakerChange}
                                                    >
                                                        {carMakers.map((l, index) => {
                                                            return <MenuItem key={index} value={l.maker_id}
                                                                             onClick={(event) => onCarMakerChange(event, l.maker_name)}
                                                            >{l.maker_name}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>

                                            </GridItem>

                                            <GridItem item xs={12} sm={12} md={4} className={classes.uploadOptions}>
                                                <FormControl className="w-full">
                                                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={carModel}
                                                        label="Car Models"
                                                        onChange={onCarModelChange}
                                                    >
                                                        {carModels.map((l, index) => {
                                                            return <MenuItem key={index}
                                                                             value={l.model_id}>{l.model_name}</MenuItem>;
                                                        })}
                                                    </Select>
                                                </FormControl>

                                            </GridItem>
                                        </GridContainer>

                                    </div>
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
        </div>
    );
}

Upload.layout = MSF;

export default Upload;