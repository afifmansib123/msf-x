import React, {useState, useMemo, Component} from "react";
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
import Box from "@mui/material/Box";

// plugins
import { Dropzone, FileItem } from "@dropzone-ui/react";


export default function ImageUpload() {
    const [images, setImages] = useState([]);
    const [fileLimitExceeded, setFileLimitExceeded] = useState(false);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    React.useEffect(() => {
        if (images.length >= 15) {
            setFileLimitExceeded(true);
        } else {
            setFileLimitExceeded(false);
        }
    },[images]);

    const onImageUpload = async (file) => {
        if (file) {
            const listSize = file.length;
            const prevListSize = images.length;
            const newImageLength = listSize - prevListSize;
            for (let i = listSize - 1; i >= prevListSize; i--) {
                const image1 = file[i];
                const imageName = image1.name;
                console.log(image1);
                setImages((prev) => [...prev, image1]);
            }
        }
    };

    const onImageDelete = (file) => {
        const deleteFileName = file.name;
        const indexOfItemToRemove = images.findIndex((item) => item.name === deleteFileName);
        if (indexOfItemToRemove === -1) {
            return;
        }
        setImages((list) => [...list.slice(0, indexOfItemToRemove), ...list.slice(indexOfItemToRemove + 1)]);
    };

    const [files, setFiles] = React.useState([]);
    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
    };


    return (
        <GridContainer>
            <h2 className={classes.paperTitle}>UPLOAD Car Photo*</h2>
            <GridItem item xs={12} sm={12} md={4}>
                <Dropzone onChange={updateFiles} value={files}>
                    {files.map((file) => (
                      <FileItem {...file} preview />
                    ))}
                </Dropzone>
                {/*<DropzoneArea*/}
                {/*  acceptedFiles={["image/*"]}*/}
                {/*  dropzoneProps={{ disabled: fileLimitExceeded }}*/}
                {/*  dropzoneClass={classes.dropZone}*/}
                {/*  previewGridClasses={{*/}
                {/*      container: classes.previewContainer,*/}
                {/*      item: classes.preview,*/}
                {/*      image: classes.previewImg,*/}
                {/*  }}*/}
                {/*  // initialFiles={['https://bhalogari-static.s3.amazonaws.com/media/2005-Honda-Civic-FrontSide_HOCIVSED051_505x375.jpg']}*/}
                {/*  getPreviewIcon={(file) => {*/}
                {/*      if (file.file.type.split("/")[0] === "image")*/}
                {/*          return (*/}
                {/*            <img*/}
                {/*              className={classes.previewImg}*/}
                {/*              role="presentation"*/}
                {/*              alt="presentation"*/}
                {/*              src={file.data}*/}
                {/*            />*/}
                {/*          );*/}
                {/*  }}*/}
                {/*  // open={true}*/}
                {/*  previewText={false}*/}
                {/*  dropzoneText={*/}
                {/*      fileLimitExceeded*/}
                {/*        ? "You have already uploaded 15 photos"*/}
                {/*        : "Drag & Drop file you want to upload"*/}
                {/*  }*/}
                {/*  filesLimit={15}*/}
                {/*  maxFileSize={10000000}*/}
                {/*  onChange={(files) => onImageUpload(files)}*/}
                {/*  onDelete={(file) => onImageDelete(file)}*/}
                {/*  showAlerts={["error"]}*/}
                {/*  showPreviewsInDropzone={false}*/}
                {/*  showPreviews={true}*/}
                {/*/>*/}
            </GridItem>

        </GridContainer>
    );
}
