import { routes } from "../config/routes";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import DashboardUser from "../pages/User/DashboardUser";
import Home from "../pages/Home";
import Cart from "../pages/Cart";

export const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.dashboardAdmin, component: DashboardAdmin },
  { path: routes.dashboardUser, component: DashboardUser },
  { path: routes.cart, component: Cart, layout: "null" },
];
