import React from "react";
import { useState, useRef} from "react";
import makeStyles from '@mui/styles/makeStyles';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { useRouter } from "next/router";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import PropTypes from 'prop-types';
import Admin from "layouts/Admin.js";
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import IconButton from '@mui/material/IconButton';
import Image from 'next/image'
import { prisma } from "@prisma/client";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack'
import { useForm } from "react-hook-form";
import { useS3Upload } from "next-s3-upload";
import axios from "axios";
import TextField from "@mui/material/TextField";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import { Router } from "next/router";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
;
function MerchantCardDetail(props) {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelected] = useState(null);
  const [type, setType] = useState("");
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const inputElement = useRef();
  const {packages,store,tableData} = props;
  const [date, setDate] = React.useState(new Date());
  const [data, setData] = useState({});
  const [editFlag, setEditFlag] = useState(false);
  const [showList, setshowList] = useState([]);
  let { uploadToS3 } = useS3Upload();
  // let { store } = props;
  // const { store, setStore } = useState(defaultStore);
  // const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const [readOnly, setReadOnly] = useState(true);
  const [logoUrl, setLogoUrl] = useState(store.logo_url);
  const [backdropUrl, setBackdropUrl] = useState(store.backdrop_url);
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log("useSession", session);
  // const { token } = session;
  // const { id } = token;
  // const handleSubmit = () => {
  //   setOpen(false);
  //   const reason = inputElement.current.value;
  //   const data = {
  //     card: selectedCard,
  //     reason: reason,
  //     type: type
  //   }
  //   props.callback(data)
  //   setSelected(null);
  //   setType("");
  // }
  const handleEdit = (e) => {
    setEditFlag(e);
  };
  //Profile Functionality here
  const handleEditMode = () => {
    setReadOnly(false);
  };
  const onSubmitUpdate = async (data) => {
    console.log(data);
    // Use PUT to update non-image data
    let updatedStore = await axios.put(`/api/store/${store.id}`, data);
    console.debug("Updated", updatedStore);
    if (updatedStore.status == 200) {
      setMessage("Update Successful");
      setOpen(true);
    }
    setReadOnly(true);
  };
  let handleLogoChange = async (e) => {
    let file = e.target.files[0];
    console.log("file", file);
    let { url } = await uploadToS3(file, {
      endpoint: {
        request: {
          body: {
            path: `store/${store.id}/logo`, // Path without leading and trailing slashes
          },
        },
      },
    });
    console.log("S3 url", url);
    // Update store.logo_url
    let patchedStore = await axios.patch(`/api/store/${store.id}`, {
      logo_url: url,
      backdrop_url: backdropUrl,
    });
    // setStore(patchedStore);
    setLogoUrl(url);
  };
  let handleBackdropChange = async (e) => {
    // console.log(file);
    let file = e.target.files[0];
    let { url } = await uploadToS3(file, {
      endpoint: {
        request: {
          body: {
            path: `store/${store.id}/backdrop`, // Path without leading and trailing slashes
          },
        },
      },
    });
    console.log("S3 url", url);
    // Update store.backdrop_url
    let patchedStore = await axios.patch(`/api/store/${store.id}`, {
      id: store.id,
      logo_url: logoUrl,
      backdrop_url: url,
    });
    // setStore(patchedStore);
    setBackdropUrl(url);
  };
  const showedDetail = props.tableData.map((value, index) => {
    React.useEffect(async () => {
      try {
        const apiURL = `${process.env.NEXT_PUBLIC_BG_API}user/profile/?user_id=${value.id}`;
        // console.debug("apiURL", apiURL);
        const { data } = await axios.get(apiURL);
        // const res = await response.json();
        // console.debug("res", data);
        setData(data);
        setDate(data.date_of_birth);
        // setAlignment(data.individual_user);
        // date=res.date_of_birth;
      } catch (err) {
        console.error(err);
      }
    }, [editFlag]);
    if (value.is_paid == true){ return (
      <>
        <div className="flex ml-6">
          <div class="w-48"><img src={value.image_url}></img></div>
          <div className="right ml-10">
            <h3 className="text-xl font-bold mb-2 mt-2">{value.first_name} {value.last_name} ({value.gender}) </h3>
            <h3 className="text-base">Contact: {value.contact_number}</h3>
            <h3 className="text-base ">Email: {value.email}</h3>
            <h3 className="text-base ">Address: {value.address}</h3>
            <h3 className="text-lg font-medium mt-4">Subscription: </h3>
            {packages.map(i => {
              return (<h3 className="text-base ">{i.package_name} ({i.description})</h3>)
            })}
            <div className="font-bold mt-2 ">
              <Stack direction="row" spacing={1}>
                <Chip label="Paid" color="success" />
              </Stack>
            </div>
          </div>
        </div>
      </>)
  }  else {
      return <>
        <div className="flex ml-6">
          <div class="w-48"><img src={value.image_url}></img></div>
          <div className="right ml-10">
            <h3 className="text-xl font-bold mb-2 mt-2">{value.first_name} {value.last_name} ({value.gender}) </h3>
            <h3 className="text-base">Contact: {value.contact_number}</h3>
            <h3 className="text-base ">Email: {value.email}</h3>
            <h3 className="text-base ">Address: {value.address}</h3>
            <div className="flex font-bold mt-2 ">
              <h2 className="my-0 font-sans text-lg from-neutral-500 font-semibold p-0 m-0 mb-4 mr-2">
                Profile Type:
              </h2>
              <Stack direction="row" spacing={1}>
                <Chip label={value.individual_user ? "Individual" : "Business"} color="warning" />
              </Stack>
            </div>
          </div>
        </div>
      </>
    }
  });
  return (
    <>
      <GridItem xs={12} sm={12} md={6}>
        <Card >
          <CardHeader color={"bhalogari"} className={"m-3"}>
            <h1 className="text-left text-xl font-semibold">Merchant Details</h1>
            {/* <p className={classes.cardCategoryWhite}>
              Change the remaining usage of a card
            </p> */}
          </CardHeader>
          <CardBody>
            {editFlag ? (
              props.tableData.map((v,i)=>{
                function parse(text) {
                  return JSON.parse(text, (_, value) => {
                      if (typeof value === 'string') {
                          const m = value.match(/(-?\d+)n/);
                          if (m && m[0] === value) {
                              value = BigInt(m[1]);
                          }
                      }
                      return value;
                  });
              }
                var id = parse(v.id)
              return(  <ProfileForm data={data} date={date} userId={id} />
              )
              })
      ) : (
        <>
        <div className="container">
            <div className="grid justify-items-end">
              <button
                className="bg-orange-600 hover:bg-black font-sans font-bold text-white py-2 px-5 rounded-full transition-all"
                onClick={() => {
                  handleEdit(true);
                }}
              >
                Edit Profile
              </button>
              </div>
          </div>
          {/* <ProfileView data={data} /> */}
          {showedDetail}
        </>
      )}
          </CardBody>
        </Card>
        <Card >
          <CardHeader color={"bhalogari"} className={"m-3"}>
            <h1 className="text-left text-xl font-semibold">Merchant Store</h1>
            {/* <p className={classes.cardCategoryWhite}>
              Change the remaining usage of a card
            </p> */}
          </CardHeader>
          <CardBody>
            <div>
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
              <form onSubmit={handleSubmit(onSubmitUpdate)}>
                <div className="grid grid-cols-2">
                  <h1 className="text-2xl font-bold">Store Management: {store.name}</h1>
                  <div>
                    {readOnly && (
                      <Button className="bg-bhalogari text-white" onClick={() => handleEditMode()}>
                        Edit
                      </Button>
                    )}
                    {!readOnly && (
                      <Button className="bg-[#557755] text-white" type="submit" variant="contained" color="success">
                        Save
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-4 p-4 grid gap-4 grid-cols-3 bg-white">
                  <TextField
                    className="col-span-2"
                    required
                    label="Name"
                    defaultValue={store.name}
                    {...register("name")}
                    InputProps={{
                      readOnly: readOnly,
                    }}
                  />
                  <TextField
                    required
                    label="Phone"
                    defaultValue={store.phone}
                    {...register("phone")}
                    InputProps={{
                      readOnly: readOnly,
                    }}
                  />
                  <TextField
                    required
                    multiline
                    rows={4}
                    label="Description"
                    defaultValue={store.description}
                    {...register("description")}
                    InputProps={{
                      readOnly: readOnly,
                    }}
                  />
                  <TextField
                    required
                    multiline
                    rows={4}
                    label="About Us"
                    defaultValue={store.aboutus}
                    {...register("aboutus")}
                    InputProps={{
                      readOnly: readOnly,
                    }}
                  />
                  <TextField
                    required
                    multiline
                    rows={4}
                    label="Address"
                    defaultValue={store.address}
                    {...register("address")}
                    InputProps={{
                      readOnly: readOnly,
                    }}
                  />
                </div>
              </form>
              <div>
                <h2 className="mt-4 text-xl font-bold">Store Logo and Backdrop</h2>
                <div className="mt-4 p-4 grid gap-4 grid-cols-2 bg-white">
                  <div>
                    {/* <FileInput onChange={handleLogoChange} /> */}
                    <Button variant="contained" component="label">
                      Upload Logo
                      <input type="file" hidden onChange={handleLogoChange} />
                    </Button>
                  </div>
                  <div>
                    {/* <FileInput onChange={handleBackdropChange} /> */}
                    <Button variant="contained" component="label">
                      Upload Backdrop
                      <input type="file" hidden onChange={handleBackdropChange} />
                    </Button>
                  </div>
                  <img src={logoUrl} />
                  <img src={backdropUrl} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          {/*<FormControl>
          <InputLabel htmlFor="uses-input">Remaining uses:</InputLabel>
            <Input id="uses-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">Type here to update remaining uses.</FormHelperText>
            <IconButton aria-label="update"><EditIcon /></IconButton>
        </FormControl>*/}
        </GridItem>
      </GridContainer>
    </>
  );
      }
export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const id = context.params.id;
  const tableData = await getUserDetail(parseInt(id));
  var packages = await prisma.MerchantStorefront_package.findMany({
  })
  var userStore = await prisma.MerchantStorefront_store.findFirst({
    where: {
      owner_user_id: BigInt(id),
    },
  });
  userStore = JSON.parse(
    JSON.stringify(userStore, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  // console.log("userStore", userStore);
  // console.log("\tObject Check:", userStore && Object.keys(userStore).length);
  if (!userStore) {
    // if (Object.keys(userStore).length === 0) {
    // check whether the store is empty, {}
    // No store found, create new one
    // console.debug(`\tNo store found. Creating a new one for [${session.user.name}]`);
    userStore = await prisma.MerchantStorefront_store.create({
      data: {
        owner_user_id:  BigInt(id),
        // created_at: new Date(),
        // updated_at: new Date(),
      },
    });
    userStore = JSON.parse(
      JSON.stringify(userStore, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );
   }
  packages = JSON.parse(
    JSON.stringify(packages, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  return {
    props: {
      tableData: tableData || null,
      packages: packages,
      store: userStore,
    }
  }
}
async function getUserDetail(user_id) {
  const prisma = new PrismaClient();
  const data = await prisma.UsersApp_customuser.findMany({
    where: {
      id: BigInt(user_id) || null,
    },
    include: {
      MerchantStorefront_paymenthistory: true,
    },
  }).catch((err) => {
    throw new Error(err);
  });
  const parsedData = JSON.parse(
    JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );
  return parsedData;
}
MerchantCardDetail.layout = Admin;
export default MerchantCardDetail;