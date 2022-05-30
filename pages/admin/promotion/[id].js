import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import axios from "axios";
import { useS3Upload } from "next-s3-upload";

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
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
// import { prisma } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";

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


function EditPage(props) {
  let { uploadToS3 } = useS3Upload();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const router = useRouter();
  const promo_id = parseInt(router.query.id);

  const [image, setImage] = useState(props.promotions.image_url.replace("public", ""));
  const [createObjectURL, setCreateObjectURL] = useState(null);


  const [imageUrl, setImageUrl] = useState(props.promotions.image_url.replace("public", ""));
  const [selectedImage, setSelectedImage] = useState(null);
  const [update, setUpdate] = useState(false);

  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setSelectedImage(event.target.files[0])
      setImage(i);
      setUpdate(true)
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }

    console.log(props.promotions.image_url.replace("public", ""))

  }, [selectedImage]);

  const body = new FormData();

  async function updatePromo(data) {
    console.log("file", image);
    if (update) {
      let { url } = await uploadToS3(image, {
        endpoint: {
          request: {
            body: {
              path: `promotion/banner`, // Path without leading and trailing slashes
            },
          },
        },
      });
      body.append("file", url);
    }
    else {
      console.log("this is the same image")
      body.append("file", imageUrl);
    }

    // console.log("S3 url", url);
    body.append("update", update);
    body.append("headline", data.headline);
    body.append("description", data.description);
    body.append("created_by_id", session.token.id);
    body.append("start_at", data.start_at);
    body.append("end_at", data.end_at);
    const token = session.accessToken;

    try {
      const response = await axios.put("/api/promotion/" + promo_id, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // assume no error
      alert("Success");
      location.href = '/admin/promotion';

    } catch (err) {
      alert("Something went wrong. Please contact IT.");
      console.error(err);
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Promotion</h4>
              <p className={classes.cardCategoryWhite}>Insert Promotion Information</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                {/* Headline Input */}
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    id="headline"
                    label="Headline"
                    variant="outlined"
                    defaultValue={props.promotions.headline}
                    {...register("headline", { required: true })}
                  />
                </GridItem>
                {/* Description Input */}
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    maxRows={5}
                    defaultValue={props.promotions.description}
                    {...register("description", { required: true })}
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
                    defaultValue={(new Date(props.promotions.start_at)).toISOString().replace("Z", "")}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("start_at")}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <TextField
                    id="end-time"
                    label="End Time"
                    type="datetime-local"
                    defaultValue={(new Date(props.promotions.end_at)).toISOString().replace("Z", "")}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("end_at")}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <input name="file" type="file" onChange={uploadToClient} class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" />

                  <div mt={2} textAlign="center">
                    <div>Image Preview:</div>
                    <img src={imageUrl} className={classes.img} />
                  </div>

                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button onClick={handleSubmit(updatePromo)} color="primary" round>
                    Update
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const promo_id = parseInt(context.params.id);
  const promotions = await getPromo(promo_id);
  return {
    props: {
      promotions: promotions || null,
    },
  };
}

async function getPromo(promo_id) {
  // const prisma = new PrismaClient();
  const data = await prisma.MerchantStorefront_promotion.findUnique({
    where: {
      id: promo_id,
    },
  });
  const parsedData = JSON.parse(
    JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  return parsedData;
}

EditPage.layout = Admin;
EditPage.auth = true;

export default EditPage;
