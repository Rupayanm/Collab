import React, { useEffect, Suspense } from "react";
import Login from "./Containers/Login/Login";
import { Switch, BrowserRouter, Redirect } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";
import { CustomRoute, PublicRoute } from "./CustomRoutes";
import { FormProvider } from "./Containers/Layout/FormContext";
import { routes } from "./routes";
import Loading from "./Components/Loading/index";
import { HOME } from "./routes.contants";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

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
                {routes.map((route, index) => (
                  <CustomRoute
                    key={index}
                    path={route.path}
                    restricted={route.restricted}
                    exact={route.exact}
                    component={() => <Layout {...route} />}
                  />
                ))}
                <Redirect exact to={HOME} from={"/"} />
              </Switch>
            </BrowserRouter>
          </Suspense>
        </FormProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
