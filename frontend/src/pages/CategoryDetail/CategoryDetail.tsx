import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductProps } from "../Admin/type";
import request from "../../utils/request";
import { toast } from "react-toastify";

const CategoryDetail: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const param: any = useParams();
  const [productCate, setProductCate] = useState<ProductProps[]>([]);
  const formattedParam = param.slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const getProductByCategory = async () => {
    try {
      const { data } = await request.get(
        `/api/product/get-product-in-category/${param.slug}`
      );
      setProductCate(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, []);

  return (
    <div>
      <div className="text-[60px] py-5 text-center font-bold text-textHover">
        {formattedParam}
      </div>
    </div>
  );
};

export default CategoryDetail;
