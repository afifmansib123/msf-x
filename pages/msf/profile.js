import React, { useState } from "react";
import MSF from "layouts/MSF.js";
import { useSession } from "next-auth/react";

//Edit profile Imports
import makeStyles from "@mui/styles/makeStyles";
import ProfileView from "../../components/ProfileView/ProfileView";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import axios from "axios";

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

function Profile(props) {
  const classes = useStyles();
  const [date, setDate] = React.useState(new Date());
  const [data, setData] = useState({});
  const [editFlag, setEditFlag] = useState(false);
  const { data: session, status } = useSession();
  console.log("useSession", session);
  const { token } = session;
  const { id } = token;

  console.log("User ID", id);

  // Switch functionality between Profile and Edit Profile
  const handleEdit = (e) => {
    setEditFlag(e);
  };

  //Profile Functionality here
  React.useEffect(async () => {
    try {
      const apiURL = `${process.env.NEXT_PUBLIC_BG_API}user/profile/?user_id=${id}`;
      console.debug("apiURL", apiURL);
      const { data } = await axios.get(apiURL);
      // const res = await response.json();
      console.debug("res", data);
      setData(data);
      setDate(data.date_of_birth);
      setAlignment(data.individual_user);
      // date=res.date_of_birth;
    } catch (err) {
      console.error(err);
    }
  }, [editFlag]);

  //Need to send the Profile Image and A callback function of handleEdit

  return (
    <>
      {editFlag ? (
        <ProfileForm data={data} date={date} userID={id} handleEdit={handleEdit} />
      ) : (
        <>
          <ProfileView data={data} />
          <div className="container">
            <div className="flex justify-end mx-20 p-5">
              <button
                className="bg-orange-600 hover:bg-black font-sans font-bold text-white py-5 px-10 rounded-full transition-all"
                onClick={() => {
                  handleEdit(true);
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  // const { data: session } = useSession();
  // console.log("getServerSideProps", session);
  // const allCars = await prisma.carsApp_car.findMany()
  // return {
  //   props: {
  //     cars: allCars,
  //   },
  // };

  return {
    props: {},
  };
}

Profile.layout = MSF;
Profile.auth = true;

//Profile view CSS

export default Profile;