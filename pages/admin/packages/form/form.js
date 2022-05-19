/**
 * getServerSideProps and getStaticProps are run only before the page is loaded.
 * So if you wish to data modification, you cannot do it in those functions.
 * Those functions can do data fetching (READ) only.
 *
 * If you wish to do data modification (CREATE, UPDATE, DELETE), do it with an API.
 * In this case, see /pages/api/merchants/index.js
 * So handle the submit button by calling the API and pass the data for the API to process it.
 */

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

// layout for this page
import Admin from "layouts/Admin.js";
import PropTypes from "prop-types";
import axios from "axios";

//form
import TextField from "@mui/material/TextField";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

function PackageManagementPage(props) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    // do something
    // Cannot connect to the database from here. It has to call through an API
    try {
      console.log("yo data", data);
      const apiURL = `${process.env.NEXT_PUBLIC_API}perk/perk`;
      console.log("API URL", apiURL);

      const ret = await axios.post(apiURL, data);
      console.log("ret ja", ret);
      if (ret.status == 200) {
        alert("Your new feature has been successfully added into the database");
        router.push("/admin/subscriptions/package");
      } else {
        // there's an error
        alert("Error! A problem has been occured while adding your data");
      }
    } catch (err) {
      alert("Error Caught");
      console.error("Error", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="text-4xl font-semibold text-center">
            Add New Feature
          </CardHeader>
          <div className="grid grid-cols-1 pl-4 pr-4 gap-4">
            <TextField
              id="outlined-basic"
              label="Feature Name"
              variant="outlined"
              {...register("perks")}
            />

            <TextField
              id="outlined-basic"
              label="Feature Description"
              variant="outlined"
              {...register("description")}
            />

            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              {...register("amount")}
            />

            <TextField
              id="outlined-basic"
              label="Unit (ex: times, posts"
              variant="outlined"
              {...register("unit")}
            />

            <Button type="submit" sx={{ ml: 40 }} autoFocus color="warning">
              Add Feature
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
}

PackageManagementPage.layout = Admin;
PackageManagementPage.auth = false;

PackageManagementPage.defaultProps = {
  tableHeaderColor: "primary",
  tableHead: ["Feature ID", "Feature Name"],
};

PackageManagementPage.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  callback: PropTypes.func,
};

export default PackageManagementPage;
