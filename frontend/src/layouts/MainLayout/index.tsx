import React from "react";
import Header from "../components/Header";
import { LayoutProp } from "../type";

const MainLayout: React.FC<LayoutProp> = (props: LayoutProp) => {
  return (
    <div>
      <Header />
      <div className="h-screen">{props.children}</div>
      {/* <footer></footer> */}
    </div>
  );
};

export default MainLayout;
