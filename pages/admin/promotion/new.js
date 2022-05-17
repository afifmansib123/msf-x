import React, { useState, useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';
import UploadService from "./FileUploadService";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { signOut } from "next-auth/react";


const avatar = "/assets/img/faces/marc.jpg";

const handleSignOut = () => {
  signOut({ callbackUrl: "/" })
}
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function New() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();


  // upload files, picture
  // const [selectedFiles, setSelectedFiles] = useState(undefined);
  // const [currentFile, setCurrentFile] = useState(undefined);
  // const [progress, setProgress] = useState(0);
  // const [message, setMessage] = useState("");
  // const [fileInfos, setFileInfos] = useState([]);

  // const selectFile = (event) => {
  //   setSelectedFiles(event.target.files);
  // };
  // const upload = () => {
  //   let currentFile = selectedFiles[0];
  //   setProgress(0);
  //   setCurrentFile(currentFile);
  //   UploadService.upload(currentFile, (event) => {
  //     setProgress(Math.round((100 * event.loaded) / event.total));
  //   })
  //     .then((response) => {
  //       setMessage(response.data.message);
  //       return UploadService.getFiles();
  //     })
  //     .then((files) => {
  //       setFileInfos(files.data);
  //     })
  //     .catch(() => {
  //       setProgress(0);
  //       setMessage("Could not upload the file!");
  //       setCurrentFile(undefined);
  //     });
  //   setSelectedFiles(undefined);
  // };

  // useEffect(() => {
  //   UploadService.getFiles().then((response) => {
  //     setFileInfos(response.data);
  //   });
  // }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Promotion</h4>
              <p className={classes.cardCategoryWhite}>Insert Promotion Information</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                {/* Headline Input */}
                <GridItem xs={12} sm={12} md={12}>
                  <TextField fullWidth id="headline"
                    label="Headline"
                    variant="outlined" />
                </GridItem>
                {/* Description Input */}
                <GridItem xs={12} sm={12} md={12}>
                  <TextField fullWidth id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    maxRows={5}
                  />
                </GridItem>
              </GridContainer>

              {/* Date Time Input */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    id="start-time"
                    label="Start Time"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="end-time"
                    label="End Time"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button color="primary" round> ADD </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>

            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Upload Picture</h6>
              {/* <div>
                {currentFile && (
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-info progress-bar-striped"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: progress + "%" }}
                    >
                      {progress}%
                    </div>
                  </div>
                )}
                <label className="btn btn-default">
                  <input type="file" onChange={selectFile} />
                </label>
                <button
                  className="btn btn-success"
                  disabled={!selectedFiles}
                  onClick={upload}
                >
                  Upload
                </button>
                <div className="alert alert-light" role="alert">
                  {message}
                </div>
                <div className="card">
                  <div className="card-header">List of Files</div>
                  <ul className="list-group list-group-flush">
                    {fileInfos &&
                      fileInfos.map((file, index) => (
                        <li className="list-group-item" key={index}>
                          <a href={file.url}>{file.name}</a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div> */}
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}

New.layout = Admin;
New.auth = true;

export default New;

// async function handleAdd() {
//   const response = await fetch("/api/promotion/add")
// }
