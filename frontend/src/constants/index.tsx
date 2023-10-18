import { routes } from "../config/routes";
import { MenuProp } from "../layouts/components/type";

export const MENU: MenuProp[] = [
  { to: routes.mac, title: "Mac" },
  { to: routes.ipad, title: "iPad" },
  { to: routes.iphone, title: "iPhone" },
  { to: routes.watch, title: "Watch" },
  { to: routes.airpods, title: "AirPods" },
  { to: routes.accessories, title: "Phụ kiện" },
];
