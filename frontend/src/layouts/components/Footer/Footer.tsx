import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="flex justify-between px-10 py-8 bg-primary dark:bg-bgDark shadow-light dark:shadow-dark">
      <div className="flex flex-col text-base">
        <h2 className="text-lg font-bold">
          iPhone thương hiệu bán iPhone tốt nhất Hà Nội
        </h2>
        <ul>
          <li className="py-0.5">Địa chỉ: Hà Nội</li>
          <li className="py-0.5">Số điện thoại: 0123456789</li>
          <li className="py-0.5">Hotline: 0123456789</li>
          <li className="py-0.5">Email: iphone@gmail.com</li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">GIỚI THIỆU & HƯỚNG DẪN</h2>
        <ul>
          <li className="py-0.5">Về chúng tôi</li>
          <li className="py-0.5">Hướng dẫn mua hàng</li>
          <li className="py-0.5">Hình thức thanh toán</li>
          <li className="py-0.5">Mua hàng trả góp</li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">CHÍNH SÁCH</h2>
        <ul>
          <li className="py-0.5">Chính sách bảo mật</li>
          <li className="py-0.5">Chính sách kinh doanh</li>
          <li className="py-0.5">Chính sách vận chuyển</li>
          <li className="py-0.5">Chính sách bảo hành đổi trả</li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">THEO DÕI CHÚNG TÔI</h2>
        <div className="flex justify-between mt-2 text-xl">
          <span className="cursor-pointer p-2">
            <AiOutlineFacebook />
          </span>
          <span className="cursor-pointer p-2">
            <AiOutlineYoutube />
          </span>
          <span className="cursor-pointer p-2">
            <FaTiktok />
          </span>
          <span className="cursor-pointer p-2">
            <AiOutlineInstagram />
          </span>
          <span className="cursor-pointer p-2">
            <AiOutlineTwitter />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
