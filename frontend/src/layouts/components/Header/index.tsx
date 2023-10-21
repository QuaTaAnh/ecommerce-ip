import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg";
import NoImage from "../../../assets/images/noImage.jpg";
import { routes } from "../../../config/routes";
import useDark from "../../../hooks/useDark";
import Button from "../../../components/Button/Button";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import Login from "../../../components/Login/Login";
import Search from "../../../components/Search/Search";

const Header: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDark();
  const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);
  const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);

  const user = !true;

  const openModalLogin = () => {
    setIsModalLoginOpen(true);
  };

  const closeModal = () => {
    setIsModalLoginOpen(false);
    setIsOpenRegister(false);
  };

  return (
    <>
      <header className="fixed h-defaultHeader top-0 right-0 z-20 w-screen px-7 bg-primary flex justify-between items-center dark:bg-bgDark shadow-light dark:shadow-dark">
        <Link to={routes.home}>
          <div className="h-10 w-10">
            <img
              src={Logo}
              alt="Iphone"
              className="w-full h-full rounded-full bg-textHover"
            />
          </div>
        </Link>
        <div className="flex">
          <Search />
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
                className="text-sm text-white bg-bgDark py-2 px-5 rounded-3xl hover:opacity-80 bg-textHover"
                onClick={openModalLogin}
              >
                Đăng nhập
              </Button>
            ) : (
              <div className="relative group">
                <div className="flex justify-center items-center cursor-pointer py-1">
                  <div className="w-8 h-8 rounded-full mr-2">
                    <img
                      src={user?.image ?? NoImage}
                      alt="Image"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <p className="text-sm">Anh Tran</p>
                </div>
                <div className="absolute hidden dark:bg-bgModalDark py-2 px-1 w-48 right-0 rounded-lg shadow-lg group-hover:block">
                  <Button
                    href={"/account"}
                    leftIcon={<AiOutlineUser />}
                    className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                  >
                    Chi tiết tài khoản
                  </Button>
                  <Button
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
      <Login
        closeModal={closeModal}
        isModalLoginOpen={isModalLoginOpen}
        isOpenRegister={isOpenRegister}
        setIsOpenRegister={setIsOpenRegister}
      />
    </>
  );
};

export default Header;
