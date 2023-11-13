import React from "react";
import { CardProps } from "../type";

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className="relative dark:bg-bgModalDark flex items-center justify-center rounded-lg shadow-xl py-10 px-6 mb-4">
      {props.children}
    </div>
  );
};

export default Card;
