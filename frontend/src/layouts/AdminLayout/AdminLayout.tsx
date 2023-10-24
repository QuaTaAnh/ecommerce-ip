import React from "react";
import Header from "../components/Header/Header";
import { LayoutProp } from "../type";
import NavBar from "../components/NavBar/NavBar";

const AdminLayout: React.FC<LayoutProp> = (props: LayoutProp) => {
  return (
    <>
      <div className="relative dark:bg-bgDark dark:text-white text-black h-screen overflow-hidden transition duration-300 ease-in-out">
        <Header />
        <div className="flex mr-6">
          <div className="h-screen overflow-hidden w-1/5">
            <NavBar />
          </div>
          <div className="mt-marginTopHeader w-full pt-5 pl-5">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
