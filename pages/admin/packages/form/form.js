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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function PackageManagementPage(props) {
  const router = useRouter();
  const [type, setType] = useState("");
  const [pType, setPType] = useState("");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      test: [{ name: pType, type: type }]
    }
  });
  const [data, setData] = useState("");

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { packages } = props;
  const [packageList, setPackageList] = useState(packages);
  const [datas, setDatas] = useState([]);


  const handleChange = (event) => {
    setType(event.target.value);
    { register("type") }
    // register(type)
  };

  const handleChangeT = (event) => {
    setPType(event.target.value);
    { register("name") }
  };

  const unique = [...new Set(packageList.map((item) => item.package_type))];
  const unique1 = [...new Set(packageList.map((item) => item.package_name))];

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
  var k = 2;
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

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Package Type
              </InputLabel>

              <>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="type"
                  label="Package Type"
                  // value={type}
                  {...register("type")}
                  onChange={handleChange}
                >
                  {unique.map((k) => {
                    return <MenuItem value={k}>{k}</MenuItem>;
                  })}
                  {console.log("type", type)}
                </Select>
              </>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Package Name
              </InputLabel>

              <>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // name="package_id_id"

                  label="Package Name"
                  // value={pType}
                  {...register("name")}
                  onChange={handleChangeT}

                // {...register("package_id_id")}
                >
                  {/* {unique.map(t => {
                                    
                                  })} */}
                  {packageList.map((k, index) => {
                    if (type == "") {
                      // packageId = k.id

                      return (
                        <MenuItem value={index + 1}>
                          {k.package_name}
                        </MenuItem>
                      );
                    }
                    if (type == k.package_type && type != "") {
                      // packageId = name

                      return (
                        <MenuItem value={index + 1}>
                          {k.package_name}
                        </MenuItem>
                      );
                    }

                   
                  })}
                </Select>
             
               
              </>
            </FormControl>

          

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

export async function getServerSideProps() {
  // const prisma = new PrismaClient();
  var packages = await prisma.MerchantStorefront_package.findMany({
    orderBy: [{ id: "asc" }],
  });

  packages = JSON.parse(
    JSON.stringify(packages, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  return {
    props: {
      packages: packages,
    },
  };
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
