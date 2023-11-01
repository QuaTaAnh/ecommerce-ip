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

  const [productBanner, getProductBanner] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await request.get(`/api/product/get-product-banner`);
      getProductBanner(result.data);
    };
    fetchApi();
  }, []);

  return (
    <Slider {...settings}>
      {productBanner.map((product) => {
        const productImageUrl = `http://localhost:8080/api/product/image-product/${product._id}`;
        return (
          <Button
            className="w-full h-[600px]"
            onClick={() => navigate(`/category/${product.slug}`)}
          >
            <img
              src={productImageUrl}
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
