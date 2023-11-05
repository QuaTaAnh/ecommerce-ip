import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import request from "../../utils/request";
import { ProductProps } from "../../pages/Admin/type";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const MySlider: React.FC = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [categoryBanner, getCategoryBanner] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await request.get(
        `/api/category/get-category-by-type/slider`
      );
      getCategoryBanner(result.data);
    };
    fetchApi();
  }, []);

  return (
    <Slider {...settings}>
      {categoryBanner.map((product) => {
        return (
          <Button
            className="w-full h-[600px]"
            onClick={() => navigate(`/category/${product.slug}`)}
          >
            <img
              src={product.image}
              alt="Slide"
              className="object-cover w-full h-full rounded-md"
            />
          </Button>
        );
      })}
    </Slider>
  );
};

export default MySlider;
