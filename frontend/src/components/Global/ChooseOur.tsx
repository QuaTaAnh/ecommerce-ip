import React from "react";
import { PiNumberOneBold } from "react-icons/pi";
import { BsShieldCheck, BsPiggyBank } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";

const ChooseOur: React.FC = () => {
  return (
    <div className="w-full flex justify-around mt-10 bg-primary dark:bg-bgModalDark py-8 my-6">
      <div className="flex flex-row items-center">
        <div className="mr-4 text-5xl">
          <PiNumberOneBold />
        </div>
        <div>
          <p className="font-bold">IPHONE SIÊU CHẤT</p>
          <p className="text-sm">Số 1 Hà Nội</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-4 text-5xl">
          <BsShieldCheck />
        </div>
        <div>
          <p className="font-bold">BẢO HÀNH 12 THÁNG</p>
          <p className="text-sm">Hỗ trợ người dùng</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-4 text-5xl">
          <BsPiggyBank />
        </div>
        <div>
          <p className="font-bold">TRẢ GÓP 0% LÃI XUẤT</p>
          <p className="text-sm">Nhanh gọn 5-10 phút</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-4 text-5xl">
          <LiaShippingFastSolid />
        </div>
        <div>
          <p className="font-bold">MIỄN PHÍ VẬN CHUYỂN</p>
          <p className="text-sm">Giao hàng nhanh</p>
        </div>
      </div>
    </div>
  );
};

export default ChooseOur;
