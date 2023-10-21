export interface IUser {
  _id?: string;
  name?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
}

export interface UserProps {
  user: IUser;
  accessToken?: string;
}
