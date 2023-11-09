import { useEffect } from "react";
import ChooseOur from "../../components/Global/ChooseOur";
import MyCategory from "../../components/MyCategory/MyCategory";
import MySlider from "../../components/MySlider/MySlider";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "iPhone số 1 Hà Nội";
  }, []);
  return (
    <>
      <div className="px-10">
        <MySlider />
      </div>
      <ChooseOur />
      <MyCategory />
    </>
  );
};

export default Home;
