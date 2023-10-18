import { Link } from "react-router-dom";
import { MenuProp } from "../type";

const Menu: React.FC<MenuProp> = (props: MenuProp) => {
  const { to, title, className } = props;
  return (
    <Link to={to} className={className}>
      {title}
    </Link>
  );
};

export default Menu;
