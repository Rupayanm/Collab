import { Route, Redirect } from "react-router-dom";
import { TOKEN } from "./Constants";
import { HOME } from "./routes.contants";

const token = localStorage.getItem(TOKEN);

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
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
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
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
