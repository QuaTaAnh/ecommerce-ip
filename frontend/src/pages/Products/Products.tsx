import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { ProductProps } from "../Admin/type";
import request from "../../utils/request";
import Product from "../../components/Product/Product";
import Card from "../../components/Card/Card";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";

const Products: React.FC = () => {
  const { pathname } = useLocation();
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const totalPages = Math.ceil(totalPage / 10);
  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get(
        `/api/product/get-all-product-by-page/${page}`
      );
      dispatch(stopLoading());
      setProduct(data.product);
      setTotalPage(data?.totalProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [page]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className="text-[60px] py-5 text-center font-bold text-textHover">
        Sản phẩm
      </div>
      <Breadcrumbs path={pathname} />
      <div className="mx-10 mt-10">
        <Card>
          <div className="grid grid-cols-4 gap-4">
            {product.map((product: ProductProps) => {
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
        </Card>
      </div>
    </>
  );
};

export default Products;
