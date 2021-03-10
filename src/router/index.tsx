import React from "react";
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "./routeWithSubRoutes";
import { IRoute } from "./config";

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
    </Switch>
  );
};

export default Router;
