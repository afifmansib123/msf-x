// /stories/pages/home.stories.jsx

import CarApproveLog from "../../pages/carapprove";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "/styles/theme/lightTheme";


export default {
  title: "Pages/CarApprove",
  component: CarApproveLog,
};

const Template = (args) => 
<ThemeProvider theme={lightTheme}>
    <CarApproveLog {...args}/>
</ThemeProvider>

export const CarApprove = Template.bind({});
CarApprove.args = {
  tableHead: ["RecordID", "Merchant", "Car Maker", "Car Model", "Preview Image", "", ""],
  tableData: [
    {
      "record_ID": "0",
      "Merchant_Name": "test1",
      "Car_Maker": "Chevrolet", 
      "Car_Model": "chevrolet chevelle malibu", 
      "Preview_Image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/1966_Chevrolet_Chevelle_SS_%2832985111206%29.jpg"
  },
  {
      "record_ID": "1",
      "Merchant_Name": "test2",
      "Car_Maker": "Buick", 
      "Car_Model": "buick skylark 320", 
      "Preview_Image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/1972_Buick_Skylark_Front.jpg"
  },
  {
      "record_ID": "2",
      "Merchant_Name": "test3",
      "Car_Maker": "Chrysler Corporation", 
      "Car_Model": "plymouth satellite", 
      "Preview_Image": "https://upload.wikimedia.org/wikipedia/commons/f/f0/66Sat.jpg"
  }
    ]
};




