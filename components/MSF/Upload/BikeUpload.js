import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
// @mui/icons-material
import AddAlert from "@mui/icons-material/AddAlert";
import Bike from "@mui/icons-material/TwoWheeler";
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

export default function BikeUpload() {
  const [bikeType, setBikeType] = useState();
  const [bikeTypes, setBikeTypes] = useState([]);
  const [bikeMaker, setBikeMaker] = useState();
  const [bikeMakers, setBikeMakers] = useState([]);
  const [bikeModel, setBikeModel] = useState();
  const [bikeModels, setBikeModels] = useState([]);
  const [bikeCities, setBikeCities] = useState([]);
  const [bikeCity, setBikeCity] = useState();
  const [bikeGrade, setBikeGrade] = useState();
  const [bikeModelYear, setBikeModelYear] = useState();
  const [bikeModelYears, setBikeModelYears] = useState([]);
  const [bikeRegYear, setBikeRegYear] = useState();
  const [bikeRegYears, setBikeRegYears] = useState([]);
  const [isRegYear, setIsRegYear] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [bikeChassisNumber, setBikeChassisNumber] = useState();
  const [bikeColor, setBikeColor] = useState();
  const [bikeColors, setBikeColors] = useState([]);
  const [bikeRegNumber, setBikeRegNumber] = useState();
  const [bikeBodyType, setBikeBodyType] = useState();
  const [bikeBodyTypes, setBikeBodyTypes] = useState([]);
  const [bikeRearBrake, setBikeRearBrake] = useState();
  const [bikeRearBrakes, setBikeRearBrakes] = useState([]);
  const [bikeFuelEconomy, setBikeFuelEconomy] = useState();
  const [bikeFrontBrake, setBikeFrontBrake] = useState();
  const [bikeFrontBrakes, setBikeFrontBrakes] = useState([]);
  const [bikeNoOfGear, setBikeNoOfGear] = useState();
  const [bikeNoOfGears, setBikeNoOfGears] = useState([]);
  const [bikeRearSuspension, setBikeRearSuspension] = useState();
  const [bikeEngineCC, setBikeEngineCC] = useState();
  const [bikeMileage, setBikeMileage] = useState();
  const [bikeFrontSuspension, setBikeFrontSuspension] = useState();
  const [bikeFrontSuspensions, setBikeFrontSuspensions] = useState([]);
  const [bikeRearSuspensions, setBikeRearSuspensions] = useState([]);
  const [bikeFeaturesInput, setBikeFeaturesInput] = useState([]);
  const [bikeFeatures, setbikeFeatures] = useState([]);
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [images, setImages] = useState([]);
  const [fileLimitExceeded, setFileLimitExceeded] = useState(false);
  const [bikePrice, setbikePrice] = useState({
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
        bike_chassis_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .label("Chassis"),
        bike_registration_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .allow("")
          .label("Registration No"),
        bike_type: Joi.number().required().label("Type"),
        bike_maker: Joi.number().required().label("Maker"),
        bike_model: Joi.number().required().label("Model"),
        asking_price: Joi.number()
          .positive()
          .integer()
          .min(10000)
          .max(1000000)
          .required()
          .label("Asking Price"),
        bike_mileage: Joi.number()
          .min(-1)
          .max(999999)
          .allow("")
          .label("Mileage"),
        bike_engine_cc: Joi.number()
          .precision(2)
          .min(60)
          .max(250)
          .allow("")
          .label("Engine Capacity"),
        bike_body_type: Joi.number().required().label("Body Type"),
        selling_price: Joi.number()
          .positive()
          .integer()
          .min(10000)
          .max(1000000)
          .required()
          .label("Selling Price"),
      }
    : {
        bike_chassis_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .required()
          .label("Chassis"),
        bike_registration_number: Joi.string()
          .max(20)
          .regex(/^[a-zA-Z-0-9]+$/)
          .allow("")
          .label("Registration No"),
        bike_type: Joi.number().required().label("Type"),
        bike_maker: Joi.number().required().label("Maker"),
        bike_model: Joi.number().required().label("Model"),
        asking_price: Joi.number()
          .positive()
          .integer()
          .min(10000)
          .max(1000000)
          .required()
          .label("Asking Price"),
        bike_mileage: Joi.number()
          .min(-1)
          .max(999999)
          .allow("")
          .label("Mileage"),
        bike_engine_cc: Joi.number()
          .precision(2)
          .min(60)
          .max(250)
          .allow("")
          .label("Engine Capacity"),
        bike_body_type: Joi.number().required().label("Body Type"),
        selling_price: Joi.number()
          .positive()
          .integer()
          .min(10000)
          .max(1000000)
          .required()
          .label("Selling Price"),
      };

  useEffect(() => {
    if (
      parseInt(bikePrice.asking_price) > 0 &&
      parseInt(bikePrice.selling_price) > parseInt(bikePrice.asking_price)
    ) {
      setError({
        ...inputErrors,
        selling_price: "Selling Price must be less than asking price!",
      });
    } else if (
      parseInt(bikePrice.asking_price) < parseInt(bikePrice.selling_price)
    ) {
      if (Object.keys(inputErrors).includes("selling_price")) {
        delete inputErrors["selling_price"];
      }
    } else if (
      parseInt(bikePrice.asking_price) > parseInt(bikePrice.selling_price)
    ) {
      if (Object.keys(inputErrors).includes("selling_price")) {
        delete inputErrors["selling_price"];
      }
    }
  }, [bikePrice.selling_price, bikePrice.asking_price]);

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

  const onBikePriceChange = ({ target: input }) => {
    const { name, value } = input;
    if (name === "selling_price") {
      propertyValidationHelper("selling_price", value);
    } else if (name === "asking_price") {
      propertyValidationHelper("asking_price", value);
    }
    setbikePrice({ ...bikePrice, [name]: value });
  };

  const [bikeDescription, setBikeDescription] = useState("");

  const onBikeDescriptionChange = (event, editor) => {
    const data = editor.getData();
    let element = document.createElement("div");
    element.innerHTML = data;
    setBikeDescription(element.textContent || element.innerText);
  };

  const [bikeVideoLink, setbikeVideoLink] = useState({
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

  const onBikeTypeChange = (e) => {
    if (bikeType !== "") {
      setBikeMaker("");
      setBikeModel("");
      setBikeModelYear("");
    }
    if (e.target.name === "bike_type" && e.target.value === 2) {
      setBikeRegYears(getYears());
      setIsRegYear(true);
      setIsUsed(true);
    } else if (e.target.name === "bike_type" && e.target.value === 1) {
      setIsRegYear(false);
      setIsUsed(false);
    }
    propertyValidationHelper("bike_type", e.target.value);
    setBikeType(e.target.value);
  };

  const onBikeMakerChange = (e, id, name) => {
    setBikeMaker(id);
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/bike-model-list/?maker_name=${name}`
        );
        const json = await response.json();
        if (response.status === 200) {
          setBikeModels(json.result);
          setBikeModelYears(getYears());
        } else {
        }
      } catch (err) {}
    })();
    propertyValidationHelper("bike_maker", e.target.value);
  };
  const onBikeModelChange = (e) => {
    setBikeModel(e.target.value);
    propertyValidationHelper("bike_model", e.target.value);
  };
  const onBikeGradeChange = (e) => {
    setBikeGrade(e.target.value);
  };
  const onBikeCityChange = (e) => {
    setBikeCity(e.target.value);
  };
  const onBikeModelYearChange = (e) => {
    setBikeModelYear(e.target.value);
  };
  const onBikeRegYearChange = (e) => {
    setBikeRegYear(e.target.value);
  };
  const onBikeChassisNumberChange = (e) => {
    setBikeChassisNumber(e.target.value);
    propertyValidationHelper("bike_chassis_number", e.target.value);
  };
  const onBikeColorChange = (e) => {
    setBikeColor(e.target.value);
  };
  const onBikeRegNumberChange = (e) => {
    setBikeRegNumber(e.target.value);
  };
  const onBikeBodyTypeChange = (e) => {
    setBikeBodyType(e.target.value);
    propertyValidationHelper("bike_body_type", e.target.value);
  };
  const onBikeFrontBrakeChange = (e) => {
    setBikeFrontBrake(e.target.value);
    propertyValidationHelper("bike_front_brake", e.target.value);
  };
  const onBikeRearBrakeChange = (e) => {
    setBikeRearBrake(e.target.value);
  };
  const onBikeNoOfGearChange = (e) => {
    setBikeNoOfGear(e.target.value);
  };
  const onBikeFuelEconomyChange = (e) => {
    setBikeFuelEconomy(e.target.value);
  };
  const onBikeMileageChange = (e) => {
    setBikeMileage(e.target.value);
  };
  const onBikeEngineCCChange = (e) => {
    setBikeEngineCC(e.target.value);
  };
  const onBikeFrontSuspensionChange = (e) => {
    setBikeFrontSuspension(e.target.value);
  };
  const onBikeRearSuspensionChange = (e) => {
    setBikeRearSuspension(e.target.value);
  };
  const onBikeFeaturesInputChange = (e) => {
    const { name } = e.target;
    const index = bikeFeatures.indexOf(parseInt(name));
    if (index !== -1) {
      const newBox = [...bikeFeatures];
      newBox.splice(index, 1);
      setbikeFeatures(newBox);
    } else {
      setbikeFeatures([...bikeFeatures, parseInt(name)]);
    }
  };
  const onBikeVideoLinkChange = ({ target: input }) => {
    setbikeVideoLink({ ...bikeVideoLink, [input.name]: input.value });
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
          // bikeColor: bikeColor,
          // bikeChassisNumber: bikeChassisNumber,
          bike_type: bikeType,
          bike_maker: bikeMaker,
          bike_model: bikeModel,
          asking_price: bikePrice.asking_price,
          bike_body_type: bikeBodyType,
          selling_price: bikePrice.selling_price,
          bike_engine_cc: bikeEngineCC,
        }
      : {
          // bikeColor: bikeColor,
          bike_chassis_number: bikeChassisNumber,
          bike_type: bikeType,
          bike_maker: bikeMaker,
          bike_model: bikeModel,
          asking_price: bikePrice.asking_price,
          bike_body_type: bikeBodyType,
          selling_price: bikePrice.selling_price,
          bike_engine_cc: bikeEngineCC,
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
      // console.log(isUsed);
      setSnackMsg(
        "Please fill out the mandatory fields before submitting your listing!"
      );
      setOpen(true);
      return;
    }

    const user_id = session.token.id;
    // const user_id = 41;

    let bikeObject = {
      mileage: bikeMileage !== "" ? bikeMileage : 0,
      fixed_price: bikePrice.asking_price !== "" ? bikePrice.asking_price : 0.0,
      price_to: bikePrice.asking_price !== "" ? bikePrice.asking_price : 0.0,
      affiliated_price: bikePrice.selling_price,
      price_from: bikePrice.selling_price,
      rear_suspension: bikeRearSuspension,
      bike_manufacturer: bikeMaker,
      model_name: bikeModel,
      rear_brake: bikeRearBrake,
      bike_color: bikeColor,
      gear: bikeNoOfGear,
      bike_body_type: bikeBodyType,
      engine_capacity: bikeEngineCC !== "" ? bikeEngineCC : 0.0,
      front_brake: bikeFrontBrake,
      created_by: user_id,
      bike_video_link: bikeVideoLink.video1 !== "" ? bikeVideoLink.video1 : "-",
      bike_type: bikeType,
      front_suspension: bikeFrontSuspension,
      description: bikeDescription !== "" ? bikeDescription : "-",
      bike_features: bikeFeatures,
      bike_year: bikeModelYear,
      engine_no: bikeColor !== "" ? bikeColor : "-",
      chassis_no: bikeChassisNumber,
      registration_year: bikeRegYear,
      registration_no: bikeRegNumber,
      grade: bikeGrade,
      car_location: bikeCity,
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
      console.log(bikeObject);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BG_API}bikes/bike-upload/`,
        bikeObject
      );
      console.log(response);
      if (response.status === 201) {
        const id = response.data.bike_id;
        localStorage.setItem("bike_id", id);
        let formData = new FormData();
        formData.append("bike_id", id);
        formData.append("created_by", user_id);
        Object.keys(images).forEach((item) => {
          if (images[item] !== null) {
            formData.append("image", images[item]);
          }
        });
        console.log(images);
        const response1 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/image-upload/`,
          {
            method: "post",
            body: formData,
          }
        );
        console.log(response1);
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
          `${process.env.NEXT_PUBLIC_BG_API}bikes/bike-type/`
        );
        const json = await response.json();
        let response1 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/bike-manufacturer/`
        );
        const json1 = await response1.json();
        let response2 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/color/`
        );
        const json2 = await response2.json();

        setBikeTypes(json);
        setBikeMakers(json1);
        setBikeColors(json2);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/body-type/`
        );
        const json = await response.json();
        const response1 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/rear-brake/`
        );
        const json1 = await response1.json();
        const response2 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/front-suspension/`
        );
        const json2 = await response2.json();
        const response3 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/front-brake/`
        );
        const json3 = await response3.json();
        const response4 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/gear/`
        );
        const json4 = await response4.json();
        const response5 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/rear-suspension/`
        );
        const json5 = await response5.json();

        const response6 = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}cars/locations/`
        );
        const json6 = await response6.json();

        setBikeBodyTypes(json);
        setBikeRearBrakes(json1);
        setBikeFrontSuspensions(json2);
        setBikeFrontBrakes(json3);
        setBikeNoOfGears(json4);
        setBikeRearSuspensions(json5);
        setBikeCities(json6);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BG_API}bikes/bike-features/`
        );
        const json = await response.json();
        setBikeFeaturesInput(json);
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
          <h2 className={classes.paperTitle}>UPLOAD Bike Photo*</h2>
          <GridItem item xs={12}>
            <Dropzone
              style={{ minHeight: "620px", maxHeight: "542px" }}
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
          <h2 className={classes.paperTitle}>Choose your bike model</h2>

          {!isUsed && (
            <GridItem item xs={12}>
              <FormControl className="w-full">
                <TextField
                  value={bikeChassisNumber}
                  label="Enter Chassis Number "
                  name={"bike_chassis_number"}
                  autoComplete="off"
                  fullWidth
                  onChange={onBikeChassisNumberChange}
                  variant="outlined"
                  placeholder="Enter Chassis Number"
                />
                {inputErrors.bike_chassis_number && (
                  <div className={classes.errorDiv}>
                    {inputErrors.bike_chassis_number}
                  </div>
                )}
              </FormControl>
            </GridItem>
          )}
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Bike Type *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeType}
                label="Bike Types"
                name="bike_type"
                onChange={onBikeTypeChange}
              >
                {bikeTypes.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.type_id}>
                      {l.type_name}
                    </MenuItem>
                  );
                })}
              </Select>
              {inputErrors.bike_type && (
                <div className={classes.errorDiv}>{inputErrors.bike_type}</div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Maker *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeMaker}
                label="Bike Makers"
                name="bike_maker"
                // onChange={onBikeMakerChange}
              >
                {bikeMakers.map((l, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={l.maker_id}
                      onClick={(event) =>
                        onBikeMakerChange(event, l.maker_id, l.maker_name)
                      }
                    >
                      {l.maker_name}
                    </MenuItem>
                  );
                })}
              </Select>
              {inputErrors.bike_maker && (
                <div className={classes.errorDiv}>{inputErrors.bike_maker}</div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Model *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeModel}
                label="Bike Models"
                name="bike_model"
                onChange={onBikeModelChange}
              >
                {bikeModels.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.model_id}>
                      {l.model_name}
                    </MenuItem>
                  );
                })}
              </Select>
              {inputErrors.bike_model && (
                <div className={classes.errorDiv}>{inputErrors.bike_model}</div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12}>
            <TextField
              value={bikeGrade}
              label="Edition/Version"
              name={"bike_grade"}
              fullWidth
              onChange={onBikeGradeChange}
              placeholder={"Enter Edition/Version"}
            />
          </GridItem>
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Model Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeModelYear}
                label="Bike Model Years"
                name="bike_model_year"
                onChange={onBikeModelYearChange}
              >
                {bikeModelYears.map((l, index) => {
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
                  value={bikeRegYear}
                  label="Bike Reg Years"
                  name="bike_reg_year"
                  onChange={onBikeRegYearChange}
                >
                  {bikeRegYears.map((l, index) => {
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
          {isUsed && (
            <GridItem item xs={12}>
              <TextField
                label="Registration Number"
                value={bikeRegNumber}
                name={"bike_registration_number"}
                autoComplete="off"
                fullWidth
                onChange={onBikeRegNumberChange}
                placeholder={"Enter Registration Number"}
                variant="outlined"
              />
            </GridItem>
          )}
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Color</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeColor}
                label="Bike Color"
                name="bike_color"
                onChange={onBikeColorChange}
              >
                {bikeColors.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.color_id}>
                      {l.bike_color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeCity}
                label="City"
                name="city_name"
                onChange={onBikeCityChange}
              >
                {bikeCities.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.location_id}>
                      {l.city.district_name}
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
          <h2 className={classes.paperTitle}>Choose Bike Details</h2>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Bike Body *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Bike Body Types"
                name="bike_body_type"
                onChange={onBikeBodyTypeChange}
              >
                {bikeBodyTypes.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.id}>
                      {l.body_name}
                    </MenuItem>
                  );
                })}
              </Select>
              {inputErrors.bike_body_type && (
                <div className={classes.errorDiv}>
                  {inputErrors.bike_body_type}
                </div>
              )}
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              label="Engine CC"
              value={bikeEngineCC}
              name={"bike_engine_cc"}
              autoComplete="off"
              fullWidth
              onChange={onBikeEngineCCChange}
              placeholder={"Enter Engine CC"}
              variant="outlined"
            />
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              label="Fuel Efficiency"
              value={bikeFuelEconomy}
              name={"bike_fuel_economy"}
              autoComplete="off"
              fullWidth
              onChange={onBikeFuelEconomyChange}
              placeholder={"Fuel Economy"}
              variant="outlined"
            />
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              value={bikeMileage}
              name={"bike_mileage"}
              autoComplete="off"
              label="Mileage"
              fullWidth
              onChange={onBikeMileageChange}
              placeholder={"Enter Mileage"}
              variant="outlined"
            />
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
                {" "}
                Front Suspension
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeFrontSuspension}
                label="Front Suspension"
                name="bike_front_suspension"
                onChange={onBikeFrontSuspensionChange}
              >
                {bikeFrontSuspensions.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.suspension_id}>
                      {l.front_suspension}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">
                {" "}
                Rear Suspension
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeRearSuspension}
                label="Rear Suspension"
                name="bike_rear_suspension"
                onChange={onBikeRearSuspensionChange}
              >
                {bikeRearSuspensions.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.suspension_id}>
                      {l.rear_suspension}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Front Brake</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeFrontBrake}
                label="Front Brake"
                name="bike_front_brake"
                onChange={onBikeFrontBrakeChange}
              >
                {bikeFrontBrakes.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.brake_id}>
                      {l.front_brake}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Rear Brake</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeRearBrake}
                label="Rear Brake"
                name="bike_rear_brake"
                onChange={onBikeRearBrakeChange}
              >
                {bikeRearBrakes.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.brake_id}>
                      {l.rear_brake}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem item xs={12} sm={12} md={4}>
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">No. of Gear</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bikeNoOfGear}
                label="No. of Gear"
                name="bike_no_of_gear"
                onChange={onBikeNoOfGearChange}
              >
                {bikeNoOfGears.map((l, index) => {
                  return (
                    <MenuItem key={index} value={l.gear_id}>
                      {l.gear}
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
          <h2 className={classes.paperTitle}>Select Your Bike Features</h2>

          {bikeFeaturesInput.map((item, index) => (
            <GridItem item xs={12} sm={12} md={4}>
              <FormControl className="w-full">
                <div key={index}>
                  <span>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={onBikeFeaturesInputChange}
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
            Please kindly set the asking price and final price for your Bike.
          </p>
          <GridItem item xs={12} sm={12} md={4}>
            <TextField
              label="Asking Price *"
              value={bikePrice.asking_price}
              name={"asking_price"}
              autoComplete="off"
              fullWidth
              onChange={onBikePriceChange}
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
              value={bikePrice.selling_price}
              name={"selling_price"}
              autoComplete="off"
              fullWidth
              onChange={onBikePriceChange}
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
              value={bikeVideoLink.video1}
              name={videoName[0]}
              autoComplete="off"
              fullWidth
              onChange={onBikeVideoLinkChange}
              placeholder={"Video Link"}
              variant="outlined"
            />
          </GridItem>

          <GridItem item xs={12} sm={12} md={8}>
            <InputLabel>Bike Description</InputLabel>
            {editorLoaded ? (
              <CKEditor
                editor={ClassicEditor}
                // data={bikeDescription}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={onBikeDescriptionChange}
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
              startIcon={<Bike />}
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
