import React, { ChangeEvent, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { EditUserProps } from "../type";
import { IUser, UserProps } from "../../../redux/type";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editUser } from "../../../utils/auth";

const EditUser: React.FC<EditUserProps> = ({
  isOpenEdit,
  setIsOpenEdit,
  user,
}: {
  user: IUser;
  isOpenEdit: boolean;
  setIsOpenEdit: (open: boolean) => void;
}) => {
  const [avatar, setAvatar] = useState<string>("");
  const { handleSubmit, control, reset } = useForm();
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpenEdit(false);
    reset();
  };
  const handleChangeAvatar = (e: ChangeEvent<any>) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    const avt: string | ArrayBuffer = reader.result as string;
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(avt);
      };
    } else {
      setAvatar("");
    }
  };

  const onHandleSubmit = async (data: IUser) => {
    const params = {
      _id: user?._id,
      ...data,
      avatar,
    };

    try {
      editUser(dispatch, params).then((res: any) => {
        if (res && res?.success === true) {
          let ls: UserProps | any = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = res.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success(res && res?.message);
          closeModal();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <Modal isOpen={isOpenEdit} onClose={closeModal}>
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl mb-10">Cập nhật thông tin</div>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col justify-center items-start">
            <div className="mb-6 flex justify-center flex-row items-center">
              <label
                htmlFor="name"
                className="w-[120px] text-base font-bold mr-3"
              >
                Họ và tên
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue={user?.name}
                render={({ field }) => (
                  <input
                    type="text"
                    className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </div>
            <div className="mb-6 flex justify-center flex-row items-center">
              <label
                htmlFor="email"
                className="w-[120px] text-base font-bold mr-3"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue={user?.email}
                render={({ field }) => (
                  <input
                    type="text"
                    disabled
                    className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-70"
                    {...field}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className="mb-6 flex justify-center flex-row items-center">
              <label
                htmlFor="password"
                className="w-[120px] text-base font-bold mr-3"
              >
                Mật khẩu
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="password"
                    className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </div>
            <div className="mb-6 flex justify-center flex-row items-center">
              <label
                htmlFor="phoneNumber"
                className="w-[120px] text-base font-bold mr-3"
              >
                Số điện thoại
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue={user?.phoneNumber}
                render={({ field }) => (
                  <input
                    type="text"
                    className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </div>
            <div className="mb-6 flex justify-center flex-row items-center">
              <label
                htmlFor="address"
                className="w-[120px] text-base font-bold mr-3"
              >
                Địa chỉ
              </label>
              <Controller
                name="address"
                control={control}
                defaultValue={user?.address}
                render={({ field }) => (
                  <input
                    type="text"
                    className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </div>
            <div className="mb-6 flex justify-center flex-row items-center">
              <label
                htmlFor="avatar"
                className="w-[120px] text-base font-bold mr-3"
              >
                Ảnh đại diện
              </label>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="w-[260px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...field}
                    onChange={handleChangeAvatar}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center text-sm dark:dark:bg-indigo-800 py-2 px-5 rounded-lg bg-primary"
            >
              <AiOutlineEdit />
              <div className="pl-1">Cập nhật</div>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditUser;
