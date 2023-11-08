import { routes } from "../config/routes";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Account from "../pages/Account/Account";
import Order from "../pages/Admin/Order/Order";
import CategoryDetail from "../pages/CategoryDetail/CategoryDetail";
import ProductAdmin from "../pages/Admin/Product/Product";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import CategoryAdmin from "../pages/Admin/Category/Category";
import Categories from "../pages/Categories/Categories";
import Products from "../pages/Products/Products";

export const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.dashboardAdmin, component: DashboardAdmin },
  { path: routes.categoryAdmin, component: CategoryAdmin },
  { path: routes.productAdmin, component: ProductAdmin },
  { path: routes.orderUser, component: Order },
  { path: routes.product, component: ProductDetail },
  { path: routes.category, component: CategoryDetail },
  { path: routes.categories, component: Categories },
  { path: routes.products, component: Products },
  { path: routes.account, component: Account },
  { path: routes.cart, component: Cart },
];
