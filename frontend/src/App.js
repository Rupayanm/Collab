import React, { useEffect } from "react";
import Login from "./Containers/Login/Login";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";
import { PublicRoute } from "./RouteAccess";

function App() {
  useEffect(() => {
    document.title = "Collab";
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
