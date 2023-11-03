import React from "react";
import Button from "../Button/Button";
import { ProductProps } from "../../pages/Admin/type";
import { formatNumber } from "../Global/FormatNumber";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

interface ProductProp {
  product: ProductProps;
}

const Product: React.FC<ProductProp> = (product: ProductProp) => {
  const navigate = useNavigate();
  const priceFormat = formatNumber(product?.product?.price || 0);
  return (
    <div className="relative">
      <Button
        className="cursor-pointer border dark:border-colorBorderDark rounded-lg pb-4 mb-4"
        onClick={() => navigate(`/product/${product?.product?.slug}`)}
      >
        <div>
          <img src={product?.product?.image} className="h-200" alt="" />
          <div className="font-bold pt-2 px-6">{product?.product?.name}</div>
          <div className="font-bold pt-2 text-textHover">{priceFormat} VND</div>
        </div>
      </Button>
      <button className="absolute top-4 right-2 text-2xl">
        <AiFillHeart />
      </button>
    </div>
  );
};

export default Product;
