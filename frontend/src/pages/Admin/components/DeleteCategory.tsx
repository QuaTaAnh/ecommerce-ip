import React from "react";
import Modal from "../../../components/Modal/Modal";
import { DeleteCategoryProps } from "../type";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import request from "../../../utils/request";

const DeleteCategory: React.FC<DeleteCategoryProps> = ({
  isOpenDeleteCategory,
  setIsOpenDeleteCategory,
  getAllCategory,
  initValue,
}: DeleteCategoryProps) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.delete(
        `/api/category/delete-category/${initValue?._id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      dispatch(stopLoading());
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi");
    }
  };

  const closeModal = () => {
    setIsOpenDeleteCategory(false);
  };

  return (
    <Modal isOpen={isOpenDeleteCategory} onClose={closeModal}>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl">Xóa danh mục</div>
        <div className="py-4">Bạn có chắc chắn muốn xóa ?</div>
        <div className="flex justify-center">
          <button
            className="flex items-center text-sm dark:dark:bg-indigo-800 py-2 px-5 rounded-lg bg-primary"
            onClick={handleDelete}
          >
            <AiOutlineDelete />
            <div className="pl-1">Xóa</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCategory;
