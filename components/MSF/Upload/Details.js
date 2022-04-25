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

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

// @mui/icons-material
import Car from "@mui/icons-material/DirectionsCar";
import Wheel from "assets/img/car-upload/wheel.svg";

export default function Details() {
  const [carBodyType, setCarBodyType] = useState();
  const [carBodyTypes, setCarBodyTypes] = useState([]);
  const [carInteriorColor, setCarInteriorColor] = useState();
  const [carInteriorColors, setCarInteriorColors] = useState([]);
  const [carFuelEconomy, setCarFuelEconomy] = useState();
  const [carFuelEconomys, setCarFuelEconomys] = useState([]);
  const [carFuelType, setCarFuelType] = useState();
  const [carFuelTypes, setCarFuelTypes] = useState([]);
  const [carExteriorColor, setCarExteriorColor] = useState();
  const [carExteriorColors, setCarExteriorColors] = useState([]);
  const [carTransmission, setCarTransmission] = useState();
  const [carEngineCC, setCarEngineCC] = useState();
  const [carMileage, setCarMileage] = useState();
  const [carSeat, setCarSeat] = useState();
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
  const [carDrive, setCarDrive] = useState();
  const [carDrives] = useState([
    { id: 1, option: "Front Wheel Drive (FWD)" },
    { id: 2, option: "Rear Wheel Drive (RWD)" },
    { id: 3, option: "All Wheel Drive (AWD)" },
    { id: 4, option: "4-Wheel Drive (4WD)" },
  ]);
  const [carTransmissions, setCarTransmissions] = useState([
    { id: "A", title: "Automatic" },
    { id: "M", title: "Manual" },
  ]);

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const getYears = () => {
    const arr = [];
    for (let i = new Date().getFullYear(); i >= 1971; i--) {
      arr.push({id: i, year: i});
    }
    return arr;
  };

  const onCarBodyTypeChange = (e) => {
    setCarBodyType(e.target.value);
  };
  const onCarMakerChange = (e, name) => {
    setCarMaker(e.target.value);
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/model-list/?maker_name=${name}`)
        const json = await response.json();
        if (response.status === 200) {
          setCarModels(json.result);
          setCarModelYears(getYears());
        } else {

        }
      } catch (err) {

      }
    })();
  };
  const onCarFuelTypeChange = (e) => {
    setCarFuelType(e.target.value);
  };
  const onCarInteriorColorChange = (e) => {
    setCarInteriorColor(e.target.value);
  };
  const onCarExteriorColorChange = (e) => {
    setCarExteriorColor(e.target.value);
  };
  const onCarDriveChange = (e) => {
    setCarDrive(e.target.value);
  };
  const onCarMileageChange = (e) => {
    setCarMileage(e.target.value);
  };
  const onCarEngineCCChange = (e) => {
    setCarEngineCC(e.target.value);
  };
  const onCarSeatChange = (e) => {
    setCarSeat(e.target.value);
  };
  const onCarTransmissionChange = (e) => {
    setCarTransmission(e.target.value);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/body-type/`);
        const json = await response.json();
        const response1 = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/interior-color/`);
        const json1 = await response1.json();
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/fuel-economy/`);
        const json2 = await response2.json();
        const response3 = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/fuel-type/`);
        const json3 = await response3.json();
        const response4 = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/exterior-color/`);
        const json4 = await response4.json();

        setCarBodyTypes(json);
        setCarInteriorColors(json1);
        setCarFuelEconomys(json2);
        setCarFuelTypes(json3);
        setCarExteriorColors(json4);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <GridContainer>
      <h2 className={classes.paperTitle}>Choose Details</h2>
      <GridItem item xs={12} sm={12} md={4}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label"> <Car/> Car Body</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carBodyType}
            label="Car Body Types"
            name="car_body_type"
            onChange={onCarBodyTypeChange}
          >
            {carBodyTypes.map((l, index) => {
              return <MenuItem key={index}
                               value={l.id}>{l.body_name}</MenuItem>;
            })}
          </Select>
        </FormControl>

      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <TextField
          value={carEngineCC}
          name={"Car Engine CC"}
          autoComplete="off"
          fullWidth
          onChange={onCarEngineCCChange}
          placeholder={"Enter Engine CC"}
          variant="outlined"
        />
      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label"> Drive</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carDrive}
            label="Car Drive"
            name="car_drive"
            onChange={onCarDriveChange}
          >
            {carDrives.map((l, index) => {
              return <MenuItem key={index}
                               value={l.option}>{l.option}</MenuItem>;
            })}
          </Select>
        </FormControl>

      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <TextField
          value={carMileage}
          name={"Car Mileage"}
          autoComplete="off"
          fullWidth
          onChange={onCarMileageChange}
          placeholder={"Enter Mileage"}
          variant="outlined"
        />
      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <TextField
          value={carSeat}
          name={"Car Engine CC"}
          autoComplete="off"
          fullWidth
          onChange={onCarSeatChange}
          placeholder={"Enter No of Seats"}
          variant="outlined"
        />
      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label"> Transmission</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carTransmission}
            label="Car Transmission"
            name="car_transmission"
            onChange={onCarTransmissionChange}
          >
            {carTransmissions.map((l, index) => {
              return <MenuItem key={index}
                               value={l.id}>{l.title}</MenuItem>;
            })}
          </Select>
        </FormControl>

      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carFuelType}
            label="Car Fuel Type"
            onChange={onCarFuelTypeChange}
          >
            {carFuelTypes.map((l, index) => {
              return <MenuItem key={index} value={l.fuel_id}>{l.fuel_type}</MenuItem>;
            })}
          </Select>
        </FormControl>

      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label">Interior Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carInteriorColor}
            label="Car Interior Color"
            onChange={onCarInteriorColorChange}
          >
            {carInteriorColors.map((l, index) => {
              return <MenuItem key={index}
                               value={l.id}>{l.int_color}</MenuItem>;
            })}
          </Select>
        </FormControl>

      </GridItem>
      <GridItem item xs={12} sm={12} md={4}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label">Exterior Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carExteriorColor}
            label="Car Exterior Color"
            onChange={onCarExteriorColorChange}
          >
            {carExteriorColors.map((l, index) => {
              return <MenuItem key={index}
                               value={l.id}>{l.car_color}</MenuItem>;
            })}
          </Select>
        </FormControl>

      </GridItem>



    </GridContainer>
  );
}
