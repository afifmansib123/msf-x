/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import makeStyles from "@mui/styles/makeStyles";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import Dashboard from "@mui/icons-material/Dashboard";
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "assets/jss/nextjs-material-dashboard/components/sidebarStyle.js";
import { signOut } from "next-auth/react"

export default function Sidebar(props) {
  // used for checking current route
  const router = useRouter();
  // creates styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.route.indexOf(routeName) > -1 ? true : false;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var settings = " ";
        var listItemClasses;
        if (prop.path === "/settings") {
          settings = classes.settings + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true,
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path),
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path) || prop.path === "/upgrade-to-pro",
        });
        return (
          <Link href={prop.layout + prop.path} key={key}>
            <a className={settings + classes.item}>
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </a>
          </Link>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="/admin/dashboard"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      {/* Draw in mobile */}
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}

              <a className={classes.settings +" "+ classes.item}>
              <ListItem button className={classes.itemLink + " white"} onClick={()=>handleSignOut()}>
                  <LogoutIcon className={classNames(classes.itemIcon, classes.whiteFont)} />
                  <ListItemText
                    primary={"Sign Out"}
                    className={classNames(classes.itemText, classes.whiteFont)}
                    disableTypography={true}
                  />
                </ListItem>
              </a>

          </div>          
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }} />
          ) : null}
          
        </Drawer>
      </Hidden>

      <Hidden mdDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}


              <a className={classes.settings +" "+ classes.item}>
              <ListItem button className={classes.itemLink + " white"} onClick={()=>handleSignOut()}>
                  <LogoutIcon className={classNames(classes.itemIcon, classes.whiteFont)} />
                  <ListItemText
                    primary={"Sign Out"}
                    className={classNames(classes.itemText, classes.whiteFont)}
                    disableTypography={true}
                  />
                </ListItem>
              </a>

          </div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }} />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}


export async function getServerSideProps(context) {
  // const session = await getSession(context);
  // console.log("AdminSidebar.session",session)

  return {
    // redirect: {
    //   permanent: false,
    //   destination: "/login",
    // },
    props:{},
  };
}


Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["white", "purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};

Sidebar.defaultProps = {
  rtlActive: false,
};
