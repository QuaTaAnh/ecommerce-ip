import { routes } from "../config/routes";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Account from "../pages/Account/Account";
import DashboardUser from "../pages/User/DashboardUser";
import Category from "../pages/Admin/Category";
import Product from "../pages/Admin/Product";
import Order from "../pages/Admin/Order";

export const publicRoutes = [
  { path: routes.home, component: Home },
  {
    path: routes.dashboardAdmin,
    component: DashboardAdmin,
    // layout: AdminLayout,
  },
  {
    path: routes.category,
    component: Category,
    // layout: AdminLayout,
  },
  {
    path: routes.product,
    component: Product,
    // layout: AdminLayout,
  },
  {
    path: routes.order,
    component: Order,
    // layout: AdminLayout,
  },
  {
    path: routes.dashboardUser,
    component: DashboardUser,
  },
  { path: routes.account, component: Account },
  {
    path: routes.cart,
    component: Cart,
    layout: null,
  },
];
