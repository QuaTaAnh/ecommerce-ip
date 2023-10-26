import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import { RiAddLine } from "react-icons/ri";
import CustomTable from "../../../components/Table/Table";
import { CategoryProps } from "../type";
import { toast } from "react-toastify";
import request from "../../../utils/request";
import CreateUpdateCategory from "./components/CreateUpdateCategory";
import DeleteCategory from "./components/DeleteCategory";

const Category: React.FC = () => {
  const [isOpenAddCategory, setIsOpenAddCategory] = useState<boolean>(false);
  const [isOpenDeleteCategory, setIsOpenDeleteCategory] =
    useState<boolean>(false);
  const [allCategory, setAllCategory] = useState<CategoryProps[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<CategoryProps>();

  const columns = [{ value: "name", label: "Danh mục" }];

  const getAllCategory = async () => {
    try {
      const { data } = await request.get("/api/category/get-category");
      setAllCategory(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  const handleEdit = (row: CategoryProps) => {
    setIsEdit(true);
    setIsOpenAddCategory(true);
    console.log(row);
    setInitValue(row);
  };

  const handleDelete = (row: CategoryProps) => {
    console.log(row);
    setInitValue(row);
    setIsOpenDeleteCategory(true);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <Card>
        <div className="absolute right-8 top-6">
          <Button
            className="flex items-center text-sm dark:bg-indigo-800 py-2 px-5 rounded-lg bg-primary"
            leftIcon={<RiAddLine />}
            onClick={() => setIsOpenAddCategory(true)}
          >
            Thêm mới
          </Button>
        </div>
        <CustomTable
          columns={columns}
          data={allCategory}
          actions
          onDelete={handleDelete}
          onEdit={handleEdit}
          itemsPerPage={10}
        />
      </Card>
      <CreateUpdateCategory
        isOpenAddCategory={isOpenAddCategory}
        setIsOpenAddCategory={setIsOpenAddCategory}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        getAllCategory={getAllCategory}
        initValue={initValue}
      />
      <DeleteCategory
        isOpenDeleteCategory={isOpenDeleteCategory}
        setIsOpenDeleteCategory={setIsOpenDeleteCategory}
        getAllCategory={getAllCategory}
        initValue={initValue}
      />
    </>
  );
};

export default Category;
