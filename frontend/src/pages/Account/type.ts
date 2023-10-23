import { IUser } from "../../redux/type";

export interface EditUserProps {
  isOpenEdit: boolean;
  setIsOpenEdit: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: IUser;
}
