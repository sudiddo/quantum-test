import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { UserStateType } from "store/types";
import { IRoute } from "./config";

const RouteWithSubRoutes = (route: IRoute) => {
  const token = useSelector((state: UserStateType) => state.token);
  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            token !== "" ? (
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
