/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @mui/icons-material
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import BubbleChart from "@mui/icons-material/BubbleChart";
import LocationOn from "@mui/icons-material/LocationOn";
import Notifications from "@mui/icons-material/Notifications";
import Unarchive from "@mui/icons-material/Unarchive";
import Language from "@mui/icons-material/Language";
import Car from '@mui/icons-material/DirectionsCar';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/msf",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    layout: "/msf",
  },
  {
    path: "/listings",
    name: "Listings",
    icon: "content_paste",
    layout: "/msf",
  },    
  {
    path: "/customers",
    name: "Customers",
    icon: "content_paste",
    layout: "/msf",
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: "content_paste",
    layout: "/msf",
  },  
  {
    path: "/upload",
    name: "Upload",
    icon: Car,

    layout: "/msf",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   layout: "/msf",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   layout: "/msf",
  // },

  {
    path: "/settings",
    name: "Settings",
    icon: Unarchive,

    layout: "/msf",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: Person,

    layout: "/msf",
  },

];

export default dashboardRoutes;
