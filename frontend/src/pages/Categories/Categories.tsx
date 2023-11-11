import MyCategory from "../../components/MyCategory/MyCategory";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";

const Categories: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="text-[60px] py-5 text-center font-bold text-textHover">
        Danh mục
      </div>
      <Breadcrumbs path={pathname} />
      <MyCategory />
    </>
  );
};

export default Categories;
