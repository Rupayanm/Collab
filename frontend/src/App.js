import React, { useEffect, Suspense } from "react";
import Login from "./pages/login/Login";
import { Switch, BrowserRouter, Redirect, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import { PublicRoute } from "./routes/CustomRoutes";
import Loading from "./components/Loading/index";
import {
  HOME,
  EXPLORE,
  CREATE,
  EDIT,
  PROFILE,
  PROFILEEDIT,
  NOTIFICATION,
  ARTICLE,
} from "./routes/routes.contants";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Switch>
              <PublicRoute exact path="/login" component={Login} />
              <Route path={paths} component={Layout} />
              <Redirect exact to={HOME} from={"/"} />
            </Switch>
          </BrowserRouter>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
