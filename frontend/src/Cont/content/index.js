import React, { Suspense } from "react";
import { Switch } from "react-router";
import Loading from "../../components/Loading";
import { contentRoutes } from "../../routes/routes";
import { CustomRoute } from "../../routes/CustomRoutes";

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

export default Content;
