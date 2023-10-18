import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg";
import NoImage from "../../../assets/images/noImage.jpg";
import { routes } from "../../../config/routes";
import Menu from "../Menu";
import { MENU } from "../../../constants";
import { MenuProp } from "../type";
import useDark from "../../../hooks/useDark";
import Button from "../../../components/Button/Button";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const Header: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDark();
  const user = !true;

  return (
    <header className="fixed h-defaultHeader w-screen px-7 bg-primary flex justify-between items-center dark:bg-bgDark shadow-light dark:shadow-dark">
      <Link to={routes.home}>
        <img src={Logo} alt="Iphone" />
      </Link>
      <div className="flex">
        <nav>
          {MENU.map((item: MenuProp) => {
            return (
              <Menu
                to={item.to}
                title={item.title}
                className="text-sm font-medium px-2 py-3.5"
              />
            );
          })}
        </nav>
      </div>
      <div>
        <div className="flex items-center">
          <div className="cursor-pointer text-2xl px-2 py-2.5 mr-4">
            {isDarkMode ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                color="#0ea5e9"
                onClick={() => toggleDarkMode(!isDarkMode)}
              />
            ) : (
              <MdOutlineDarkMode
                className="cursor-pointer text-white"
                color="#0ea5e9"
                onClick={() => toggleDarkMode(!isDarkMode)}
              />
            )}
          </div>
          {!user ? (
            <Button
              className="text-sm text-white bg-bgDark py-2 px-5 rounded-3xl hover:opacity-80 dark:bg-primary dark:text-black"
              // onClick={() => signIn("google")}
            >
              Đăng nhập
            </Button>
          ) : (
            <div className="relative group">
              <div className="flex justify-center items-center cursor-pointer py-1">
                <div className="w-8 h-8 rounded-full mr-2">
                  <img
                    src={user ?? NoImage}
                    alt="Image"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <p className="text-sm">Anh Tran</p>
              </div>
              <div className="absolute hidden dark:text-white dark:bg-bgModalDark py-2 px-1 w-48 right-0 rounded-lg shadow-lg group-hover:block">
                <Button
                  href={"/account"}
                  leftIcon={<AiOutlineUser />}
                  className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                >
                  Chi tiết tài khoản
                </Button>
                <Button
                  // onClick={() => signOut()}
                  leftIcon={<AiOutlineLogout />}
                  className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
