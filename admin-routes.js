
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
import DiscountIcon from '@mui/icons-material/Discount';

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
    path: "/packages",
    name: "Packages / Subscriptions",
    icon: CardMembershipIcon,
    layout: "/admin",
  },

  {
    path: "/promotion",
    name: "Promotions",
    icon: DiscountIcon,
    layout: "/admin",
  },

  {
    path: "/verify",
    name: "Manage Gift Card",
    icon: "content_paste",
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
