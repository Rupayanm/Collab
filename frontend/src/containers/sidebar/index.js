import React, { Suspense } from "react";
import { Switch } from "react-router";
import Loading from "../../components/Loading";
import { sidebarRoutes } from "../../routes/routes";
import { CustomRoute } from "../../routes/CustomRoutes";

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

export default Sidebar;
