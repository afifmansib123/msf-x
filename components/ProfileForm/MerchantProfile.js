import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from 'next/image';
import { useS3Upload } from "next-s3-upload";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import proImage from "../../assets/img/profile/add-picture.svg";
import axios from "axios";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
      rootBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            h1: {
                  fontSize: "25px",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
            },
      },
      cardBox: {
            width: "60%",
            padding: "30px 30px",
            backgroundColor: "white",
            h1: {
                  fontFamily: "30px",
            },
            "@media(max-width: 919px)": {
                  marginTop: "80px",
            },
            "@media(max-width: 820px)": {
                  marginTop: "100px",
                  width: "100%",

            },
            "@media(max-width: 520px)": {
                  marginTop: "130px",
                  width: "100%",

            },
      },
      box: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
      },
      editProfileLayout: {
            display: "grid",
            width: "100%",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "2.5em",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
            "@media(max-width: 600px)": {
                  gridTemplateColumns: "1fr",
            },
      },
      profileImage: {
            position: "absolute",
            top: "10px",
            marginLeft: "350px",
            cursor: "pointer",
            border: "5px solid #fff",
            borderRadius: "50%",
            overflow: "hidden",
            width: "164px",
            height: "164px",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "@media(max-width: 919px)": {
                  marginRight: "0px",
                  marginTop: "0px",
                  marginLeft: "120px",
            },
            "@media(max-width: 767px)": {
                  marginRight: "-82px",
                  marginTop: "20px",
            },
            "@media(max-width: 520px)": {
                  marginRight: "0px",
                  marginTop: "0px",
                  // position: "absolute",
                  top: "50px",
                  marginLeft: "30px",
                  // cursor: "pointer",
                  border: "5px solid #fff",
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "164px",
                  height: "164px",
                  background: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
            }
      },
      image: {
            minWidth: "180px",
            height: "auto",
      },
      root: {
            "& .MuiInputBase-root.Mui-disabled": {
                  color: "rgba(0, 0, 0, 0.6)" // (default alpha is 0.38)
            }
      }
}));


