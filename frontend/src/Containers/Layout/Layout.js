import React, { Suspense } from "react";
import Nav from "../Navbar/Nav";
import { sidebarRoutes, contentRoutes } from "../../routes";
import { FormProvider } from "./FormContext";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { CustomRoute } from "../../RouteAccess";
import Loading from "../../Components/Loading";

const Layout = () => {
  return (
    <>
      <FormProvider>
        <Router>
          <div className=" flex flex-nowrap w-screen h-screen ">
            <div className="hidden w-1/3 h-full border-r border-gray-300 bg-menu-pattern backdrop-contrast-150 md:block lg:w-1/4">
              <Suspense fallback={<Loading />}>
                <Switch>
                  {sidebarRoutes.map((route, index) => (
                    <CustomRoute
                      path={route.path}
                      protect={route.protect}
                      exact={route.exact}
                      // children={<route.component />}
                      component={route.component}
                      key={index}
                    />
                  ))}
                  <Redirect to="/home" from="/" />
                </Switch>
              </Suspense>
            </div>
            <div className="w-full flex flex-col md:w-2/3 lg:w-3/4">
              <div className="w-full h-auto">
                <Nav />
              </div>
              <div className="w-full h-full flex-grow-1 overflow-y-scroll">
                <Suspense fallback={<Loading />}>
                  <Switch>
                    {contentRoutes.map((route, index) => (
                      <CustomRoute
                        path={route.path}
                        protect={route.protect}
                        exact={route.exact}
                        // children={<route.component />}
                        component={route.component}
                        key={index}
                      />
                    ))}
                  </Switch>
                </Suspense>
              </div>
            </div>
          </div>
        </Router>
      </FormProvider>
    </>
  );
};

export default Layout;
