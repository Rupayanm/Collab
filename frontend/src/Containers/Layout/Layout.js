import React, { Suspense } from "react";
import { Switch } from "react-router";
import Loading from "../../Components/Loading";
import Nav from "../Navbar/Nav";
import { sidebarRoutes, contentRoutes, rightbarRoutes } from "../../routes";
import { CustomRoute } from "../../CustomRoutes";

const Layout = () => {
  return (
    <>
      <div className=" flex flex-nowrap w-screen h-screen ">
        <div className="hidden w-1/3 h-full border-r border-gray-300 bg-menu-pattern backdrop-contrast-150 md:block lg:w-1/4">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col md:w-2/3 lg:w-3/4">
          <div className="w-full h-auto">
            <Nav />
          </div>
          <div className="w-full h-full flex-grow-1 flex flex-row relative overflow-y-scroll">
            <div className="w-full lg:w-4/6 ">
              <Content />
            </div>
            <div className="hidden w-2/6 sticky top-0 lg:block overflow-y-scroll scrollbar-hide">
              <RightBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Sidebar() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {sidebarRoutes.map((route, index) => (
          <CustomRoute
            key={index}
            path={route.path}
            restricted={route.restricted}
            exact={route.exact}
            component={route.Sidebar}
          />
        ))}
      </Switch>
    </Suspense>
  );
}

function Content() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {contentRoutes.map((route, index) => (
          <CustomRoute
            key={index}
            path={route.path}
            restricted={route.restricted}
            exact={route.exact}
            component={route.Content}
          />
        ))}
      </Switch>
    </Suspense>
  );
}

function RightBar() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {rightbarRoutes.map((route, index) => (
          <CustomRoute
            key={index}
            path={route.path}
            restricted={route.restricted}
            exact={route.exact}
            component={route.RightBar}
          />
        ))}
      </Switch>
    </Suspense>
  );
}

export default Layout;