const MerchantProfileForm = ({ data,  userId }) => {
      let { uploadToS3 } = useS3Upload();
      const classes = useStyles();
      const { register, handleSubmit } = useForm();
      const { data: session, status } = useSession();
      const [img, setImg] = useState();
      const [message, setMessage] = useState("");
      const [open, setOpen] = useState(false);
      const [userimg, setUserimg] = useState(data.image_url ? data.image_url : proImage);
      const [errorText, setErrorText] = useState("");
      const [logoUrl, setLogoUrl] = useState(data.image_url);
      const [readOnly, setReadOnly] = useState(true);
      let okay = false;
      console.log(data);

      const handleImage = async (e) => {
            let file = e.target.files[0];
            // console.log(file)
            let { url } = await uploadToS3(file, {
                  endpoint: {
                        request: {
                              body: {
                                    path: `api/profile/${userId}/image`, // Path without leading and trailing slashes
                              },
                        },
                  },
            });
            console.log("S3 url", url);

            // Update user image
            let patchedUser = await axios.patch(`/api/profile/${userId}/`, {
                  image_url: url
            })

            setLogoUrl(e.target.files[0]);
            setImg(e.target.files[0]);
            setUserimg(URL.createObjectURL(e.target.files[0]));
      }
      const onSubmit = async (userData) => {
            var regex = /(^(\+8801|01))?[3-9]{1}(\d){8}/;

            if (regex.test(userData.contact_number) && (userData.contact_number.length == 11 || userData.contact_number.length == 14)) {
                  userData.user_id = userId;
                  userData.date_of_birth= userData.date_of_birth.concat('T00:00:00.000Z') || null;
                  userData.country='BD';
                  console.log(userData);
                  setErrorText("");
                  okay = true;
            } else {
                  setErrorText("Phone number not valid");
                  okay = false;
            }

            if (okay == true) {

                  
                  let updatedUser = await axios.patch(`/api/profile/`, userData);
                  // console.log(updatedUser);
                  if (updatedUser.status == 200) {
                        setMessage("Update Successful");
                        setOpen(true);
                        setReadOnly(true);
                  }


                  
            }


      };
      const handleEditMode = () => {
            setReadOnly(false);
      };

      return (
            <>
                  <Snackbar
                        anchorOrigin={{
                              vertical: "top",
                              horizontal: "center",
                        }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                  >
                        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
                              {message}
                        </Alert>
                  </Snackbar>
                  <div className={classes.rootBox}>

                        <div className={classes.cardBox}>
                              <div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="">
                                          <Typography component="h1">
                                                {readOnly && (
                                                      <Button className="bg-orange-600 hover:bg-black font-sans font-bold text-white py-2 px-2 transition-all" onClick={() => handleEditMode()}>
                                                            Edit Merchant Details
                                                      </Button>
                                                )}
                                                {!readOnly && (
                                                      <Button className="bg-orange-600 hover:bg-black font-sans font-bold text-white py-2 px-2 transition-all" type="submit" variant="contained" color="success">
                                                            Save
                                                      </Button>
                                                )}
                                          </Typography>
                                          <div className={classes.box}>

                                                <div className={classes.profileImage}>
                                                      <label htmlFor="file-input">
                                                            <Image
                                                                  unoptimized
                                                                  layout='fill'
                                                                  src={userimg}
                                                                  style={{ cursor: 'pointer' }}
                                                                  alt="Profile Image"
                                                                  className={classes.image}
                                                            />
                                                      </label>
                                                      <input
                                                            type="file"
                                                            id="file-input"
                                                            style={{ display: "none" }}
                                                            name="image"
                                                            onChange={handleImage}
                                                            disabled={readOnly}
                                                      />
                                                </div>
                                                <div className={classes.editProfileLayout}>
                                                      <TextField
                                                            required
                                                            id="outlined-required"
                                                            name="first_name"
                                                            label="First Name"
                                                            defaultValue={data.first_name}
                                                            helpertext={data.first_name}
                                                            {...register("first_name")}
                                                            disabled={readOnly}
                                                      />
                                                      <TextField
                                                            required
                                                            id="outlined-required"
                                                            name="last_name"
                                                            label="Last Name"
                                                            defaultValue={data.last_name}
                                                            helpertext={data.last_name}
                                                            {...register("last_name")}
                                                            disabled={readOnly}
                                                      />
                                                      <TextField
                                                            required
                                                            id="outlined-required"
                                                            name="contact_number"
                                                            type="text"
                                                            label="Your Mobile Number"
                                                            defaultValue={data.contact_number}
                                                            helpertext={data.contact_number}
                                                            error={errorText.length > 0}
                                                            {...register("contact_number")}
                                                            disabled={readOnly}
                                                      />
                                                      <TextField
                                                            required
                                                            id="outlined-required"
                                                            name="email"
                                                            label="Email"
                                                            helpertext={data.email}
                                                            defaultValue={data.email}
                                                            {...register("email")}
                                                            disabled={readOnly}
                                                      />
                                                      <TextField
                                                            required
                                                            id="outlined-required"
                                                            name="date_of_birth"
                                                            type="date"
                                                            label="Date of Birth"
                                                            defaultValue={data.date_of_birth}
                                                            helpertext={data.date_of_birth}
                                                            InputLabelProps={{ shrink: true }}
                                                            {...register("date_of_birth")}
                                                            disabled={readOnly}
                                                      />
                                                      <Box sx={{ minWidth: 120 }}>
                                                            <FormControl {...register("gender")} fullWidth>
                                                                  <InputLabel id="demo-simple-select-label">
                                                                        Gender
                                                                  </InputLabel>
                                                                  <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        name="gender"
                                                                        defaultValue={data.gender}
                                                                        label="Gender"
                                                                        disabled={readOnly}
                                                                  >
                                                                        <MenuItem value={"M"}>Male</MenuItem>
                                                                        <MenuItem value={"F"}>Female</MenuItem>
                                                                  </Select>
                                                            </FormControl>
                                                      </Box>
                                                      <TextField
                                                            required
                                                            id="outlined-required"
                                                            name="address"
                                                            label="Address"
                                                            helpertext={data.address}
                                                            defaultValue={data.address}
                                                            {...register("address")}
                                                            disabled={readOnly}
                                                      />
                                                      <TextField
                                                            // required
                                                            id="outlined-required"
                                                            name="post_code"
                                                            label="Zip Code"
                                                            helpertext={data.post_code}
                                                            defaultValue={data.post_code}
                                                            {...register("post_code")}
                                                            disabled={readOnly}
                                                      />
                                                      <TextField
                                                            required
                                                            id="outlined-required"
                                                            name="country"
                                                            label="Country"
                                                            defaultValue="Bangladesh"
                                                            {...register("country")}
                                                            disabled={readOnly}
                                                      />
                                                      {data.individual_user ? (
                                                            <TextField
                                                                  // required
                                                                  id="outlined-required"
                                                                  name="nid_number"
                                                                  label="NID"
                                                                  helpertext={data.nid_number}
                                                                  defaultValue={data.nid_number}
                                                                  {...register("nid_number")}
                                                                  disabled={readOnly}
                                                            />
                                                      ) : (
                                                            <TextField
                                                                  required
                                                                  id="outlined-required"
                                                                  name="tin_number"
                                                                  label="Tin Number"
                                                                  helpertext={data.tin_number}
                                                                  defaultValue={data.tin_number}
                                                                  {...register("tin_number")}
                                                                  disabled={readOnly}
                                                            />
                                                      )}
                                                </div>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default MerchantProfileForm;