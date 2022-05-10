import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LoginForm from "../stories/pages/LoginForm";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Cryptr from "cryptr";

// import { api } from "@configs/configs";
// import BangladeshFlag from "../../assets/bangladesh.svg";
// import BhalogariLogo from "../../assets/BG-logo.png";

import { useSession, signIn, signOut } from "next-auth/react";

function LoginPage(props) {
  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_BG_API_SECRET_KEY);
  const router = useRouter();
  const { data: session } = useSession();
  const [contact_number, setContact_number] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [redirectPass, setRedirectPass] = useState(false);

  const [wrongNumber, setWrongNumber] = useState(false);
  const [example, setExample] = useState(false);
  const [status, setStatus] = useState("not submitted");
  const [notacceptable, setNotacceptable] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    // const number = e.target.value;
    setContact_number(e.target.value);
    // setContact_number(number.slice(-11));
    setWrongNumber(false);
  };

  const handleClick = () => {
    setExample(true);
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    setStatus("loading");
    e.preventDefault();

    if (
      contact_number.toString().length == 11 ||
      contact_number.toString().length == 14 ||
      contact_number.toString().includes("@")
    ) {
      const contact_no = contact_number.slice(-11);
      let isnum = /^\d+$/.test(contact_no);

      if (isnum && contact_no.startsWith("01")) {
        setContact_number(contact_no);
        // console.log(contact_no)
      } else if (contact_number.toString().includes("@")) {
        setContact_number(contact_number);
        // console.log(contact_number)
      } else {
        setWrongNumber(true);
        setStatus("not loading");
        return;
      }

      // We expect the user to already have the username/password
      // TODO handle registration here
      // TODO change the API endpoint to ENV VAR
      await axios
        .post("https://backend.bhalogari.com/api/user/verify-password/", {
          contact_number: contact_number,
          password: user_pass,
          // user_email: user_mail1,
        })
        .then((res) => {
          console.log("Success Loading",res);
          if (res.status === 200) { // TODO need to change 200 code?
            setStatus("password matched");
            const encryptedToken = cryptr.encrypt(res.data.token.access);
            window.localStorage.setItem("access_token", encryptedToken);
            window.localStorage.setItem("user_id", res.data.user_id);
            window.localStorage.setItem("update", 1);

            if (res.data.user === "existing user") {
              setRedirectToProfileView(true);
              window.localStorage.setItem("logged", 1);
              router.push(`/merchant/${res.data.user_id}`);
            }
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status === 406) {
            setNotacceptable("Enter contact number for signup");
            setStatus("not loading");
          }
        });
    } else {
      setWrongNumber(true);
    }
  };

  const handleSignIn = (data) => {
    const { username, password } = data;
    console.log("handleSignIn", data);

  };

  useEffect(() => {
    if (window.localStorage.getItem("access_token") !== null) {
      if (props.location.state) {
        if (props.location.state.from === "login") {
          // return <Redirect to={{ pathname: "/profile-view" }} />;
          return "Redirect /profile-view";
        }
      }
    }

    if (redirect) {
      window.localStorage.setItem("contact_number", contact_number);
      window.localStorage.setItem("forget_pass", "no");
      // return <Redirect to={{ pathname: "/otp_verification" }} />;
      return "Redirect /otp_verification";
    } else if (redirectPass) {
      window.localStorage.setItem("contact_number", contact_number);
      // return <Redirect to={{ pathname: "/password" }} />;
      return "Redirect /password";
    }
  }, []);

  if (session) {
    console.log("Signed in", session);
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <div className="">
      <Head>
        <meta name="keywords" content="Sell Used Car" />
        <meta name="description" content="Sell used car at a good price" />
      </Head>
      <LoginForm onSignIn={handleSignIn} />
      <div className="">
        {/* <img src={BhalogariLogo} className="" alt="Sell Used Car" /> */}
        <form className="" onSubmit={handleSubmit}>
          {/* <PhoneInput
            country={"us"}
            value={this.state.phone}
            onChange={(phone) => this.setState({ phone })}
          /> */}
          <TextField
            required
            id="outlined"
            label="Enter Your Mobile Number or Email"
            type="text"
            color="secondary"
            // defaultValue={+88}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <img src={BangladeshFlag} className="" alt="Email" /> */}
                  <p style={{ fontSize: "18px", paddingLeft: "5px" }}></p>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: "0.97rem" },
            }}
            variant="outlined"
            className=""
            onChange={handleChange}
            onClick={handleClick}
          />
          {notacceptable && <p className="">Enter contact number for signup</p>}
          {example && <p className="">e.g: +8801700702641 / someone@example.com</p>}
          <p className="conditionText">
            *Mobile is required for Registration and Mobile/Email for Login
            {/* *By tapping Login/Registration, an SMS will be sent. Message and
            data rates may apply. */}
          </p>
          {wrongNumber && <p className="">Invalid Contact Number or Email</p>}

          <button type="submit" className="">
            {status === "loading" && <CircularProgress color="primary" size={30} sx={{ margin: "5px 0px" }} />}
            {status !== "loading" && <p>Login / Registration</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
