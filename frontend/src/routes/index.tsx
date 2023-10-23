import { routes } from "../config/routes";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Account from "../pages/Account/Account";
import DashboardUser from "../pages/User/DashboardUser";

export const publicRoutes = [
  { path: routes.home, component: Home },
  {
    path: routes.dashboardAdmin,
    component: DashboardAdmin,
  },
  {
    path: routes.dashboardUser,
    component: DashboardUser,
  },
  { path: routes.account, component: Account },
  {
    path: routes.cart,
    component: Cart,
    layout: "null",
  },
];
