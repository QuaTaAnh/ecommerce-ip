import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { RiAddLine } from "react-icons/ri";

const Category: React.FC = () => {
  const [isOpenAddCategory, setIsOpenAddCategory] = useState<boolean>(false);

  return (
    <Card>
      <div className="absolute right-8 top-6">
        <Button
          className="flex items-center text-sm dark:dark:bg-indigo-800 py-2 px-5 rounded-lg bg-primary"
          leftIcon={<RiAddLine />}
          onClick={() => setIsOpenAddCategory(true)}
        >
          Thêm mới
        </Button>
      </div>
      <div className="mt-6">Xin chào lũ gà</div>
    </Card>
  );
};

export default Category;
