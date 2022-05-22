import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import Image from "next/image";  // TODO Does not support PNG
// import TopBar from "../components/TopBar/TopBar";
// import sideImage from "../assets/Header/ss.0bdbffc9.png";
import { useRouter } from "next/router";
import React, { forwardRef, useState } from "react";
import Login from "../components/Login/Login";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SiteIndexPage(props) {
  const router = useRouter();
  const { error } = router.query;
  const [open, setOpen] = useState(error);
  const errorDict = {
    SessionRequired: "Please sign in",
  };

  return (
    <div className="">
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorDict[error]}
          </Alert>
        </Snackbar>
      )}

      {/* <Image  className="float-right ..."  src={sideImage}></Image> */}
      {/* <TopBar></TopBar> */}
      <Login />
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default SiteIndexPage;
