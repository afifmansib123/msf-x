import React, { useState } from "react";
import MSF from "layouts/MSF.js";

//Edit profile Imports
import makeStyles from '@mui/styles/makeStyles';
import ProfileView from "../../components/ProfileView/ProfileView";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

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
  // console.log(object.keys(localStorage));
  const id = localStorage.getItem("user_id");
  // Switch functionality between Profile and Edit Profile
  const handleEdit = (e) => {
    setEditFlag(e);
  };

  //Profile Functionality here 
  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BG_API}api/user/profile/?user_id=${id}`);
        const res = await response.json();
        setData(res);
        setDate(res.date_of_birth);
        setAlignment(res.individual_user);
        // date=res.date_of_birth;
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  //Need to send the Profile Image and A callback function of handleEdit


  return (
    <>
      {editFlag ? (
        <ProfileForm
          data={data}
          date={date}
          userID={id}
          handleEdit={handleEdit}
        />
      ) : (
        <>
          <ProfileView
            data={data}
          />
         <div className="container">
           <div className="flex justify-end -mx-20 p-5">
           <button className="bg-orange-600 hover:bg-black font-sans font-bold text-white py-5 px-10 rounded-full transition-all" onClick={() => { handleEdit(true) }}>Edit Profile</button>
           </div>
         </div>
        </>
      )}
    </>
  );
}


Profile.layout = MSF;




//Profile view CSS



export default Profile;