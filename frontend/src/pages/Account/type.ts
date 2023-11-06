import { IUser } from "../../redux/type";

export interface EditUserProps {
  isOpenEdit: boolean;
  setIsOpenEdit: (open: boolean) => void;
  user: IUser;
}
