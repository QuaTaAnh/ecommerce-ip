import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import { RiAddLine } from "react-icons/ri";
import CustomTable from "../../../components/Table/Table";
import { CategoryProps, ProductProps } from "../type";
import { toast } from "react-toastify";
import request from "../../../utils/request";
import CreateUpdateCategory from "../Category/components/CreateUpdateCategory";
import DeleteCategory from "../Category/components/DeleteCategory";
import DeleteProduct from "./components/DeleteProduct";
import CreateUpdateProduct from "./components/CreateUpdateProduct";

const Product: React.FC = () => {
  const [isOpenAddProduct, setIsOpenAddProduct] = useState<boolean>(false);
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] =
    useState<boolean>(false);
  const [allProduct, setAllProduct] = useState<ProductProps[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<ProductProps>();

  const columns = [
    { value: "name", label: "Tên sản phẩm" },
    { value: "description", label: "Mô tả" },
    { value: "category", label: "Danh mục" },
    { value: "price", label: "Giá" },
    { value: "quantity", label: "Số lượng" },
    { value: "image", label: "Hình ảnh" },
  ];

  const getAllProduct = async () => {
    // try {
    //   const { data } = await request.get("/api/product/get-product");
    //   setAllProduct(data?.category);
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Đã có lỗi xảy ra!");
    // }
  };

  const handleEdit = (row: ProductProps) => {
    setIsEdit(true);
    setIsOpenAddProduct(true);
    console.log(row);
    setInitValue(row);
  };

  const handleDelete = (row: ProductProps) => {
    console.log(row);
    setInitValue(row);
    setIsOpenDeleteProduct(true);
  };

  // useEffect(() => {
  //   getAllProduct();
  // }, []);

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
          itemsPerPage={10}
        />
      </Card>
      <CreateUpdateProduct
        isOpenAddProduct={isOpenAddProduct}
        setIsOpenAddProduct={setIsOpenAddProduct}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        getAllProduct={getAllProduct}
        initValue={initValue}
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

export default Product;
