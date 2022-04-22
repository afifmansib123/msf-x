/**
 * This is a sample of MUI + React Hook Form
 * We will mainly work on small devices for MSF, so this viewport is set to small devinces
 * See [react-hook-form](https://react-hook-form.com/get-started)
 */

import LoginForm from "./LoginForm.js";
import { ThemeProvider } from "@mui/material";
import lightTheme from "styles/theme/lightTheme";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  title: "Forms/Login In",
  component: LoginForm,
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
    <LoginForm />
  </ThemeProvider>


HomePage.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};