import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from 'next/image';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import proImage from "../../assets/img/profile/add-picture.svg";
import axios from "axios";
import Cryptr from "cryptr";

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


const ProfileForm = ({ data, date, userID }) => {
  const classes = useStyles();
  const access_token = localStorage.getItem("access_token");
  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_BG_API_SECRET_KEY);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userData) => {
    console.log(userData);;
    const token = cryptr.decrypt(access_token);

    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_API}user/profile/update/${userID}/`, userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data"
          },
        })
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <div className={classes.rootBox}>
      <div className={classes.cardBox}>
        <div>
          <Typography component="h1">Create your account</Typography>
          <div className={classes.box}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div className={classes.profileImage}>
                <label for="file-input">
                  <Image
                    src={proImage}
                    alt="Profile"
                    className={classes.image}
                  // src={image ? image : proImage}
                  />
                </label>
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  name="image"
                  {...register("image")}
                // onChange={handleImage}
                // ref={inputFile}
                // accept="image/*"
                />
              </div> */}
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
                  type="number"
                  label="Your Mobile Number"
                  defaultValue={parseInt(data.contact_number)}
                  helpertext={data.contact_number}
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
                  required
                  id="outlined-required"
                  name="post_code"
                  label="Zip Code"
                  helpertext={data.post_code}
                  defaultValue={data.post_code}
                  {...register("post_code")}
                />
                {/* use autocomplete here for all the districts */}
                <TextField
                  required
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
                    required
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