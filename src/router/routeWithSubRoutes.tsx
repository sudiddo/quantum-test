import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { StoreStateType } from "store";
import { IRoute } from "./config";

const RouteWithSubRoutes = (route: IRoute) => {
  const token = useSelector((state: StoreStateType) => state.user.token);
  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            token !== null ? (
              route.component && (
                <route.component {...props} routes={route.routes} />
              )
            ) : (
              <Redirect to={"/login"} />
            )
          ) : (
            route.component && (
              <route.component {...props} routes={route.routes} />
            )
          )
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
