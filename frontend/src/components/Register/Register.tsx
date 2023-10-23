import { RegisterProps } from "../type";
import { toast } from "react-toastify";
import { register as registerFunction } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { IUser } from "../../redux/type";

const Register: React.FC<RegisterProps> = ({
  setIsOpenRegister,
}: RegisterProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = (data: IUser) => {
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
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-6 flex justify-center flex-col">
            <input
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Họ tên"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">Vui lòng nhập trường này!</p>
            )}
          </div>
          <div className="mb-6 flex justify-center flex-col">
            <input
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">Vui lòng nhập trường này!</p>
            )}
          </div>
          <div className="mb-6 flex justify-center flex-col">
            <input
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mật khẩu"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-xs text-red-500">Vui lòng nhập trường này!</p>
            )}
          </div>
          <div className="mb-6 flex justify-center flex-col">
            <input
              name="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Số điện thoại"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">Vui lòng nhập trường này!</p>
            )}
          </div>
          <div className="mb-6 flex justify-center flex-col">
            <input
              name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Địa chỉ"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-xs text-red-500">Vui lòng nhập trường này!</p>
            )}
          </div>
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
