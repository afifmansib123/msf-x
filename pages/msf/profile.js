import React, { useState } from "react";
import MSF from "layouts/MSF.js";
import { useSession } from "next-auth/react";

//Edit profile Imports
import makeStyles from "@mui/styles/makeStyles";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

//Edit Profile styles
const useStyles = makeStyles((theme) => ({
  formGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: "20px",
    "& > div": {
      width: "calc(50% - 10px)",
      "@media (max-width: 767px)": {
        width: "100%",
      },
    },
    "& .MuiFormHelperText-root.Mui-error": {
      position: "absolute",
      bottom: "-15px",
      left: "0",
      marginLeft: "0",
    },
  },

  formItem: {
    width: "calc(50% - 5px)",
    marginBottom: "15px",
  },
}));

function ProfilePage(props) {
  const { user } = props
  const classes = useStyles();
  const [date, setDate] = React.useState(user.date_of_birth.slice(0, 10));
  const [data, setData] = useState({});
  const [editFlag, setEditFlag] = useState(false);
  const { data: session, status } = useSession();
  // console.log("useSession", session);
  const { token } = session;
  const { id } = token;

  
  // setDate(user.date_of_birth);
  // console.log("User ID", id);

  // Switch functionality between Profile and Edit Profil

  //Profile Functionality here
  // React.useEffect(async () => {
  //   try {
  //     // const apiURL = `${process.env.NEXT_PUBLIC_BG_API}user/profile/?user_id=${id}`;
  //     // console.debug("apiURL", apiURL);
  //     // const { data } = await axios.get(apiURL);
  //     // const res = await response.json();
  //     // console.debug("res", data);
  //     setData(user);
  //     setDate(user.date_of_birth);
  //     // setAlignment(data.individual_user);
  //     // date=res.date_of_birth;
  //   } catch (err) {
  //     // console.error(err);
  //   }
  // }, [editFlag]);

  //Need to send the Profile Image and A callback function of handleEdit

  return (
    <>
      <ProfileForm data={user} date={date} userId={id} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log("session",session)
  // const userId = session.token.id

  const prisma = new PrismaClient();
  var userInfo = await prisma.UsersApp_customuser.findUnique({
    where: {
      id: BigInt(session?.token.id),
    },
  });

  userInfo = JSON.parse(
    JSON.stringify(userInfo, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  console.debug(userInfo)

  // console.log("getServerSideProps", session);
  // const allCars = await prisma.carsApp_car.findMany()
  // return {
  //   props: {
  //     cars: allCars,
  //   },
  // };

  return {
    props: {
      user: userInfo
    },
  };
}

ProfilePage.layout = MSF;
ProfilePage.auth = true;

//Profile view CSS

export default ProfilePage;