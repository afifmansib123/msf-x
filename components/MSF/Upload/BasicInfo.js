import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// react plugin for creating charts
import makeStyles from "@mui/styles/makeStyles";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import React, { useState } from "react";

export default function BasicInfo() {
  const [carType, setCarType] = useState();
  const [carTypes, setCarTypes] = useState([]);
  const [carMaker, setCarMaker] = useState();
  const [carMakers, setCarMakers] = useState([]);
  const [carModel, setCarModel] = useState();
  const [carModels, setCarModels] = useState([]);
  const [carGrade, setCarGrade] = useState();
  const [carModelYear, setCarModelYear] = useState();
  const [carModelYears, setCarModelYears] = useState([]);
  const [carRegYear, setCarRegYear] = useState();
  const [carRegYears, setCarRegYears] = useState([]);
  const [isRegYear, setIsRegYear] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [carChassisNumber, setCarChassisNumber] = useState();
  const [carEngineNumber, setCarEngineNumber] = useState();
  const [carRegNumber, setCarRegNumber] = useState();
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

  const getYears = () => {
    const arr = [];
    for (let i = new Date().getFullYear(); i >= 1971; i--) {
      arr.push({ id: i, year: i });
    }
    return arr;
  };

  const onCarTypeChange = (e) => {
    if (carType !== "") {
      setCarMaker("");
      setCarModel("");
      setCarModelYear("");
    }
    if (e.target.name === "car_type" && e.target.value === 2) {
      setCarRegYears(getYears());
      setIsRegYear(true);
      setIsUsed(true);
    } else if (
      e.target.name === "car_type" &&
      (e.target.value === 1 || e.target.value === 3)
    ) {
      setIsRegYear(false);
      setIsUsed(false);
    }
    setCarType(e.target.value);
  };
  const onCarMakerChange = (e, name) => {
    setCarMaker(e.target.value);
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}api/cars/model-list/?maker_name=${name}`
        );
        const json = await response.json();
        if (response.status === 200) {
          setCarModels(json.result);
          setCarModelYears(getYears());
        } else {
        }
      } catch (err) {}
    })();
  };
  const onCarModelChange = (e) => {
    setCarModel(e.target.value);
  };
  const onCarGradeChange = (e) => {
    setCarGrade(e.target.value);
  };
  const onCarModelYearChange = (e) => {
    setCarModelYear(e.target.value);
  };
  const onCarRegYearChange = (e) => {
    setCarRegYear(e.target.value);
  };
  const onCarChassisNumberChange = (e) => {
    setCarChassisNumber(e.target.value);
  };
  const onCarEngineNumberChange = (e) => {
    setCarEngineNumber(e.target.value);
  };
  const onCarRegNumberChange = (e) => {
    setCarRegNumber(e.target.value);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/car-type/`
        );
        const json = await response.json();
        let response1 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/car-manufacturer/`
        );
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
    <GridContainer>
      <h2 className={classes.paperTitle}>Choose your car model</h2>
      <GridItem item xs={12}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label">Car Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carType}
            label="Car Types"
            name="car_type"
            onChange={onCarTypeChange}
          >
            {carTypes.map((l, index) => {
              return (
                <MenuItem key={index} value={l.type_id}>
                  {l.type_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem item xs={12}>
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
              return (
                <MenuItem
                  key={index}
                  value={l.maker_id}
                  onClick={(event) => onCarMakerChange(event, l.maker_name)}
                >
                  {l.maker_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem item xs={12}>
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
              return (
                <MenuItem key={index} value={l.model_id}>
                  {l.model_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem item xs={12}>
        <TextField
          value={carGrade}
          name={"Car Grade"}
          autoComplete="off"
          fullWidth
          onChange={onCarGradeChange}
          placeholder={"Enter Grade/Package"}
          variant="outlined"
        />
      </GridItem>
      <GridItem item xs={12}>
        <FormControl className="w-full">
          <InputLabel id="demo-simple-select-label">Model Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carModelYear}
            label="Car Model Years"
            onChange={onCarModelYearChange}
          >
            {carModelYears.map((l, index) => {
              return (
                <MenuItem key={index} value={l.id}>
                  {l.year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </GridItem>
      {isRegYear && (
        <GridItem item xs={12}>
          <FormControl className="w-full">
            <InputLabel id="demo-simple-select-label">
              Registration Year
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={carRegYear}
              label="Car Reg Years"
              onChange={onCarRegYearChange}
            >
              {carRegYears.map((l, index) => {
                return (
                  <MenuItem key={index} value={l.id}>
                    {l.year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </GridItem>
      )}
      {!isUsed && (
        <GridItem item xs={12}>
          <TextField
            value={carChassisNumber}
            name={"Car Chassis Number"}
            autoComplete="off"
            fullWidth
            onChange={onCarChassisNumberChange}
            placeholder={"Enter Chassis Number"}
            variant="outlined"
          />
        </GridItem>
      )}
      {!isUsed && (
        <GridItem item xs={12}>
          <TextField
            value={carEngineNumber}
            name={"Car Engine Number"}
            autoComplete="off"
            fullWidth
            onChange={onCarEngineNumberChange}
            placeholder={"Enter Engine Number"}
            variant="outlined"
          />
        </GridItem>
      )}
      {isUsed && (
        <GridItem item xs={12}>
          <TextField
            value={carRegNumber}
            name={"Car Registration Number"}
            autoComplete="off"
            fullWidth
            onChange={onCarRegNumberChange}
            placeholder={"Enter Registration Number"}
            variant="outlined"
          />
        </GridItem>
      )}
    </GridContainer>
  );
}
