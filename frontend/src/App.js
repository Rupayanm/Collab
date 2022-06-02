import React, { useEffect, Suspense } from "react";
import Login from "./pages/login";
import Signup from "./pages/signup";
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
import { AuthProvider } from "./context/AuthContext";

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
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Switch>
                <PublicRoute path="/login" component={Login} />
                <PublicRoute exact path="/signup" component={Signup} />
                <Route path={paths} component={Layout} />
                <Redirect exact to={HOME} from={"/"} />
              </Switch>
            </BrowserRouter>
          </Suspense>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
