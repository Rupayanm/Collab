import Login from "./Containers/Login/Login";
import Article from "./Containers/Article/Article";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        restricted ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/" exact component={Layout} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
