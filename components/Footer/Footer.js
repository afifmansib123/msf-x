/*eslint-disable*/
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="https://bhalogari.com" target="_blank" className={classes.a}>
              Bhalogari
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
