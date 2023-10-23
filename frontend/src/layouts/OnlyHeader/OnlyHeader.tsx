import React from "react";
import Header from "../components/Header/Header";
import { LayoutProp } from "../type";

const OnlyHeader: React.FC<LayoutProp> = (props: LayoutProp) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default OnlyHeader;
