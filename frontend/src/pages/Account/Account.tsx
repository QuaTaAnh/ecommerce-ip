import React, { useState } from "react";
import { IUser, UserProps } from "../../redux/type";
import { IState } from "../../redux/store";
import { useSelector } from "react-redux";
import NoImage from "../../assets/images/noImage.jpg";
import Button from "../../components/Button/Button";
import { AiOutlineEdit } from "react-icons/ai";
import EditUser from "./components/EditUser";
import Card from "../../components/Card/Card";

const Account: React.FC = () => {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const { user } = useSelector((state: IState) => state.user as UserProps);

  const openModalEdit = () => {
    setIsOpenEdit(true);
  };

  return (
    <div className="mx-10">
      <Card>
        <div className="w-1/4 flex flex-col justify-center items-center">
          <div className="text-center text-lg font-medium mb-4">
            Hồ sơ của <strong className="text-textHover">{user?.name}</strong>
          </div>
          <div className="relative w-[90px] h-[90px]">
            <img
              src={user?.avatar || NoImage}
              alt="Ảnh đại diện"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className="w-3/4">
          <h3 className="text-base mb-6">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </h3>
          <ul className="text-sm mb-6">
            <li className="py-2 pr-2 border-b-2">
              Họ tên <strong className="float-right">{user?.name}</strong>
            </li>
            <li className="py-2 pr-2 border-b-2">
              Email <strong className="float-right">{user?.email}</strong>
            </li>
            <li className="py-2 pr-2 border-b-2">
              Số điện thoại{" "}
              <strong className="float-right">{user?.phoneNumber}</strong>
            </li>
            <li className="py-2 pr-2 border-b-2">
              Địa chỉ <strong className="float-right">{user?.address}</strong>
            </li>
          </ul>
          <Button
            className="flex items-center p-2 float-right bg-primary rounded-lg text-sm dark:bg-indigo-800"
            leftIcon={<AiOutlineEdit />}
            onClick={openModalEdit}
          >
            Cập nhật thông tin
          </Button>
        </div>
      </Card>
      <EditUser
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        user={user as IUser}
      />
    </div>
  );
};

export default Account;
