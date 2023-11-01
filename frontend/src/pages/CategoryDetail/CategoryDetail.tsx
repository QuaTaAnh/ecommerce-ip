import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductProps } from "../Admin/type";
import request from "../../utils/request";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import { formatNumber } from "../../components/Global/FormatNumber";

const CategoryDetail: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const param: any = useParams();
  const navigate = useNavigate();
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
  }, []);

  return (
    <div>
      <div className="text-[60px] py-5 text-center font-bold text-textHover">
        {formattedParam}
      </div>
      {productCate.length > 0 ? (
        <Card>
          <div className="grid grid-cols-4 gap-4">
            {productCate.map((product: ProductProps) => {
              const priceFormat = formatNumber(product?.price || 0);
              return (
                <Button
                  className="cursor-pointer border dark:border-colorBorderDark rounded-lg pb-4 mb-4"
                  onClick={() => navigate(`/product/${product?.slug}`)}
                >
                  <div className="">
                    <img src={product.image} className="h-200" alt="" />
                    <div className="font-bold pt-2 px-6">{product.name}</div>
                    <div className="font-bold pt-2 text-textHover">
                      {priceFormat} VND
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategoryDetail;
