import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Breadcrumbs: React.FC<{ path: string }> = ({
  path,
}: {
  path: string;
}) => {
  const parts = path.split("/").filter((part) => part !== "");
  const breadcrumbItems = [{ text: "Trang chủ", url: "/" }];
  const navigate = useNavigate();

  for (let i = 0; i < parts.length; i++) {
    breadcrumbItems.push({
      text: parts[i],
      url: `/${parts.slice(0, i + 1).join("/")}`,
    });
  }

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="text-sm text-center" aria-label="Breadcrumb">
      <ol className="list-none py-3 px-8 inline-flex bg-primary dark:bg-bgModalDark rounded-3xl">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <div className="px-1">
                <AiOutlineRight />
              </div>
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-lg capitalize text-textHover">
                {item.text === "Home" ? (
                  <a
                    href="#"
                    onClick={handleHomeClick}
                    className="no-underline cursor-pointer text-lg capitalize"
                  >
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </span>
            ) : (
              <a href={item.url} className="text-lg capitalize">
                {item.text}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
