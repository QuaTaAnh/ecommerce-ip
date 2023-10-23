import { routes } from "../config/routes";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import DashboardUser from "../pages/User/DashboardUser";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Account from "../pages/Account/Account";

export const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.dashboardAdmin, component: DashboardAdmin },
  { path: routes.dashboardUser, component: DashboardUser },
  { path: routes.account, component: Account },
  { path: routes.cart, component: Cart, layout: "null" },
];
