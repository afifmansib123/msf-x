/**
 * TODO
 * Chayapol 2022-05-20
 * Integrate picture upload logic to the same place in API.
 * Now, we are doing it in here and no fault handling.
 */
import React, { useState } from "react";
import MSF from "layouts/MSF.js";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useS3Upload } from "next-s3-upload";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StorePage(props) {
  let { uploadToS3 } = useS3Upload();
  let { store } = props;
  // const { store, setStore } = useState(defaultStore);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();
  const [readOnly, setReadOnly] = useState(true);
  const [logoUrl, setLogoUrl] = useState(store.logo_url);
  const [backdropUrl, setBackdropUrl] = useState(store.backdrop_url);

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

  return (
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
          <div className="justify-self-end">
            {readOnly && (
              <Button className="bg-bhalogari hover:bg-orange-400 text-white" onClick={() => handleEditMode()}>
                Edit
              </Button>
            )}
            {!readOnly && (
              <>
                <Button className="mr-4  text-black " onClick={() => setReadOnly(true)} variant="outlined">
                  Cancel
                </Button>

                <Button className="bg-[#557755] text-white" type="submit" variant="contained" color="success">
                  Save
                </Button>
              </>
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
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const prisma = new PrismaClient();
  console.debug("\tFinding store with owner ID:", session.token.id);
  // console.log("\tType of", BigInt(session.token.id), typeof BigInt(session.token.id));
  var userStore = await prisma.MerchantStorefront_store.findFirst({
    where: {
      owner_user_id: BigInt(session.token.id),
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
    console.debug(`\tNo store found. Creating a new one for [${session.user.name}]`);

    userStore = await prisma.MerchantStorefront_store.create({
      data: {
        name: session.user.name,
        owner_user_id: session.token.id,
        // created_at: new Date(),
        // updated_at: new Date(),
      },
    });

    userStore = JSON.parse(
      JSON.stringify(userStore, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );
  }

  console.debug("userStore", userStore);

  return {
    props: {
      store: userStore,
    },
  };
}
StorePage.layout = MSF;
StorePage.auth = true;
