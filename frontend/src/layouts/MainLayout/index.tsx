import React from "react";
import Header from "../components/Header";
import { LayoutProp } from "../type";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

const MainLayout: React.FC<LayoutProp> = (props: LayoutProp) => {
  const loading = useSelector((state) => state.loading);
  return (
    <>
      <div className="relative dark:bg-bgDark dark:text-white text-black h-screen transition duration-300 ease-in-out">
        <div className="main">
          <Header />
          <div className="mt-11">{props.children}</div>
          {/* <footer></footer> */}
        </div>
      </div>
      {loading ? <Loading /> : <></>}
    </>
  );
};

export default MainLayout;
