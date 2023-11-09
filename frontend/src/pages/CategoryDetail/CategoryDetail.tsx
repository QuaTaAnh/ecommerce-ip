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
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const totalPages = Math.ceil(totalPage / 8);
  console.log(totalPage);

  const formattedParam = param.slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const getProductByCategory = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get(
        `/api/product/get-product-in-category-by-page/${param.slug}/${page}`
      );
      setProductCate(data?.products);
      setTotalPage(data?.totalProducts);
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
  }, [param.slug, page]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div className="text-[60px] py-5 text-center font-bold text-textHover">
        {formattedParam}
      </div>
      <Breadcrumbs path={pathname} />
      {productCate.length > 0 ? (
        <div className="mx-10 mt-10 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-4">
            {productCate.map((product: ProductProps) => {
              return <Product product={product} />;
            })}
          </div>
          <div className="mt-4">
            <nav className="flex justify-end">
              <ul className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    className={`mr-2 inline-flex items-center px-2 py-0 border rounded-md cursor-pointer ${
                      page === index + 1 ? " bg-textHover text-white" : ""
                    }`}
                    onClick={() => handleChangePage(index + 1)}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </nav>
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
