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
import ApprovalIcon from '@mui/icons-material/Approval';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import InventoryIcon from '@mui/icons-material/Inventory';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/approval",
    name: "Approval",
    rtlName: "",
    icon: ApprovalIcon,

    layout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,

  //   layout: "/admin",
  // },
  {
    path: "/listings",
    name: "Listings",
    icon: FormatListBulletedIcon,
    layout: "/admin",
  },    
  {
    path: "/merchants",
    name: "Merchants",
    rtlName: "",
    icon: StorefrontIcon,

    layout: "/admin",
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: CardMembershipIcon,
    layout: "/admin",
  },

  {
    path: "/package",
    name: "Package",
    icon: InventoryIcon,
    layout: "/admin",
  },  
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,

  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,

  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,

  //   layout: "/admin",
  // },

  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,

  //   layout: "/rtl",
  // },

  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: Unarchive,
  //   layout: "/admin",
  // },

  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: Person,
  //   layout: "/admin",
  // },

];

export default dashboardRoutes;
