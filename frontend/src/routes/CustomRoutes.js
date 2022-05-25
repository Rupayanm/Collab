import { Route, Redirect } from "react-router-dom";
import { TOKEN } from "../Constants";
import { HOME } from "./routes.contants";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const token = localStorage.getItem(TOKEN);
  return (
    // restricted = false meaning public route which is only allowed if the user is not logged in
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        token ? <Redirect push to={HOME} /> : <Component {...props} />
      }
    />
  );
};

export const CustomRoute = ({ component: Component, restricted, ...rest }) => {
  const { token } = useAuth();
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        restricted && !token ? (
          <Redirect
            push
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
