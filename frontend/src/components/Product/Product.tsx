import React from "react";
import Button from "../Button/Button";
import { formatNumber } from "../Global/FormatNumber";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartRedux";
import { toast } from "react-toastify";
import { ProductProp } from "../type";

const Product: React.FC<ProductProp> = (product: ProductProp) => {
  const navigate = useNavigate();
  const priceFormat = formatNumber(product?.product?.price as number);
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addItem(product?.product));
    toast.success("Bạn đã thêm vào giỏ hàng!");
  };

  return (
    <div className="relative group">
      <Button
        className="cursor-pointer shadow-xl dark:bg-bgModalDark dark:shadow-lg rounded-lg pb-4 mb-4"
        onClick={() => navigate(`/product/${product?.product?.slug}`)}
      >
        <div>
          <img src={product?.product?.image} alt="" />
          <div className="font-bold pt-2 px-6 h-14 overflow-hidden">
            {product?.product?.name}
          </div>
          <div className="font-bold pt-1 text-textHover">{priceFormat} VND</div>
        </div>
      </Button>
      <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 hidden group-hover:block animate-slideIn">
        <button className="text-2xl p-2 rounded-lg bg-white dark:bg-bgModalDark hover:bg-red-500 hover:text-white dark:hover:bg-red-500 mr-2">
          <AiOutlineHeart />
        </button>
        <button
          className="text-2xl p-2 rounded-lg bg-white dark:bg-bgModalDark hover:bg-red-500 hover:text-white dark:hover:bg-red-500"
          onClick={handleAddCart}
        >
          <AiOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default Product;
