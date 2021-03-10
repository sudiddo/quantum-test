import React from "react";
import { Route, Switch } from "react-router-dom";
import RouteWithSubRoutes from "./routeWithSubRoutes";
import { IRoute } from "./config";
import NoMatch from "containers/noMatch";

interface IProps {
  routes: IRoute[];
}

const Router: React.FC<IProps> = ({ routes }) => {
  return (
    <Switch>
      {routes &&
        routes.map((route: IRoute) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Router;
