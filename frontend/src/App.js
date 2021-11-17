import React, { useEffect, Suspense } from "react";
import Login from "./Containers/Login/Login";
import { Switch, BrowserRouter, Redirect, Route } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";
import { PublicRoute } from "./CustomRoutes";
import { FormProvider } from "./Containers/Layout/FormContext";
import Loading from "./Components/Loading/index";
import {
  HOME,
  EXPLORE,
  CREATE,
  EDIT,
  PROFILE,
  PROFILEEDIT,
  NOTIFICATION,
  ARTICLE,
} from "./routes.contants";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const paths = [
  HOME,
  EXPLORE,
  CREATE,
  EDIT,
  PROFILE,
  PROFILEEDIT,
  NOTIFICATION,
  ARTICLE,
];

function App() {
  useEffect(() => {
    document.title = "Collab";
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FormProvider>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Switch>
                <PublicRoute exact path="/login" component={Login} />
                <Route path={paths} component={Layout} />
                {/* {routes.map((route, index) => (
                  <CustomRoute
                    key={index}
                    path={route.path}
                    restricted={route.restricted}
                    exact={route.exact}
                    component={() => <Layout {...route} />}
                  />
                ))} */}
                <Redirect exact to={HOME} from={"/"} />
              </Switch>
            </BrowserRouter>
          </Suspense>
        </FormProvider>
      </QueryClientProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
