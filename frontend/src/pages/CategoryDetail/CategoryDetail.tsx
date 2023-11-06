import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ProductProps } from "../Admin/type";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import ChooseOur from "../../components/Global/ChooseOur";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Product from "../../components/Product/Product";

const CategoryDetail: React.FC = () => {
  const param: any = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [productCate, setProductCate] = useState<ProductProps[]>([]);
  const formattedParam = param.slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const getProductByCategory = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get(
        `/api/product/get-product-in-category/${param.slug}`
      );
      setProductCate(data?.products);
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    if (param.slug) {
      getProductByCategory();
    }
  }, [param.slug]);

  return (
    <div>
      <div className="text-[60px] py-5 text-center font-bold text-textHover">
        {formattedParam}
      </div>
      <Breadcrumbs path={pathname} />
      {productCate.length > 0 ? (
        <div className="mx-10 mt-10">
          <div className="grid grid-cols-4 gap-4">
            {productCate.map((product: ProductProps) => {
              return <Product product={product} />;
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <ChooseOur />
    </div>
  );
};

export default CategoryDetail;
