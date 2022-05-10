import React from "react";
import makeStyles from "@mui/styles/makeStyles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function PackageManagement(props) {
  const { packages } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.debug("handleChange[newValue]", newValue);
    setValue(newValue);
  };

  return (
    <>
      <h1 className="text-4xl">Package Management</h1>
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 224 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {packages.map((p, i) => {
            return <Tab label={p.name} {...a11yProps(p.id)} />;
          })}
        </Tabs>

        {packages.map((p, i) => {
          const { id, name, perks} = p;
          return (
            <TabPanel value={value} index={i}>
              <table>
                <tbody>
              {perks.map((perk,index) => {
                return <tr>
                  <td>{perk.id}</td>
                  <td>{perk.name}</td>
                  <td>{perk.amount}</td>
                </tr>
              })}
              </tbody>
              </table>
            </TabPanel>
          );
        })}
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </Box>
    </>
  );
}

PackageManagement.layout = Admin;

export async function getServerSideProps() {
  const dummyData = [
    {
      id: 1,
      name: "Silver",
      perks: [
        { id: 1, name: "free carwashes", amount: 10 },
        { id: 2, name: "free car inspections", amount: 10 },
      ],
    },
    {
      id: 1,
      name: "Gold",
      perks: [
        { id: 1, name: "free carwashes", amount: 20 },
        { id: 2, name: "free car inspections", amount: 20 },
        { id: 3, name: "car ads per month", amount: 70 },
      ],
    },
    {
      id: 1,
      name: "Diamond",
      perks: [
        { id: 1, name: "free carwashes", amount: 20 },
        { id: 2, name: "free car inspections", amount: 20 },
        { id: 3, name: "car ads per month", amount: 100 },
        { id: 4, name: "ads renewal fee", amount: 500 },
      ],
    },
  ];

  return {
    props: { packages: dummyData },
  };
}

export default PackageManagement;
