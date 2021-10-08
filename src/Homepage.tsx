import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import HomeDrawer from "./components/Drawer/HomeDrawer";

const theme = createTheme({
  palette: {
    common: {
      black: "#11131B",
      white: "#FFFFFF",
    },
  },
});

export const Homepage = () => {
  return (
    <Grid>
      <ThemeProvider theme={theme}>
        <HomeDrawer />
      </ThemeProvider>
    </Grid>
  );
};
