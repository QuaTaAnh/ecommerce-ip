import { useSelector } from "react-redux";
import { IState } from "../../redux/store";

const Cart: React.FC = () => {
  const totalPrice = useSelector((state: IState) => state.cart.totalPrice);
  return <div>{totalPrice}</div>;
};

export default Cart;
