import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ChooseOur from "../../components/Global/ChooseOur";
import Card from "../../components/Card/Card";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import { UserProps } from "../../redux/type";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import request from "../../utils/request";
import DropIn from "braintree-web-drop-in-react";
import { formatNumber } from "../../components/Global/FormatNumber";
import { toast } from "react-toastify";
import { paymentSuccess } from "../../redux/cartRedux";
const Payment: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState<string>("");
  const [instance, setInstance] = useState<string | any>("");
  const items = useSelector((state: IState) => state.cart.items);
  const { user } = useSelector((state: IState) => state.user as UserProps);
  const { token } = useSelector((state: IState) => state.user);
  const totalPrice = useSelector((state: IState) => state.cart.totalPrice);
  console.log(token);
  const totalPriceFormat = formatNumber(totalPrice);

  const getToken = async () => {
    try {
      const { data } = await request.get("/api/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const dataPayment = {
        userId: user?._id,
        nonce,
        items,
      };
      const { data } = await request.post(
        "/api/product/braintree/payment",
        dataPayment
      );
      dispatch(paymentSuccess());
      localStorage.removeItem("cart");
      toast.success("Thanh toán thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Breadcrumbs path={pathname} />
        <h2 className="mx-10 text-3xl font-bold mb-4">Thanh toán</h2>
        <div className="mx-10 mt-10">
          <Card>
            <div className="w-full">
              <div className="flex items-center text-textHover">
                <CiLocationOn />
                <h2 className="text-lg">Địa chỉ nhận hàng</h2>
              </div>
              <div className="flex">
                <h2 className="pr-2 font-bold">{user?.name}</h2>
                <p className="pr-4 font-bold">{user?.phoneNumber}</p>
                <p className="pr-2">{user?.address}</p>
                <Button
                  to="/account"
                  className="text-textHover text-sm font-bold"
                >
                  Thay đổi
                </Button>
              </div>
            </div>
          </Card>
          <Card>
            <div className="w-full">
              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b pb-6">
                    <th className="text-left">Hình ảnh</th>
                    <th className="text-left">Tên sản phẩm</th>
                    <th className="text-left">Giá</th>
                    <th className="text-left">Số lượng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item?._id} className="border-b h-28">
                      <td>
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </td>
                      <td>{item?.name}</td>
                      <td>{formatNumber(item?.price as number)} VND</td>
                      <td>
                        <div className="flex items-center h-10">
                          <p className="mx-4 w-5 h-5 text-center">
                            {item?.quantityCart}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-end mb-2">
                <h3 className="text-xl font-bold">Tổng tiền</h3>
                <span className="ml-10">{totalPriceFormat} VND</span>
              </div>
            </div>
          </Card>
          {!clientToken || !token ? (
            ""
          ) : (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button
                className="text-white bg-textHover px-10 py-1.5 rounded-lg"
                onClick={handlePayment}
              >
                Đặt hàng
              </button>
            </>
          )}
        </div>
        <ChooseOur />
      </div>
    </>
  );
};

export default Payment;
