import Modal from "../Modal/Modal";
import Logo from "../../assets/images/logo.svg";
import { LoginProps } from "../type";

const Login: React.FC<LoginProps> = ({
  isModalLoginOpen,
  closeModal,
}: LoginProps) => {
  return (
    <Modal isOpen={isModalLoginOpen} onClose={closeModal}>
      <div className="flex flex-col justify-center items-center">
        <img
          src={Logo}
          alt="Iphone"
          className="w-10 h-10 rounded-full bg-textHover"
        />
        <h2 className="text-2xl font-semibold mb-4 py-5">
          Chào mừng đến với Apple
        </h2>
      </div>
      <form>
        <div className="mb-6 flex justify-center">
          <input
            type="email"
            id="email"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
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
    </Modal>
  );
};

export default Login;
