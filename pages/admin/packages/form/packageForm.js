/**
 * getServerSideProps and getStaticProps are run only before the page is loaded.
 * So if you wish to data modification, you cannot do it in those functions.
 * Those functions can do data fetching (READ) only.
 *
 * If you wish to do data modification (CREATE, UPDATE, DELETE), do it with an API.
 * In this case, see /pages/api/merchants/[id].js
 * So handle the submit button by calling the API and pass the data for the API to process it.
 */

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";

// layout for this page
import Admin from "layouts/Admin.js";
import PropTypes from "prop-types";
import axios from "axios";

//form
import TextField from "@mui/material/TextField";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

function PackageManagementPage(props) {

  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const {packages} = props;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
    // register(type)
  };

  const unique = [...new Set(packages.map(item => item.package_type))];

  const onSubmit = async (data) => {
    // do something
    // Cannot connect to the database from here. It has to call through an API
    try {
      console.log("yo data", data);
      const apiURL = `${process.env.NEXT_PUBLIC_API}package/package`;
      console.log("API URL", apiURL);

      const ret = await axios.post(apiURL, data);
      console.log("ret ja", ret);
      if (ret.status == 200) {
        alert("Your new Package has been successfully added into the database");
        router.push("/admin/packages");
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
            Add New Package
          </CardHeader>
          <div className="grid grid-cols-1 pl-10 pr-10 gap-4">
            <TextField
              id="outlined-basic"
              label="Package Name"
              variant="outlined"
              {...register("name")}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              {...register("description")}
            />
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Package Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={type}
              label="Package Type"
               onChange={handleChange}
              {...register("type")}
             
            >
              {unique.map(p => {
                  return <MenuItem value={p}>{p}</MenuItem>
                  {/* <MenuItem value={}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                  
              })
              
            }
            </Select>
            </FormControl>
          
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              {...register("price")}
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
              Add Package
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
}

PackageManagementPage.layout = Admin;
export async function getServerSideProps() {
  // const prisma = new PrismaClient();
  var packages = await prisma.MerchantStorefront_package.findMany({
    orderBy: [{ package_type: "desc" }],
  });

  packages = JSON.parse(
    JSON.stringify(packages, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  // console.log("Original", packages[0], perks[0]);
  // console.log("Transformed", packages[0], perks[0]);
  return {
    props: {
      packages: packages,

    },
  };
}
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
