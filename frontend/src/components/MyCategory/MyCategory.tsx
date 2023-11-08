import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import { ProductProps } from "../../pages/Admin/type";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

const MyCategory: React.FC = () => {
  const [category, getCategory] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await request.get(
        `/api/category/get-category-by-type/categories`
      );
      getCategory(result.data);
    };
    fetchApi();
  }, []);

  return (
    <div className="mx-10 mt-10">
      <Card>
        <div className="grid grid-cols-4 gap-4">
          {category.map((product) => {
            return (
              <Button
                className="w-full"
                onClick={() => navigate(`/categories/${product.slug}`)}
              >
                <img src={product.image} alt="Slide" className="object-cover" />
                <p className="text-center text-xl font-bold pt-2">
                  {product.name}
                </p>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default MyCategory;
