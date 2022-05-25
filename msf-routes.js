// @mui/icons-material
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import Notifications from "@mui/icons-material/Notifications";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Unarchive from "@mui/icons-material/Unarchive";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Car from "@mui/icons-material/DirectionsCar";
import StorefrontIcon from '@mui/icons-material/Storefront';
import CallIcon from '@mui/icons-material/Call';

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
  {
    path: "/store",
    name: "Store",
    icon: StorefrontIcon,
    layout: "/msf",
  },  
  {
    path: "/contactus",
    name: "Contact Us",
    icon: CallIcon,
    layout: "/msf",
  },  
];

export default dashboardRoutes;
