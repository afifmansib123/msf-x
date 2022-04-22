import makeStyles from "@mui/styles/makeStyles";
// @mui/icons-material
import BugReport from "@mui/icons-material/BugReport";
import Code from "@mui/icons-material/Code";
import Cloud from "@mui/icons-material/Cloud";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { bugs, website, server } from "variables/general.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Sample() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { username, password }= data;
    alert(`Username: ${username}\nPassword: ${password}`)
  };
  console.debug(watch("username"), watch("password"));

  return (
      <Box className="border-2 border-black content-center m-4 flex items-center gap-2" component="form" noValidate autoComplete="off">
      <h4 className="text-2xl font-bold text-blue">MUI Form with React-Hook-Form</h4>
        <div>
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Username"
            variant="standard"
            {...register("username")}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            {...register("password", { required: true })}
          />
        </div>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Sign In
        </Button>
        <Button variant="outline">Sign Up</Button>
      </Box>
  );
}

Sample.layout = Admin;

export default Sample;
