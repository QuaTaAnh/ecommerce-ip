import { routes } from "../config/routes";
import Home from "../pages/Home";

export const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.mac, component: "Product" },
  { path: routes.cart, component: "Search", layout: "null" },
];
