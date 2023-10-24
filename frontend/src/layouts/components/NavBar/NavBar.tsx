"use client";
import React from "react";
import { BiBox, BiCategory } from "react-icons/bi";
import { AiOutlineUnorderedList, AiOutlineHome } from "react-icons/ai";
import Button from "../../../components/Button/Button";
import { routes } from "../../../config/routes";
import { useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  let { pathname } = useLocation();

  const LinkActive = (type: string) => {
    if (pathname === "") {
      pathname = routes.dashboardAdmin;
    }
    let classes: string =
      "w-full h-10 my-1 flex items-center rounded-lg pl-6 hover:bg-primary dark:hover:bg-indigo-800";
    if (type === pathname) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      classes += " bg-primary dark:bg-indigo-800";
    }
    return classes;
  };

  return (
    <div className="h-screen flex flex-col scroll-auto items-center shadow-light dark:shadow-dark p-3 mt-marginTopHeader overflow-auto">
      <Button
        to={routes.dashboardAdmin}
        className={LinkActive(routes.dashboardAdmin)}
        leftIcon={<AiOutlineHome />}
      >
        Home
      </Button>
      <Button
        to={routes.category}
        className={LinkActive(routes.category)}
        leftIcon={<BiCategory />}
      >
        Category
      </Button>
      <Button
        to={routes.product}
        className={LinkActive(routes.product)}
        leftIcon={<BiBox />}
      >
        Products
      </Button>
      <Button
        to={routes.order}
        className={LinkActive(routes.order)}
        leftIcon={<AiOutlineUnorderedList />}
      >
        Orders
      </Button>
    </div>
  );
};

export default NavBar;
