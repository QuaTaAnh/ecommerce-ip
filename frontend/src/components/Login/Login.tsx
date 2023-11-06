import Modal from "../Modal/Modal";
import Logo from "../../assets/images/logo.svg";
import { LoginProps } from "../type";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login as loginFunction } from "../../utils/auth";
import { IUser } from "../../redux/type";
import Register from "../Register/Register";
import { useForm } from "react-hook-form";

const Login: React.FC<LoginProps> = ({
  isOpenLogin,
  setIsOpenLogin,
  isOpenRegister,
  setIsOpenRegister,
}: LoginProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = (data: IUser) => {
    console.log(data);
    try {
      loginFunction(dispatch, data).then((res: any) => {
        if (res && res?.data?.success === true) {
          toast.success(res && res?.data?.message);
          localStorage.setItem("auth", JSON.stringify(res.data));
          closeModal();
        } else {
          toast.error(res?.data?.message);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi");
    }
  };

  const closeModal = () => {
    setIsOpenLogin(false);
    setIsOpenRegister(false);
    reset();
  };

  return (
    <Modal isOpen={isOpenLogin} onClose={closeModal}>
      <div className="flex flex-col justify-center items-center">
        <img
          src={Logo}
          alt="Iphone"
          className="w-10 h-10 rounded-full bg-textHover"
        />
        <h2 className="text-2xl text-center font-semibold mb-4 py-5">
          Chào mừng đến với Apple
        </h2>
      </div>
      {isOpenRegister ? (
        <Register setIsOpenRegister={setIsOpenRegister} />
      ) : (
        <>
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="flex flex-col justify-center items-center">
              <div className="mb-6 flex justify-center flex-col">
                <input
                  {...register("email", { required: true })}
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    Vui lòng nhập trường này!
                  </p>
                )}
              </div>
              <div className="mb-2 flex justify-center flex-col">
                <input
                  {...register("password", { required: true })}
                  name="password"
                  placeholder="Mật khẩu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    Vui lòng nhập trường này!
                  </p>
                )}
              </div>
            </div>
            <div className="mb-2 text-right pr-20">
              <a href="" className="text-xs">
                Quên mật khẩu?
              </a>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-sm text-white bg-bgDark py-2 px-5 rounded-3xl hover:opacity-80 bg-textHover"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-center">
            Bạn chưa có tài khoản ư?{" "}
            <button
              className="underline text-textHover"
              onClick={() => setIsOpenRegister(true)}
            >
              Đăng kí
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Login;
