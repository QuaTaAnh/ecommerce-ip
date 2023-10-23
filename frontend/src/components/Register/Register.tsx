import { ChangeEvent, useState } from "react";
import { RegisterDataProp, RegisterProps } from "../type";
import { toast } from "react-toastify";
import { register as registerFunction } from "../../utils/auth";
import { useDispatch } from "react-redux";

const Register: React.FC<RegisterProps> = ({
  setIsOpenRegister,
}: RegisterProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: RegisterDataProp = {
      name,
      email,
      password,
      phoneNumber,
      address,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      registerFunction(dispatch, data).then((res: any) => {
        console.log(res);
        if (res && res?.data?.success === true) {
          toast.success(res && res?.data?.message);
          setIsOpenRegister(false);
        } else {
          toast.error(res && res?.data?.message);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Họ tên"
            required
          />
        </div>
        <div className="mb-6 flex justify-center">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6 flex justify-center">
          <input
            type="password"
            id="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            id="phone"
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            id="address"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-sm text-white bg-bgDark py-2 px-5 rounded-3xl hover:opacity-80 bg-textHover"
          >
            Đăng kí
          </button>
        </div>
      </form>
      <div className="mt-6 text-sm text-center">
        Bạn đã có tài khoản?{" "}
        <button
          className="underline text-textHover"
          onClick={() => setIsOpenRegister(false)}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Register;
