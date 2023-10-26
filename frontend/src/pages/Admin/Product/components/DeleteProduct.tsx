import React from "react";
import Modal from "../../../../components/Modal/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../../redux/loadingRedux";
import request from "../../../../utils/request";
import { DeleteProductProps } from "../../type";

const DeleteProduct: React.FC<DeleteProductProps> = ({
  isOpenDeleteProduct,
  setIsOpenDeleteProduct,
  getAllProduct,
  initValue,
}: DeleteProductProps) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.delete(
        `/api/product/delete-product/${initValue?._id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllProduct();
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
    setIsOpenDeleteProduct(false);
  };

  return (
    <Modal isOpen={isOpenDeleteProduct} onClose={closeModal}>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl">Xóa sản phẩm</div>
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

export default DeleteProduct;
