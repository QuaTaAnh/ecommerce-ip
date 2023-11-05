import { ProductProps } from "../pages/Admin/type";

export interface IUser {
  _id?: string;
  name?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  role?: number;
}

export interface UserProps {
  user: IUser;
  token: string;
  success?: boolean;
  message?: string;
}

export interface ProfileProps {
  file?: string;
  avtURL?: string;
}

export interface CartProps {
  items: ProductProps[];
  totalPrice: number;
  quantityCart: number;
}
