import React, { useEffect } from "react";
import Login from "./Containers/Login/Login";
import { Switch, BrowserRouter, Redirect } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";
import { PrivateRoute, PublicRoute } from "./RouteAccess";

function App() {
  useEffect(() => {
    document.title = "Collab";
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/home" exact component={Layout} />
          <PrivateRoute path="/profile" exact component={Layout} />
          <PrivateRoute path="/notifications" exact component={Layout} />
          <PrivateRoute path="/explore" exact component={Layout} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
