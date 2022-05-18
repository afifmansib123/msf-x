import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import makeStyles from "@mui/styles/makeStyles";
// layout for this page
import MSF from "layouts/MSF.js";
import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";
// import { useSession } from "next-auth/client";
import {useSession} from "next-auth/react";
import axios from "axios";
import UploadedCarsList from "../../components/UploadedCarsList/UploadedCarsList";

export default function listing() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [items, setItems] = useState([]);

  const {data: session, status} = useSession()
  console.log("Session Status", status);
  // console.log(session.user);
  const id = session.token.id;
  React.useEffect(async () => {
    try {
      const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_BG_API}cars/user-car-list/${id}/`
      );
      console.log(data);
      setItems(data.results)
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <div
        className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 justify-center items-center rounded-lg border bg-white sm:p-8 p-2 sm:mx-32 lg:mx-0 md:mx-4 mt lg:space-x-1 gap-5 ">
        {items.map((data) => (
          <UploadedCarsList key={data.car_id} data={data}></UploadedCarsList>
        ))}
      </div>
    </div>
  );
}

listing.layout = MSF;
listing.auth = true;
