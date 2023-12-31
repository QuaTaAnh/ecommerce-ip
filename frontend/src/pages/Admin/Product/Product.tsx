import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import { RiAddLine } from "react-icons/ri";
import CustomTable from "../../../components/Table/Table";
import { CategoryProps, ProductProps } from "../type";
import { toast } from "react-toastify";
import request from "../../../utils/request";
import DeleteProduct from "./components/DeleteProduct";
import CreateUpdateProduct from "./components/CreateUpdateProduct";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";

const ProductAdmin: React.FC = () => {
  const [isOpenAddProduct, setIsOpenAddProduct] = useState<boolean>(false);
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] =
    useState<boolean>(false);
  const [allProduct, setAllProduct] = useState<ProductProps[]>([]);
  const [allCategory, setAllCategory] = useState<CategoryProps[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<ProductProps>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const dispatch = useDispatch();

  const columns = [
    { value: "name", label: "Tên sản phẩm" },
    { value: "description", label: "Mô tả" },
    { value: "category", label: "Danh mục" },
    { value: "price", label: "Giá" },
    { value: "quantity", label: "Số lượng" },
    { value: "image", label: "Hình ảnh" },
  ];

  const getAllCategory = async () => {
    try {
      const { data } = await request.get("/api/category/get-all-category");
      setAllCategory(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const getAllProduct = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get(
        `/api/product/get-all-product-by-page/${page}`
      );
      dispatch(stopLoading());
      setAllProduct(data?.product);
      setTotalPage(data?.totalProduct);
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const handleEdit = (row: ProductProps) => {
    setIsEdit(true);
    setIsOpenAddProduct(true);
    setInitValue(row);
  };

  const handleDelete = (row: ProductProps) => {
    setInitValue(row);
    setIsOpenDeleteProduct(true);
  };

  const handleCopy = (row: ProductProps) => {
    setIsCopy(true);
    setInitValue(row);
    setIsOpenAddProduct(true);
  };

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, [page]);

  return (
    <>
      <Card>
        <div className="absolute right-8 top-6">
          <Button
            className="flex items-center text-sm dark:bg-indigo-800 py-2 px-5 rounded-lg bg-primary"
            leftIcon={<RiAddLine />}
            onClick={() => setIsOpenAddProduct(true)}
          >
            Thêm mới
          </Button>
        </div>
        <CustomTable
          columns={columns}
          data={allProduct}
          actions
          onDelete={handleDelete}
          onEdit={handleEdit}
          onCopy={handleCopy}
          itemsPerPage={10}
          page={page}
          setPage={setPage}
          totalPage={totalPage}
        />
      </Card>
      <CreateUpdateProduct
        isOpenAddProduct={isOpenAddProduct}
        setIsOpenAddProduct={setIsOpenAddProduct}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isCopy={isCopy}
        setIsCopy={setIsCopy}
        getAllProduct={getAllProduct}
        initValue={initValue}
        allCategory={allCategory}
      />
      <DeleteProduct
        isOpenDeleteProduct={isOpenDeleteProduct}
        setIsOpenDeleteProduct={setIsOpenDeleteProduct}
        getAllProduct={getAllProduct}
        initValue={initValue}
      />
    </>
  );
};

export default ProductAdmin;
