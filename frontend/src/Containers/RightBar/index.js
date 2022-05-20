import React, { Suspense } from "react";
import { Switch } from "react-router";
import Loading from "../../components/Loading";
import { rightbarRoutes } from "../../routes/routes";
import { CustomRoute } from "../../routes/CustomRoutes";

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

export default RightBar;
