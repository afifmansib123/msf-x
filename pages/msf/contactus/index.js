import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useS3Upload } from "next-s3-upload";

import proImage from "/assets/img/profile/add-picture.svg";
import Image from "next/image";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";

// layout for this page
import MSF from "layouts/MSF.js";
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
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
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
    img: {
        maxHeight: '375px',
        maxWidth: '500px',
    }
};

function contactUs() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const { data: session } = useSession();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    //Image
    //   const [image, setImage] = useState(null);
    //   const [createObjectURL, setCreateObjectURL] = useState(null);
    //   const [imageUrl, setImageUrl] = useState(null);
    //   const [selectedImage, setSelectedImage] = useState(null);

    //   const uploadToClient = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //       const i = event.target.files[0];
    //       setSelectedImage(event.target.files[0])
    //       setImage(i);
    //       setCreateObjectURL(URL.createObjectURL(i));
    //     }
    //   };

    //   useEffect(() => {
    //     if (selectedImage) {
    //       setImageUrl(URL.createObjectURL(selectedImage));
    //     }
    //   }, [selectedImage]);



    async function addMessage(data) {

        const token = session.accessToken;

        console.log("data", data);
        console.log("token", session.token.id);

        // const body = new FormData();
        // body.append("file", url);
        // body.append("headline", data.headline);
        // body.append("description", data.description);
        // body.append("created_by_id", session.token.id);
        // body.append("start_at", data.start_at);
        // body.append("end_at", data.end_at);


        const formData = {
            user_id_id: session.token.id,
            subject: data.subject,
            message: data.message,
            status: 'waiting',
        }
        console.log(formData)

        try {
            const response = await axios.post(`/api/contactus/`, formData);
            console.log(response);
            alert("Success");
            location.href = '/msf/contactus';

        } catch (e) {
            alert("Something went wrong. Please contact IT.");
            console.log(e);
        }

        // try {
        //   // const response = await axios.post(`/api/promotion/upload`, formData, {
        //   const response = await axios.post(`/api/promotion/`, body, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //       "Content-Type": "multipart/form-data",
        //     },
        //   });
        //   alert("Success");
        //   location.href = '/admin/promotion';

        // } catch (error) {
        //   alert("Something went wrong. Please contact IT.");
        //   console.log(error);
        // };

    }



    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Contact Admin</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                {/* Subject Input */}
                                <GridItem xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        id="subject"
                                        label="Subject"
                                        variant="outlined"
                                        {...register("subject", { required: true })}
                                    />
                                </GridItem>
                                {/* Message Input */}
                                <GridItem xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        id="message"
                                        label="Message"
                                        variant="outlined"
                                        multiline
                                        rows={6}
                                        maxRows={10}
                                        {...register("message", { required: true })}
                                    />
                                </GridItem>
                            </GridContainer>


                            <GridItem xs={12} sm={12} md={2} className="flex justify-end">
                                <Button onClick={handleSubmit(addMessage)} color="primary" round>
                                    Submit
                                </Button>
                            </GridItem>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

contactUs.layout = MSF;
contactUs.auth = true;

export default contactUs;
