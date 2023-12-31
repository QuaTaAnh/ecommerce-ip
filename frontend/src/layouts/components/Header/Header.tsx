import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg";
import NoImage from "../../../assets/images/noImage.jpg";
import { routes } from "../../../config/routes";
import useDark from "../../../hooks/useDark";
import Button from "../../../components/Button/Button";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import Login from "../../../components/Login/Login";
import Search from "../../../components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../redux/store";
import { UserProps } from "../../../redux/type";
import { toast } from "react-toastify";
import { logout as logoutFunction } from "../../../utils/auth";

const Header: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDark();
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);
  const { user } = useSelector((state: IState) => state.user as UserProps);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantityCart = useSelector((state: IState) => state.cart.quantityCart);

  const openModalLogin = () => {
    setIsOpenLogin(true);
  };

  const handleLogout = () => {
    try {
      logoutFunction(dispatch);
      localStorage.removeItem("auth");
      navigate("/");
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <>
      <header className="fixed h-defaultHeader top-0 right-0 z-20 w-screen px-7 bg-primary flex justify-between items-center dark:bg-bgDark shadow-light dark:shadow-dark">
        <Link to={routes.home}>
          <div className="flex items-center">
            <div className="text-xl font-bold mr-2">Apple</div>
            <img src={Logo} alt="Iphone" />
          </div>
        </Link>
        <div className="flex">
          <Search />
        </div>
        <div>
          <div className="flex items-center">
            <button
              className="relative cursor-pointer text-2xl px-2 py-2.5 mr-4"
              onClick={() => navigate("/cart")}
            >
              <AiOutlineShoppingCart />
              <p className="absolute w-4 h-4 text-center text-xs text-white top-2 right-0 bg-textHover rounded-full">
                {quantityCart}
              </p>
            </button>
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
            {user?._id ? (
              <div className="relative group">
                <div className="flex justify-center items-center cursor-pointer py-1">
                  <div className="w-8 h-8 rounded-full mr-2">
                    <img
                      src={user?.avatar ?? NoImage}
                      alt="Image"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm">{user?.name}</p>
                </div>
                <div className="absolute z-50 hidden bg-white dark:bg-bgModalDark py-2 px-1 w-48 right-0 rounded-lg shadow-lg group-hover:block">
                  {user?.role === 1 ? (
                    <Button
                      to={routes.dashboardAdmin}
                      leftIcon={<RxDashboard />}
                      className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                    >
                      Bảng điều khiển
                    </Button>
                  ) : (
                    <Button
                      to={routes.orderUser}
                      leftIcon={<RxDashboard />}
                      className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                    >
                      Đơn hàng của tôi
                    </Button>
                  )}
                  <Button
                    to={"/account"}
                    leftIcon={<AiOutlineUser />}
                    className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                  >
                    Chi tiết tài khoản
                  </Button>
                  <Button
                    leftIcon={<AiOutlineLogout />}
                    className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                className="text-sm text-white bg-bgDark py-2 px-5 rounded-3xl hover:opacity-80 bg-textHover"
                onClick={openModalLogin}
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </header>
      <Login
        isOpenLogin={isOpenLogin}
        setIsOpenLogin={setIsOpenLogin}
        isOpenRegister={isOpenRegister}
        setIsOpenRegister={setIsOpenRegister}
      />
    </>
  );
};

export default Header;
