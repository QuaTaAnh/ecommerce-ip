import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { LayoutProp } from "../type";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { IState } from "../../redux/store";
import { UserProps } from "../../redux/type";
import NavBar from "../components/NavBar/NavBar";
import request from "../../utils/request";

const MainLayout: React.FC<LayoutProp> = (props: LayoutProp) => {
  const loading = useSelector((state: boolean | any) => state.loading);
  const { user } = useSelector((state: IState) => state.user as UserProps);
  const [startLocalStorage, setStartLocalStorage] = useState<UserProps>();

  request.defaults.headers.common["Authorization"] = startLocalStorage?.token;

  useEffect(() => {
    const dataAuthStorage = localStorage.getItem("auth");
    if (dataAuthStorage) {
      const parseDataAuth = JSON.parse(dataAuthStorage);
      setStartLocalStorage(parseDataAuth);
    }
  }, []);

  return (
    <>
      <div className="relative dark:bg-bgDark dark:text-white text-black h-screen overflow-auto transition duration-300 ease-in-out">
        <div className="main">
          <Header />
          {user?.role === 1 ? (
            <div className="flex mr-6">
              <div className="h-screen overflow-hidden w-1/5">
                <NavBar />
              </div>
              <div className="mt-marginTopHeader w-full pt-5 pl-5">
                {props.children}
              </div>
            </div>
          ) : (
            <div className="mt-11 pt-6">{props.children}</div>
          )}
          {/* <footer></footer> */}
        </div>
      </div>
      {loading ? <Loading /> : <></>}
    </>
  );
};

export default MainLayout;
