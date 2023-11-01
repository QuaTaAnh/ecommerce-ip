import ChooseOur from "../../components/Global/ChooseOur";
import MySlider from "../../components/MySlider/MySlider";

const Home: React.FC = () => {
  return (
    <>
      <div className="px-10">
        <MySlider />
      </div>
      <ChooseOur />
    </>
  );
};

export default Home;
