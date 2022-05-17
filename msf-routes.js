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
import Notifications from "@mui/icons-material/Notifications";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Unarchive from "@mui/icons-material/Unarchive";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Car from "@mui/icons-material/DirectionsCar";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/msf",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   layout: "/msf",
  // },
  // {
  //   path: "/listings",
  //   name: "Listings",
  //   icon: "content_paste",
  //   layout: "/msf",
  // },

  {
    path: "/listing",
    name: "Listing",
    icon: Car,

    layout: "/msf",
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: SubscriptionsIcon,
    layout: "/msf",
  },
  {
    path: "/giftcard",
    name: "GiftCard",
    icon: CardGiftcardIcon,
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

  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: Unarchive,

  //   layout: "/msf",
  // },
  
  {
    path: "/profile",
    name: "User Profile",
    icon: Person,

    layout: "/msf",
  },
];

export default dashboardRoutes;
