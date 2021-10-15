import { Route, Redirect } from "react-router-dom";

const token = localStorage.getItem("token");

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export const CustomRoute = ({ component: Component, protect, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        protect && !token ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
