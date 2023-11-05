import ChooseOur from "../../components/Global/ChooseOur";
import MyCategory from "../../components/MyCategory/MyCategory";
import MySlider from "../../components/MySlider/MySlider";

const Home: React.FC = () => {
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
