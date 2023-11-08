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
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useDispatch } from "react-redux";

const CategoryAdmin: React.FC = () => {
  const [isOpenAddCategory, setIsOpenAddCategory] = useState<boolean>(false);
  const [isOpenDeleteCategory, setIsOpenDeleteCategory] =
    useState<boolean>(false);
  const [allCategory, setAllCategory] = useState<CategoryProps[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<CategoryProps>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const dispatch = useDispatch();

  const columns = [
    { value: "name", label: "Danh mục" },
    { value: "type", label: "Loại" },
    { value: "image", label: "Ảnh mô tả" },
  ];

  const getAllCategory = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get(
        `/api/category/get-all-category-by/${page}`
      );
      dispatch(stopLoading());
      setAllCategory(data?.category);
      setTotalPage(data?.totalCategory);
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const handleEdit = (row: CategoryProps) => {
    setIsEdit(true);
    setIsOpenAddCategory(true);
    setInitValue(row);
  };

  const handleDelete = (row: CategoryProps) => {
    setInitValue(row);
    setIsOpenDeleteCategory(true);
  };

  const handleCopy = (row: CategoryProps) => {
    setIsCopy(true);
    setInitValue(row);
    setIsOpenAddCategory(true);
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
          onCopy={handleCopy}
          itemsPerPage={10}
          page={page}
          setPage={setPage}
          totalPage={totalPage}
        />
      </Card>
      <CreateUpdateCategory
        isOpenAddCategory={isOpenAddCategory}
        setIsOpenAddCategory={setIsOpenAddCategory}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isCopy={isCopy}
        setIsCopy={setIsCopy}
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

export default CategoryAdmin;
