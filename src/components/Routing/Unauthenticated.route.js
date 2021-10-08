import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { CircularProgress, Grid } from "@mui/material";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isAuthenticated, pending } = useContext(AuthContext);
  console.log("in private", isAuthenticated, pending);
  if (pending) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: '60vh' }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>

      </Grid>

    );
  }

  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuthenticated ? (
          <Redirect to={"/"} />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
};


export default (PrivateRoute)