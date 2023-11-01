import { routes } from "../config/routes";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Account from "../pages/Account/Account";
import DashboardUser from "../pages/User/DashboardUser";
import Category from "../pages/Admin/Category/Category";
import Product from "../pages/Admin/Product/Product";
import Order from "../pages/Admin/Order/Order";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import CategoryDetail from "../pages/CategoryDetail/CategoryDetail";

export const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.dashboardAdmin, component: DashboardAdmin },
  { path: routes.categoryAdmin, component: Category },
  { path: routes.productAdmin, component: Product },
  { path: routes.order, component: Order },
  { path: routes.dashboardUser, component: DashboardUser },
  { path: routes.product, component: ProductDetail },
  { path: routes.category, component: CategoryDetail },
  { path: routes.account, component: Account },
  { path: routes.cart, component: Cart, layout: null },
];
