import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/store";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";
import ChooseOur from "../../components/Global/ChooseOur";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import {
  AiOutlineDelete,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { formatNumber } from "../../components/Global/FormatNumber";
import { addItem, decreaseQuantity, removeItem } from "../../redux/cartRedux";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ProductProps } from "../Admin/type";

const Cart: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const items = useSelector((state: IState) => state.cart.items);
  const totalPrice = useSelector((state: IState) => state.cart.totalPrice);
  const { token } = useSelector((state: IState) => state.user);

  const totalPriceFormat = formatNumber(totalPrice);

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
    toast.success("Cập nhật giỏ hàng thành công!");
  };

  const handleDecreaseQuantity = (item: ProductProps) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncreaseQuantity = (item: ProductProps) => {
    dispatch(addItem(item));
  };

  const handleCheckout = () => {
    alert("Ok");
  };

  const handleMessageLogin = () => {
    toast.info("Vui lòng đăng nhập để thanh toán");
  };

  return (
    <>
      <div>
        <Breadcrumbs path={pathname} />
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="text-9xl">
              <RiDeleteBin2Line />
            </div>
            <div className="py-10 text-xl">
              Bạn cần thêm một số sản phẩm vào giỏ hàng của mình.
            </div>
          </div>
        ) : (
          <div className="mx-10 mt-10">
            <Card>
              <div className="w-full">
                <h2 className="text-3xl font-bold w-full mb-6">
                  Thông tin sản phẩm{" "}
                  <span className="text-base font-semibold">
                    ({items.length} sản phẩm)
                  </span>
                </h2>
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
                            <button
                              className="text-2xl"
                              onClick={() => handleDecreaseQuantity(item)}
                            >
                              <AiOutlineMinusCircle />
                            </button>
                            <p className="mx-4 w-5 h-5 text-center">
                              {item?.quantityCart}
                            </p>
                            <button
                              className="text-2xl"
                              onClick={() => handleIncreaseQuantity(item)}
                            >
                              <AiOutlinePlusCircle />
                            </button>
                          </div>
                        </td>
                        <td>
                          <Button
                            className="rounded-lg px-3 py-1 bg-textHover text-white hover:opacity-80 flex items-center"
                            leftIcon={<AiOutlineDelete />}
                            onClick={() => handleRemove(item?._id as string)}
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-end mb-2">
                  <h3 className="text-xl font-bold">Tổng tiền</h3>
                  <span className="ml-10">{totalPriceFormat} VND</span>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="text-white bg-textHover px-10 py-1.5 rounded-lg"
                    onClick={token ? handleCheckout : handleMessageLogin}
                  >
                    Đặt hàng
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        <ChooseOur />
      </div>
    </>
  );
};

export default Cart;
