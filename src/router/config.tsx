import Fallback from "containers/fallback";
import { ComponentType, lazy, LazyExoticComponent, ReactNode } from "react";

export interface IRoute {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  exact: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: LazyExoticComponent<ComponentType<any>>;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/quantum-test",
    exact: true,
    component: lazy(() => import("containers/login")),
    fallback: <Fallback />,
  },
  {
    path: "/quantum-test/register",
    exact: true,
    component: lazy(() => import("containers/register")),
    fallback: <Fallback />,
  },
  {
    path: "/quantum-test/users",
    exact: true,
    private: true,
    component: lazy(() => import("containers/users")),
    fallback: <Fallback />,
  },
  {
    path: "/quantum-test/*",
    exact: false,
    component: lazy(() => import("containers/noMatch")),
    fallback: <Fallback />,
  },
];
