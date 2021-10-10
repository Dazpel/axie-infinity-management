import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoadingOverlay from "../Loader/LoadingOverlay";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isAuthenticated, pending } = useContext(AuthContext);

  if (pending) {
    return <LoadingOverlay />
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