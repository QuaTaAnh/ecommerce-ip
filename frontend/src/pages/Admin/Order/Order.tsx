import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";
import { IState } from "../../../redux/store";
import { useSelector } from "react-redux";
import request from "../../../utils/request";
import { OrderProps } from "../type";
import { UserProps } from "../../../redux/type";
import moment from "moment";

const Order: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state: IState) => state.user as UserProps);
  const { token } = useSelector((state: IState) => state.user);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const getOrders = async () => {
    try {
      const { data } = await request.get(`/api/auth/orders/${user?._id}`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getOrders();
  }, [token]);

  console.log(orders, "123");

  return (
    <>
      <Breadcrumbs path={pathname} />
      <div className="mx-10">
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b pb-6">
              <th className="text-left">Trạng thái</th>
              <th className="text-left">Người mua</th>
              <th className="text-left">Ngày mua</th>
              <th className="text-left">Thanh toán</th>
              <th className="text-left">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr key={item?._id} className="border-b h-28">
                  <td>{item?.status}</td>
                  <td>{item?.buyer?.name}</td>
                  <td>{moment(item?.createAt).fromNow()}</td>
                  <td>{item?.payment.success ? "Thành công" : "Thất bại"}</td>
                  <td>{item?.product?.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
