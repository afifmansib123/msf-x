import React, {useState, useMemo, Component} from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import {useQuery} from "react-query";

// react plugin for creating charts
import makeStyles from "@mui/styles/makeStyles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Box from "@mui/material/Box";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

// plugins
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";

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


    const [files, setFiles] = useState([]);
    const [imageSrc, setImageSrc] = useState(undefined);
    const updateFiles = (incommingFiles) => {
        console.log("incomming files", incommingFiles);
        setFiles(incommingFiles);
    };
    const onDelete = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };
    const handleSee = (imageSource) => {
        setImageSrc(imageSource);
    };
    const handleClean = (files) => {
        console.log("list cleaned", files);
    };


    return (
        <GridContainer>
            <h2 className={classes.paperTitle}>UPLOAD Car Photo*</h2>
            <GridItem item xs={12}>
                <Dropzone
                  style={{ minHeight: "450px", maxHeight: "450px" }}
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
                  //label="Suleta tus archivos aquí"
                  accept=".png,image/*"
                  // uploadingMessage={"Uploading..."}
                  url="https://my-awsome-server/upload-my-file"
                  //of course this url doens´t work, is only to make upload button visible
                  //uploadOnDrop
                  //clickable={false}
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
    );
}
