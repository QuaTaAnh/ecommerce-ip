import React, { ChangeEvent, useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import { CreateUpdateCategoryProps } from "../../type";
import { useForm } from "react-hook-form";
import { RiAddLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../../utils/request";
import { startLoading, stopLoading } from "../../../../redux/loadingRedux";

const CreateUpdateCategory: React.FC<CreateUpdateCategoryProps> = ({
  isOpenAddCategory,
  setIsOpenAddCategory,
  isEdit,
  setIsEdit,
  isCopy,
  setIsCopy,
  getAllCategory,
  initValue,
}: CreateUpdateCategoryProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>("");

  const handleChangeImage = (e: ChangeEvent<any>) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const onHandleSubmit = async (params: any) => {
    const dataSubmit = { ...params, image };

    if (isEdit) {
      try {
        dispatch(startLoading());
        const { data } = await request.put(
          `/api/category/update-category/${initValue?._id}`,
          dataSubmit
        );
        if (data?.success) {
          toast.success(data?.message);
          getAllCategory();
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
          "/api/category/create-category",
          dataSubmit
        );
        if (data?.success) {
          toast.success(data?.message);
          getAllCategory();
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
    setIsOpenAddCategory(false);
    setIsEdit(false);
    setIsCopy(false);
    reset();
  };

  return (
    <Modal isOpen={isOpenAddCategory} onClose={closeModal}>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl mb-10">
          {isEdit
            ? "Cập nhật danh mục"
            : isCopy
            ? "Sao chép danh mục"
            : "Thêm mới danh mục"}
        </div>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col justify-center items-center">
            <div className="mb-6 flex justify-center flex-col">
              <div className="flex justify-center items-center">
                <label htmlFor="name" className="w-[100px] text-sm mr-3">
                  Tên danh mục
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  defaultValue={isEdit || isCopy ? initValue?.name : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  autoComplete="off"
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
                <label htmlFor="type" className="w-[100px] text-sm mr-3">
                  Loại
                </label>
                <input
                  {...register("type", { required: true })}
                  name="type"
                  defaultValue={isEdit || isCopy ? initValue?.type : ""}
                  className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  autoComplete="off"
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
                <label htmlFor="image" className="w-[100px] text-sm mr-3">
                  Ảnh mô tả
                </label>
                <input
                  name="image"
                  type="file"
                  onChange={handleChangeImage}
                  className="w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default CreateUpdateCategory;
