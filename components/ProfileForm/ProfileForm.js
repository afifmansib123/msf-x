import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Image from 'next/image';
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
            marginTop: "15px",
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
            "@media(max-width: 767px)": {
                  marginRight: "-82px",
                  marginTop: "20px",
            },
      },
      image: {
            minWidth: "180px",
            height: "auto",
      },
}));


const ProfileForm = ({ data, date, userID, handleEdit }) => {
      const classes = useStyles();
      const { register, handleSubmit } = useForm();
      const { data: session, status } = useSession();
      const [img, setImg] = useState();
      const [userimg, setUserimg] = useState(proImage);
      const [errorText, setErrorText] = useState("");
      let okay = false;


      const handleImage = e => {
            setImg(e.target.files[0]);
            setUserimg(URL.createObjectURL(e.target.files[0]));
      }
      const onSubmit = async (userData) => {
            let formData = new FormData();

            var regex = /(^(\+8801|01))?[3-9]{1}(\d){8}/;

            if (regex.test(userData.contact_number) && (userData.contact_number.length == 11 || userData.contact_number.length == 14)) {

                  formData.append("contact_number", userData.contact_number);
                  setErrorText("");
                  okay = true;
            } else {
                  setErrorText("Phone number not valid");
                  okay = false;
            }

            // console.log("I am being triggered", okay);
            if (okay == true) {
                  formData.append("image", img);
                  formData.append("first_name", userData.first_name);
                  formData.append("last_name", userData.last_name);
                  formData.append("email", userData.email);
                  formData.append("date_of_birth", userData.date_of_birth);
                  formData.append("gender", userData.gender);
                  formData.append("post_code", userData.post_code);
                  formData.append("user_district", userData.user_district);
                  formData.append("nid_number", userData.nid_number);
                  formData.append("country", userData.country);
                  formData.append("tin_number", userData.tin_number);
                  formData.append("address", userData.address);

                  const token = session.accessToken;
                  try {
                        const response = await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_API}api/user/profile/update/${userID}/`, formData,
                              {
                                    headers: {
                                          Authorization: `Bearer ${token}`,
                                          "Content-Type": "multipart/form-data"
                                    },
                              })
                        if (response.status == '200') {
                              alert("Profile Updated");
                              handleEdit(false);
                        }
                  } catch (error) {
                        console.log(error);
                  }
            }


      };
      return (
            <div className={classes.rootBox}>
                  <div className={classes.cardBox}>
                        <div>
                              <Typography component="h1">Create your account</Typography>
                              <div className={classes.box}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                          <div className={classes.profileImage}>
                                                <label for="file-input">
                                                      <img
                                                            layout='fill'
                                                            src={data.image ? data.image : userimg}
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
                                                />
                                                <TextField
                                                      required
                                                      id="outlined-required"
                                                      name="last_name"
                                                      label="Last Name"
                                                      defaultValue={data.last_name}
                                                      helpertext={data.last_name}
                                                      {...register("last_name")}
                                                />
                                                <TextField
                                                      required
                                                      id="outlined-required"
                                                      name="contact_number"
                                                      type="text"
                                                      label="Your Mobile Number"
                                                      defaultValue={data.contact_number}
                                                      helpertext={data.contact_number}
                                                      error={errorText}
                                                      {...register("contact_number")}
                                                />
                                                <TextField
                                                      required
                                                      id="outlined-required"
                                                      name="email"
                                                      label="Email"
                                                      helpertext={data.email}
                                                      defaultValue={data.email}
                                                      {...register("email")}
                                                />
                                                <TextField
                                                      required
                                                      id="outlined-required"
                                                      name="date_of_birth"
                                                      type="date"
                                                      defaultValue={date}
                                                      label="Date of Birth"
                                                      helpertext={data.date_of_birth}
                                                      {...register("date_of_birth")}
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
                                                />
                                                <TextField
                                                      // required
                                                      id="outlined-required"
                                                      name="post_code"
                                                      label="Zip Code"
                                                      helpertext={data.post_code}
                                                      defaultValue={data.post_code}
                                                      {...register("post_code")}
                                                />
                                                {/* use autocomplete here for all the districts */}
                                                <TextField
                                                      // required
                                                      id="outlined-required"
                                                      name="user_district"
                                                      label="Area"
                                                      helpertext={data.user_district}
                                                      defaultValue={data.user_district}
                                                      {...register("user_district")}
                                                />
                                                <TextField
                                                      required
                                                      id="outlined-required"
                                                      name="country"
                                                      label="Country"
                                                      defaultValue="Bangladesh"
                                                      {...register("country")}
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
                                                      />
                                                )}
                                                <button
                                                      className="bg-orange-600 hover:bg-black font-sans font-bold text-white py-5 px-10 rounded-full transition-all"
                                                      type="submit"
                                                >
                                                      Update Information
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ProfileForm;