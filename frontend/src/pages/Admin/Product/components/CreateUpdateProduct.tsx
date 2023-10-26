import React from "react";
import Modal from "../../../../components/Modal/Modal";
import { CreateUpdateProductProps } from "../../type";
import { useForm } from "react-hook-form";
import { RiAddLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../../utils/request";
import { startLoading, stopLoading } from "../../../../redux/loadingRedux";

const CreateUpdateProduct: React.FC<CreateUpdateProductProps> = ({
  isOpenAddProduct,
  setIsOpenAddProduct,
  isEdit,
  setIsEdit,
  getAllProduct,
  initValue,
}: CreateUpdateProductProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandleSubmit = async (params: any) => {
    if (isEdit) {
      try {
        dispatch(startLoading());
        const { data } = await request.put(
          `/api/Product/update-Product/${initValue?._id}`,
          params
        );
        if (data?.success) {
          toast.success(data?.message);
          getAllProduct();
          closeModal();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi");
      }
      dispatch(stopLoading());
    } else {
      try {
        dispatch(startLoading());
        const { data } = await request.post(
          "/api/Product/create-Product",
          params
        );
        if (data?.success) {
          toast.success(data?.message);
          getAllProduct();
          closeModal();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi");
      }
      dispatch(stopLoading());
    }
  };

  const closeModal = () => {
    setIsOpenAddProduct(false);
    setIsEdit(false);
    reset();
  };

  return (
    <Modal isOpen={isOpenAddProduct} onClose={closeModal}>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl mb-10">
          {!isEdit ? "Thêm mới sản phẩm" : "Cập nhật sản phẩm"}
        </div>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col justify-center items-center">
            <div className="mb-6 flex justify-center flex-col">
              <div className="flex justify-center items-center">
                <label htmlFor="name" className="w-[100px] text-sm mr-3">
                  Tên sản phẩm
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  defaultValue={isEdit ? initValue?.name : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 ml-28">
                  Vui lòng nhập trường này!
                </p>
              )}
            </div>
            <div className="mb-6 flex justify-center flex-col">
              <div className="flex justify-center items-center">
                <label htmlFor="description" className="w-[100px] text-sm mr-3">
                  Mô tả
                </label>
                <input
                  {...register("description", { required: true })}
                  name="description"
                  defaultValue={isEdit ? initValue?.description : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.description && (
                <p className="text-xs text-red-500 ml-28">
                  Vui lòng nhập trường này!
                </p>
              )}
            </div>
            <div className="mb-6 flex justify-center flex-col">
              <div className="flex justify-center items-center">
                <label htmlFor="category" className="w-[100px] text-sm mr-3">
                  Danh mục
                </label>
                <select
                  {...register("category", { required: true })}
                  name="category"
                  defaultValue={isEdit ? initValue?.category : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.category && (
                <p className="text-xs text-red-500 ml-28">
                  Vui lòng nhập trường này!
                </p>
              )}
            </div>
            <div className="mb-6 flex justify-center flex-col">
              <div className="flex justify-center items-center">
                <label htmlFor="price" className="w-[100px] text-sm mr-3">
                  Giá
                </label>
                <input
                  {...register("price", { required: true })}
                  name="price"
                  defaultValue={isEdit ? initValue?.price : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-red-500 ml-28">
                  Vui lòng nhập trường này!
                </p>
              )}
            </div>
            <div className="mb-6 flex justify-center flex-col">
              <div className="flex justify-center items-center">
                <label htmlFor="quantity" className="w-[100px] text-sm mr-3">
                  Số lượng
                </label>
                <input
                  {...register("quantity", { required: true })}
                  name="quantity"
                  defaultValue={isEdit ? initValue?.quantity : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.quantity && (
                <p className="text-xs text-red-500 ml-28">
                  Vui lòng nhập trường này!
                </p>
              )}
            </div>
            <div className="mb-6 flex justify-center flex-col">
              <div className="flex justify-center items-center">
                <label htmlFor="image" className="w-[100px] text-sm mr-3">
                  Hình ảnh
                </label>
                <input
                  {...register("image", { required: true })}
                  name="image"
                  type="file"
                  defaultValue={isEdit ? initValue?.image : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.image && (
                <p className="text-xs text-red-500 ml-28">
                  Vui lòng nhập trường này!
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            {!isEdit ? (
              <button
                type="submit"
                className="flex items-center text-sm dark:dark:bg-indigo-800 py-2 px-5 rounded-lg bg-primary"
              >
                <RiAddLine />
                <div className="pl-1">Thêm mới</div>
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center text-sm dark:dark:bg-indigo-800 py-2 px-5 rounded-lg bg-primary"
              >
                <AiOutlineEdit />
                <div className="pl-1">Cập nhật</div>
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateUpdateProduct;