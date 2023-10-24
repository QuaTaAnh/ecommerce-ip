import React from "react";
import { CardProps } from "../type";

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className="relative bg-white dark:bg-bgModalDark w-full flex rounded-lg shadow-xl py-14 px-6">
      {props.children}
    </div>
  );
};

export default Card;
