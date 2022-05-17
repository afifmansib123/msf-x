import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/nextjs-material-dashboard.js";

const dashboardStyle = {
  successText: {
    color: successColor[0],
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },

  paperTitle: {
    padding: "16px 16px",
    width: "100%",
    margin: "0px auto",
    fontSize: "20px",
    color: "#000000",
    fontWeight: 700,
    // fontFamily: "Open Sans",
    textTransform: "uppercase",
  },
  carPriceText: {
    padding: "0px 16px 5px",
    width: "100%",
    fontSize: "16px",
  },
  ckEditorDiv: {
    marginTop: "-15px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  errorDiv: {
    marginTop: "5px",
    color: "#f06424",
    position: "absolute",
    bottom: "-20px",
  },
};

export default dashboardStyle;
