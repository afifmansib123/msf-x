// /stories/pages/home.stories.jsx

import Sample from "../../pages/admin/sample.js";
import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "/styles/theme/lightTheme";

export default {
  title: "Pages/Sample",
  component: Sample,
};

export const HomePage = () =>
  <ThemeProvider theme={lightTheme}>
    <Sample />
  </ThemeProvider>
