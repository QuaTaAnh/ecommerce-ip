import React from "react";
import Header from "../components/Header";
import { LayoutProp } from "../type";

const MainLayout: React.FC<LayoutProp> = (props: LayoutProp) => {
  return (
    <div className="main">
      <Header />
      <div className="mt-11">{props.children}</div>
      {/* <footer></footer> */}
    </div>
  );
};

export default MainLayout;
