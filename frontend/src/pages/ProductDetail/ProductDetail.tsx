import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation, useParams } from "react-router-dom";
import request from "../../utils/request";
import { ProductProps } from "../Admin/type";
import { formatNumber } from "../../components/Global/FormatNumber";
import Button from "../../components/Button/Button";
import ChooseOur from "../../components/Global/ChooseOur";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartRedux";
import { toast } from "react-toastify";
import { formatSlug } from "../../components/Global/FormatSlug";

const ProductDetail: React.FC = () => {
  const { pathname } = useLocation();
  const params: any = useParams();
  const [product, setProduct] = useState<ProductProps>({});
  const formatPrice = formatNumber(product?.price || 0);
  const dispatch = useDispatch();
  const formattedParam = formatSlug(params.slug);

  const getProduct = async () => {
    try {
      const { data } = await request.get(
        `/api/product/get-product-by/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
    document.title = formattedParam;
  }, [params.slug]);

  const handleAddCart = () => {
    dispatch(addItem(product));
    toast.success("Bạn đã thêm vào giỏ hàng!");
  };

  return (
    <div>
      <Breadcrumbs path={pathname} />
      <ChooseOur />
      <div className="w-full flex my-6 px-10">
        <div className="w-1/3 bg-primary dark:bg-bgModalDark rounded-lg mr-10 py-6">
          <div className="w-80 h-80">
            <img src={product.image} className="w-full h-full " alt="Ảnh" />
          </div>
        </div>
        <div className="w-2/3 bg-primary dark:bg-bgModalDark rounded-lg p-6 flex flex-col">
          <div>
            <p className="text-4xl text-textHover mb-4">{product?.name}</p>
            <p className="text-base mb-4">{product?.description}</p>
            <p className="text-xl text-textHover mb-4">{formatPrice} VND</p>
          </div>
          <div className="mt-20">
            <Button
              className="mr-10 text-sm dark:dark:bg-indigo-800 py-2 px-5 rounded-lg bg-white"
              onClick={handleAddCart}
            >
              Thêm giỏ hàng
            </Button>
            <Button className="text-sm dark:dark:bg-indigo-800 py-2 px-5 rounded-lg bg-white">
              Đặt hàng ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
