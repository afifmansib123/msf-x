import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
// @mui/icons-material
import AddAlert from "@mui/icons-material/AddAlert";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
// core components
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// react plugin for creating charts
import makeStyles from "@mui/styles/makeStyles";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import axios from "axios";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Snackbar from "components/Snackbar/Snackbar.js";
// plugins
import Joi from "joi-browser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import JsonData from "../../../pages/api/cars/carUpload_api.json";

export default function CarUpload() {
  const [carType, setCarType] = useState();
  const [carTypes, setCarTypes] = useState([]);
  const [carMaker, setCarMaker] = useState();
  const [carMakers, setCarMakers] = useState([]);
  const [carMakerName, setCarMakerName] = useState();
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
  const [modelOptions] = useState([
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
  const [carDrive, setCarDrive] = useState();
  const [makerName, setMakerName] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [filteredResults, setFilteredResults] = useState("");

  const searchItems = (e) => {
    setCarChassisNumber(e.target.value);
    const filteredData = jsonData?.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    // setCarBodyType(parseInt(filteredData[0]?.body_name));
    console.log(filteredData);
    setFilteredResults(filteredData);
    let maker = carMakers.filter((x) => x.maker_name.toLowerCase() === filteredData[0]?.maker.toLowerCase());
    let bodyType = carBodyTypes.filter((x) => x.body_name.toLowerCase() === filteredData[0]?.body[0].toLowerCase());
    console.log(bodyType);
    setCarMaker(maker[0].maker_id);
    setCarMakerName(maker[0].maker_name);
    setCarGrade(filteredData[0]?.grade[0]);
    setCarModelYear(bodyType[0]?.id);
  };

  useEffect(() => {
    if (carMaker !== "") {
      setCarModels([]);
      setLoading(true);
      (async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BG_API}cars/model-list/?maker_name=${carMakerName}`);
          const json = await response.json();
          if (response.status === 200) {
            setCarModels(json.result);
            let filteredYear = json.result.filter((item) => item.release_year !== "-");
            let model = json.result.filter((x) => x.model_name.toLowerCase() === filteredResults[0]?.model.toLowerCase());
            setCarModel(model[0].model_id);
            setCarModelYears(getYears());
            setLoading(false);
          } else {
            setLoading(false);
            setSnackMsg("Search Alert: Model not available for this brand!");
            setOpen(true);
          }
        } catch (err) {
          setLoading(false);
          setSnackMsg("Something went wrong!");
        }
      })();

    }
  }, [carMaker]);

  useEffect(() => {
    setJsonData(JsonData);
  }, []);
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
  const [carFeaturesInput, setCarFeaturesInput] = useState([]);
  const [carFeatures, setCarFeatures] = useState([]);
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [images, setImages] = useState([]);
  const [fileLimitExceeded, setFileLimitExceeded] = useState(false);
  const [carPrice, setCarPrice] = useState({
    asking_price: undefined,
    selling_price: undefined,
    custom_price: "Call for Price",
  });
  const [redirect, setRedirect] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (images.length >= 15) {
      setFileLimitExceeded(true);
    } else {
      setFileLimitExceeded(false);
    }
  }, [images]);

  // const onImageUpload = async (file) => {
  //   if (file) {
  //     const listSize = file.length;
  //     const prevListSize = images.length;
  //     const newImageLength = listSize - prevListSize;
  //     for (let i = listSize - 1; i >= prevListSize; i--) {
  //       const image1 = file[i];
  //       const imageName = image1.name;
  //       console.log(image1);
  //       setImages((prev) => [...prev, image1]);
  //     }
  //   }
  //
  // };
  // const onImageDelete = (file) => {
  //   const deleteFileName = file.name;
  //   const indexOfItemToRemove = images.findIndex((item) => item.name === deleteFileName);
  //   if (indexOfItemToRemove === -1) {
  //     return;
  //   }
  //   setImages((list) => [...list.slice(0, indexOfItemToRemove), ...list.slice(indexOfItemToRemove + 1)]);
  //
  // };

  if (redirect) {
    router.push("/msf/listing");
  }

  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles);
    if (incomingFiles) {
      const listSize = incomingFiles.length;
      const prevListSize = images.length;
      const newImageLength = listSize - prevListSize;
      if (listSize === 0) {
        setImages([]);
      }
      for (let i = listSize - 1; i >= prevListSize; i--) {
        const image1 = incomingFiles[i];
        const imageName = image1.name;
        setImages((prev) => [...prev, image1.file]);
      }
    }
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
    let image = files.find((o) => o.id === id);
    const deleteFileName = image.file.name;
    const indexOfItemToRemove = images.findIndex(
      (item) => item.name === deleteFileName
    );
    if (indexOfItemToRemove === -1) {
      return;
    }
    setImages((list) => [
      ...list.slice(0, indexOfItemToRemove),
      ...list.slice(indexOfItemToRemove + 1),
    ]);
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files) => {
    // console.log("list cleaned", files);
    setImages([]);
  };

  const [inputErrors, setError] = useState({});

  const schema = isUsed
    ? {
        car_chassis_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .label("Chassis"),
        car_engine_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .allow("")
          .label("Engine No"),
        car_registration_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .allow("")
          .label("Registration No"),
        car_type: Joi.number().required().label("Type"),
        car_maker: Joi.number().required().label("Maker"),
        car_model: Joi.number().required().label("Model"),
        asking_price: Joi.number()
          .positive()
          .integer()
          .min(100000)
          .max(500000000)
          .required()
          .label("Asking Price"),
        car_mileage: Joi.number()
          .min(-1)
          .max(999999)
          .allow("")
          .label("Mileage"),
        car_seat: Joi.number()
          .positive()
          .integer()
          .min(1)
          .max(45)
          .allow("")
          .label("Seat"),
        car_engine_cc: Joi.number()
          .precision(2)
          .min(660)
          .max(9999)
          .allow("")
          .label("Engine Capacity"),
        car_body_type: Joi.number().required().label("Body Type"),
        car_fuel_type: Joi.number().required().label("Fuel Type"),
        car_reg_year: isRegYear
          ? Joi.required().label("Registration Year")
          : Joi.allow().label("Registration Year"),
        selling_price: Joi.number()
          .positive()
          .integer()
          .min(100000)
          .max(500000000)
          .required()
          .label("Selling Price"),
      }
    : {
        car_chassis_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .required()
          .label("Chassis"),
        car_engine_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .allow("")
          .label("Engine No"),
        car_registration_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .allow("")
          .label("Registration No"),
        car_type: Joi.number().required().label("Type"),
        car_maker: Joi.number().required().label("Maker"),
        car_model: Joi.number().required().label("Model"),
        asking_price: Joi.number()
          .positive()
          .integer()
          .min(100000)
          .max(500000000)
          .required()
          .label("Asking Price"),
        car_mileage: Joi.number()
          .min(-1)
          .max(999999)
          .allow("")
          .label("Mileage"),
        car_seat: Joi.number()
          .positive()
          .integer()
          .min(1)
          .max(45)
          .allow("")
          .label("Seat"),
        car_engine_cc: Joi.number()
          .precision(2)
          .min(660)
          .max(9999)
          .allow("")
          .label("Engine Capacity"),
        car_body_type: Joi.number().required().label("Body Type"),
        car_fuel_type: Joi.number().required().label("Fuel Type"),
        car_reg_year: isRegYear
          ? Joi.required().label("Registration Year")
          : Joi.allow().label("Registration Year"),
        selling_price: Joi.number()
          .positive()
          .integer()
          .min(100000)
          .max(500000000)
          .required()
          .label("Selling Price"),
      };

  useEffect(() => {
    if (
      parseInt(carPrice.asking_price) > 0 &&
      parseInt(carPrice.selling_price) > parseInt(carPrice.asking_price)
    ) {
      setError({
        ...inputErrors,
        selling_price: "Selling Price must be less than asking price!",
      });
    } else if (
      parseInt(carPrice.asking_price) < parseInt(carPrice.selling_price)
    ) {
      if (Object.keys(inputErrors).includes("selling_price")) {
        delete inputErrors["selling_price"];
      }
    } else if (
      parseInt(carPrice.asking_price) > parseInt(carPrice.selling_price)
    ) {
      if (Object.keys(inputErrors).includes("selling_price")) {
        delete inputErrors["selling_price"];
      }
    }
  }, [carPrice.selling_price, carPrice.asking_price]);

  const propertyValidate = (name, value) => {
    const obj = { [name]: value };
    const singleSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, singleSchema);

    return error ? error.details[0].message : null;
  };

  const propertyValidationHelper = (name, value) => {
    const errors = { ...inputErrors };
    const errorMessage = propertyValidate(name, value);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    setError(errors);
  };

  const onCarPriceChange = ({ target: input }) => {
    const { name, value } = input;
    if (name === "selling_price") {
      propertyValidationHelper("selling_price", value);
    } else if (name === "asking_price") {
      propertyValidationHelper("asking_price", value);
    }
    setCarPrice({ ...carPrice, [name]: value });
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
    propertyValidationHelper("car_type", e.target.value);
    setCarType(e.target.value);
  };
  const onCarMakerChange = (e, id, name) => {
    setCarMaker(id);
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/model-list/?maker_name=${name}`
        );
        const json = await response.json();
        if (response.status === 200) {
          setCarModels(json.result);
          setCarModelYears(getYears());
        } else {
        }
      } catch (err) {}
    })();
    propertyValidationHelper("car_maker", e.target.value);
  };
  const onCarModelChange = (e) => {
    setCarModel(e.target.value);
    propertyValidationHelper("car_model", e.target.value);
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
    propertyValidationHelper("car_chassis_number", e.target.value);
  };
  const onCarEngineNumberChange = (e) => {
    setCarEngineNumber(e.target.value);
  };
  const onCarRegNumberChange = (e) => {
    setCarRegNumber(e.target.value);
  };
  const onCarBodyTypeChange = (e) => {
    setCarBodyType(e.target.value);
    propertyValidationHelper("car_body_type", e.target.value);
  };
  const onCarFuelTypeChange = (e) => {
    setCarFuelType(e.target.value);
    propertyValidationHelper("car_fuel_type", e.target.value);
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
  const onCarFeaturesInputChange = (e) => {
    const { name } = e.target;
    const index = carFeatures.indexOf(parseInt(name));
    if (index !== -1) {
      const newBox = [...carFeatures];
      newBox.splice(index, 1);
      setCarFeatures(newBox);
    } else {
      setCarFeatures([...carFeatures, parseInt(name)]);
    }
  };
  const onCarVideoLinkChange = ({ target: input }) => {
    setCarVideoLink({ ...carVideoLink, [input.name]: input.value });
  };

  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validate = () => {
    const inputs = isUsed
      ? {
          // carEngineNumber: carEngineNumber,
          // carChassisNumber: carChassisNumber,
          car_type: carType,
          car_maker: carMaker,
          car_model: carModel,
          asking_price: carPrice.asking_price,
          car_fuel_type: carFuelType,
          car_body_type: carBodyType,
          selling_price: carPrice.selling_price,
          car_reg_year: carRegYear,
          car_engine_cc: carEngineCC,
        }
      : {
          // carEngineNumber: carEngineNumber,
          car_chassis_number: carChassisNumber,
          car_type: carType,
          car_maker: carMaker,
          car_model: carModel,
          asking_price: carPrice.asking_price,
          car_fuel_type: carFuelType,
          car_body_type: carBodyType,
          selling_price: carPrice.selling_price,
          car_reg_year: carRegYear,
          car_engine_cc: carEngineCC,
        };
    const { error } = Joi.validate(inputs, schema, { abortEarly: false });
    if (!error) return null;

    const errors = {}; // TODO what is the point to set error to empty and iterate later?
    for (let item of error.details) {
      errors[item.path[0]] = `${item.context.label} is required!`;
    }

    return Object.keys(errors).length === 0 ? {} : errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setError(errors || {});
    if (errors) {
      console.log(errors);
      // console.log(isUsed);
      setSnackMsg(
        "Please fill out the mandatory fields before submitting your listing!"
      );
      setOpen(true);
      return;
    }

    const user_id = session.token.id;
    // const user_id = 41;

    let carObject = {
      mileage: carMileage !== "" ? carMileage : 0,
      fixed_price: carPrice.asking_price !== "" ? carPrice.asking_price : 0.0,
      price_to: carPrice.asking_price !== "" ? carPrice.asking_price : 0.0,
      affiliated_price: carPrice.selling_price,
      price_from: carPrice.selling_price,
      call_for_price: "no",
      transmission_type: carTransmission !== "" ? carTransmission : "N/A",
      car_manufacturer: carMaker,
      model_name: carModel,
      interior_color: carInteriorColor !== "" ? carInteriorColor : 21,
      exterior_color: carExteriorColor !== "" ? carExteriorColor : 54,
      car_body_type: carBodyType,
      engine_capacity: carEngineCC !== "" ? carEngineCC : 0.0,
      car_fuel: carFuelType,
      created_by: user_id,
      car_video_link: carVideoLink.video1 !== "" ? carVideoLink.video1 : "-",
      car_type: carType,
      drive: carDrive !== "" ? carDrive : "N/A",
      seating_capacity: carSeat !== undefined ? carSeat : 0,
      description: carDescription !== "" ? carDescription : "-",
      car_features: carFeatures,
      car_year: carModelYear,
      engine_no: carEngineNumber !== "" ? carEngineNumber : "-",
      chassis_no: carChassisNumber,
      registration_year: carRegYear,
      registration_no: carRegNumber,
      grade: carGrade,
    };

    if (images.length === 0) {
      setSnackMsg("Please! Provide Image.");
      setOpen(true);
    } else if (fileLimitExceeded) {
      setSnackMsg(
        "Maximum Image limit exceeded. Please keep 15 images at most"
      );
      setOpen(true);
    } else {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BG_API}cars/upload/`,
        carObject
      );

      if (response.status === 201) {
        const id = response.data.car_id;
        localStorage.setItem("car_id", id);
        let formData = new FormData();
        formData.append("car_id", id);
        formData.append("created_by", user_id);
        Object.keys(images).forEach((item) => {
          if (images[item] !== null) {
            formData.append("image", images[item]);
          }
        });

        const response1 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/image-upload/`,
          {
            method: "post",
            body: formData,
          }
        );

        if (response1.status === 201) {
          setSnackMsg("");
          setOpen(true);
          setSnackMsg("Successfully Uploaded");
          setLoading(false);
          setRedirect(true);
        } else {
          setLoading(false);
          setSnackMsg("Please fill all the required fields");
          setOpen(true);
        }
      } else {
        setLoading(false);
        setSnackMsg("Please fill all the required fields");
        setOpen(true);
      }
    }
  };

  useEffect(() => {
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
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/body-type/`
        );
        const json = await response.json();
        const response1 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/interior-color/`
        );
        const json1 = await response1.json();
        const response2 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/fuel-economy/`
        );
        const json2 = await response2.json();
        const response3 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/fuel-type/`
        );
        const json3 = await response3.json();
        const response4 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/exterior-color/`
        );
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

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/features-list/`
        );
        const json = await response.json();
        setCarFeaturesInput(json);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <GridContainer spacing={2}>
      <GridItem item xs={12} sm={12} md={6} className={classes.uploadOptions}>
        <GridContainer>
          <h2 className={classes.paperTitle}>UPLOAD Car Photo*</h2>
          <GridItem item xs={12}>
            <Dropzone
              style={{ minHeight: "542px", maxHeight: "542px" }}
              //view={"list"}
              onChange={updateFiles}
              minHeight="195px"
              onClean={handleClean}
              value={files}
              maxFiles={15}
              //header={false}
              // footer={false}
              maxFileSize={20998000}
              //label="Drag'n drop files here or click to browse"
              accept=".png,image/*"
              // uploadingMessage={"Uploading..."}
              // url="https://my-awsome-server/upload-my-file"
              //of course this url doens´t work, is only to make upload button visible
              //uploadOnDrop
              clickable={true}
              fakeUploading
              //localization={"FR-fr"}
              // disableScroll
            >
              {files.map((file) => (
                <FileItem
                  {...file}
                  key={file.id}
                  onDelete={onDelete}
                  onSee={handleSee}
                  //localization={"ES-es"}
                  resultOnTooltip
                  preview
                  info
                  hd
                />
              ))}
              <FullScreenPreview
                imgSource={imageSrc}
                openImage={imageSrc}
                onClose={(e) => handleSee(undefined)}
              />
            </Dropzone>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem item xs={12} sm={12} md={6} className={classes.uploadOptions}>
        <GridContainer>
          <h2 className={classes.paperTitle}>Choose your car model</h2>

          {!isUsed && (
            <GridItem item xs={12}>
              <FormControl className="w-full">
                <TextField
                  value={carChassisNumber}
                  label="Enter Chassis Number "
                  name={"car_chassis_number"}
                  autoComplete="off"
                  fullWidth
                  onChange={searchItems}
                  variant="outlined"
                  placeholder="Enter Chassis Number"
                />
                {inputErrors.car_chassis_number && (
                  <div className={classes.errorDiv}>
                    {inputErrors.car_chassis_number}
                  </div>
                )}
              </FormControl>
            </GridItem>
          )}
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Car Type *</InputLabel>
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
              {inputErrors.car_maker && (
                <div className={classes.errorDiv}>{inputErrors.car_maker}</div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Maker *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parseInt(carMaker)}
                label="Car Makers"
                name="car_maker"
                // onChange={onCarMakerChange}
              >
                {carMakers.map((l, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={l.maker_id}
                      onClick={(event) =>
                        onCarMakerChange(event, l.maker_id, l.maker_name)
                      }
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
              <InputLabel id="demo-simple-select-label">Model *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parseInt(carModel)}
                label="Car Models"
                name="car_model"
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
              {inputErrors.car_model && (
                <div className={classes.errorDiv}>{inputErrors.car_model}</div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12}>
            <TextField
              label="Grade/Package"
              name={"car_grade"}
              value={carGrade || ''}
              fullWidth
              onChange={onCarGradeChange}
              placeholder={"Enter Grade/Package"}
            />
          </GridItem>
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Model Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parseInt(carModelYear)}
                label="Car Model Years"
                name="car_model_year"
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
                  name="car_reg_year"
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
                value={carEngineNumber}
                label="Engine Number"
                // value={filteredResults[0]?.engines_number}
                name={"car_engine_number"}
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
                label="Registration Number"
                value={carRegNumber}
                name={"car_registration_number"}
                autoComplete="off"
                fullWidth
                onChange={onCarRegNumberChange}
                placeholder={"Enter Registration Number"}
                variant="outlined"
              />
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
      <GridItem item xs={12} className={classes.uploadOptions}>
        <GridContainer>
          <h2 className={classes.paperTitle}>Choose Details</h2>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Car Body *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Car Body Types"
                name="car_body_type"
                value={parseInt(carBodyType)}
                onChange={onCarBodyTypeChange}
              >
                {carBodyTypes.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.id}>
                      {l.body_name}
                    </MenuItem>
                  );
                })}
              </Select>
              {inputErrors.car_body_type && (
                <div className={classes.errorDiv}>
                  {inputErrors.car_body_type}
                </div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              label="Engine CC"
              value={carEngineCC}
              name={"car_engine_cc"}
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
                  return (
                    <MenuItem key={index} value={l.option}>
                      {l.option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              value={carMileage}
              name={"car_mileage"}
              autoComplete="off"
              label="Mileage"
              fullWidth
              onChange={onCarMileageChange}
              placeholder={"Enter Mileage"}
              variant="outlined"
            />
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              value={carSeat}
              name={"car_seat"}
              autoComplete="off"
              label="Seats"
              fullWidth
              onChange={onCarSeatChange}
              placeholder={"Enter No of Seats"}
              variant="outlined"
            />
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
                {" "}
                Transmission
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={carTransmission}
                label="Car Transmission"
                name="car_transmission"
                onChange={onCarTransmissionChange}
              >
                {carTransmissions.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.id}>
                      {l.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Fuel Type *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={carFuelType}
                label="Car Fuel Type"
                name="car_fuel_type"
                onChange={onCarFuelTypeChange}
              >
                {carFuelTypes.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.fuel_id}>
                      {l.fuel_type}
                    </MenuItem>
                  );
                })}
              </Select>
              {inputErrors.car_fuel_type && (
                <div className={classes.errorDiv}>
                  {inputErrors.car_fuel_type}
                </div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
                Interior Color
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={carInteriorColor}
                label="Car Interior Color"
                name="car_interior_color"
                onChange={onCarInteriorColorChange}
              >
                {carInteriorColors.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.id}>
                      {l.int_color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
                Exterior Color
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={carExteriorColor}
                label="Car Exterior Color"
                name="car_exterior_color"
                onChange={onCarExteriorColorChange}
              >
                {carExteriorColors.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.id}>
                      {l.car_color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem item xs={12} className={classes.uploadOptions}>
        <GridContainer>
          <h2 className={classes.paperTitle}>Select Your Car Features</h2>

          {carFeaturesInput.map((item, index) => (
            <GridItem key={index} item xs={12} sm={12} md={4}>
              <FormControl className="w-full">
                <div>
                  <span>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={onCarFeaturesInputChange}
                          name={`${item.id}`}
                        />
                      }
                      label={item.feature_name}
                    />
                  </span>
                </div>
              </FormControl>
            </GridItem>
          ))}
        </GridContainer>
      </GridItem>
      <GridItem item xs={12} className={classes.uploadOptions}>
        <GridContainer>
          <h2 className={classes.paperTitle}>Set your asking price</h2>
          <p className={classes.carPriceText}>
            Please kindly set the asking price and final price for your car. You
            can also opt for our buyers to call for price of your car.
          </p>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              label="Asking Price *"
              value={carPrice.asking_price}
              name={"asking_price"}
              autoComplete="off"
              fullWidth
              onChange={onCarPriceChange}
              placeholder={"Asking Price *"}
              variant="outlined"
            />
            {inputErrors.asking_price && (
              <div
                style={{
                  position: "absolute",
                  color: "#f06424",
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
              label="Selling Price *"
              InputLabelProps={{
                className: "focus:text-bhalogari",
              }}
              value={carPrice.selling_price}
              name={"selling_price"}
              autoComplete="off"
              fullWidth
              onChange={onCarPriceChange}
              placeholder={"Selling Price *"}
              variant="outlined"
            />
            {inputErrors.selling_price && (
              <div
                style={{
                  position: "absolute",
                  color: "#f06424",
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
              label="Video Link"
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
            <InputLabel>Car Description</InputLabel>
            {editorLoaded ? (
              <CKEditor
                editor={ClassicEditor}
                // data={carDescription}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={onCarDescriptionChange}
              />
            ) : (
              <p>...</p>
            )}
          </GridItem>

          <GridItem item xs={12} sm={12} md={4}>
            {loading && (
              <div className={classes.buttonLoader}>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? "800ms" : "0ms",
                  }}
                  unmountOnExit
                >
                  <CircularProgress className={"text-bhalogari"} />
                </Fade>
              </div>
            )}
            <Button
              variant="contained"
              color="inherit"
              // disabled={loading}
              className={
                classes.button +
                " mt-6 bg-bhalogari text-white hover:text-bhalogari"
              }
              startIcon={<AirportShuttleIcon />}
              onClick={onSubmit}
            >
              submit listing
            </Button>
            <Snackbar
              place="br"
              color="bhalogari"
              icon={AddAlert}
              message={snackMsg}
              open={open}
              onclose={handleClose}
              closeNotification={() => setOpen(false)}
              close
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
