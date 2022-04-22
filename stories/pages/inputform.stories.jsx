/**
 * This is a sample of MUI + React Hook Form
 * We will mainly work on small devices for MSF, so this viewport is set to small devinces
 * See [react-hook-form](https://react-hook-form.com/get-started)
 */

import Sample from "./inputform.js";
import { ThemeProvider } from "@mui/material";
import lightTheme from "styles/theme/lightTheme";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  title: "Forms/Reach Hook Form + MUI",
  component: Sample,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      // viewports: MINIMAL_VIEWPORTS,
      defaultViewport: 'iphonex',
    },
  },
};

export const HomePage = () =>
  <ThemeProvider theme={lightTheme}>
    <Sample />
  </ThemeProvider>


HomePage.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};