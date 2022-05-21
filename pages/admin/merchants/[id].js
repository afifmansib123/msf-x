import React from "react";
import { useState, useRef } from "react";
import makeStyles from '@mui/styles/makeStyles';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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
import Stack from '@mui/material/Stack';

function MerchantCardDetail(props) {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelected] = useState(null);
  const [type, setType] = useState("");
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const inputElement = useRef();
  const { data: session, status } = useSession();
  // console.log("useSession", session);
  // const { token } = session;
  // const { id } = token;

  const handleSubmit = () => {
    setOpen(false);
    const reason = inputElement.current.value;
    const data = {
      card: selectedCard,
      reason: reason,
      type: type
    }
    props.callback(data)
    setSelected(null);
    setType("");
  }
  const showedDetail = props.tableData.map((value, index) => {
    if (value.is_paid == true ) return (
      <>
      <div className="flex ml-6">
    <div class="w-48"><img src={value.image_url}></img></div>
    <div className="right ml-10">

    <h3 className="text-xl font-bold mb-2 mt-2">{value.first_name} {value.last_name} ({value.gender}) </h3>
    <h3 className="text-base">Contact: {value.contact_number}</h3>
    <h3 className="text-base ">Email: {value.email}</h3>
    <h3 className="text-base ">Address: {value.address}</h3>
    
    
    <h3 className="text-lg font-medium mt-4">Subscription: </h3>
   



    {value.MerchantStorefront_package.map(i => {
       return (<h3 className="text-base ">{i.package_name} ({i.description})</h3>)
    })}
   <div className="font-bold mt-2 ">
   <Stack direction="row" spacing={1}>
     
      <Chip label="Paid"  color="success" />
    </Stack>
    </div>
    </div>
     </div>
      </>)
    else{
    return <>
    <div className="flex ml-6">
    <div class="w-48"><img src={value.image_url}></img></div>
    <div className="right ml-10">

    <h3 className="text-xl font-bold mb-2 mt-2">{value.first_name} {value.last_name} ({value.gender}) </h3>
    <h3 className="text-base">Contact: {value.contact_number}</h3>
    <h3 className="text-base ">Email: {value.email}</h3>
    <h3 className="text-base ">Address: {value.address}</h3>
    
    
    <h3 className="text-lg font-medium mt-4">Subscription: </h3>
   



    {value.MerchantStorefront_package.map(i => {
       return (<h3 className="text-base ">{i.package_name} ({i.description})</h3>)
    })}
   <div className="font-bold mt-2 ">
   <Stack direction="row" spacing={1}>
     
      <Chip label="Pending"  color="warning" />
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
            {showedDetail}
           
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
  const id = context.params.id;
  const tableData = await getUserDetail(parseInt(id));
  return {
    props: {
      tableData: tableData || null,
    },
  };
}
async function getUserDetail(user_id) {
  const prisma = new PrismaClient();
  const data = await prisma.UsersApp_customuser.findMany({
    where: {
      id: user_id,

    },
    include: {
      MerchantStorefront_package: true,
    
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



