/*eslint-disable*/
import React from "react";
import { useRouter } from "next/router";
import makeStyles from "@mui/styles/makeStyles";
// layout for this page
import MSF from "layouts/MSF.js";
import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";
// import { useSession } from "next-auth/client";
import { useSession,signOut } from "next-auth/react";
import AccessDenied from "components/accessDenied";
import { Button } from "@mui/material";

function Storefront() {
  const { data: session, status } = useSession();
  // const useStyles = makeStyles(styles);
  // const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  // When rendering client side don't display anything until loading is complete
  console.log("Session Status", status);
  // if (typeof window !== "undefined" && status) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  // If session exists, display content
  console.log("MSF HomePage", session);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }
  return (
    <div>
      <h1>Merchant ID: {id}</h1>
      <h1>Welcome {session.user.name}</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}

Storefront.layout = MSF;
Storefront.auth = true;
export default Storefront;
