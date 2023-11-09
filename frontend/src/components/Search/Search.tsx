import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import useDebounce from "../../hooks/useDebounce";
import request from "../../utils/request";
import { ProductProps } from "../../pages/Admin/type";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const inputElement = useRef<HTMLInputElement | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState([]);
  const debounced = useDebounce(searchValue, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    //Call API
    const fetchApi = async () => {
      const result = await request.get(
        `/api/product/search-product/${debounced}`
      );

      setSearchResult(result.data);
    };
    fetchApi();
  }, [debounced]);

  const handleSearchClear = (e: ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchValue("");
    setSearchResult([]);
    inputElement.current.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return;
    }
    setSearchValue(searchValue);
    setIsOpenResult(true);
  };
  return (
    <form className=" relative">
      <div className="relative flex items-center justify-center">
        <input
          ref={inputElement}
          type="search"
          placeholder="Tìm kiếm sản phẩm"
          className="w-[360px] h-8 p-4 text-sm rounded-lg bg-bgInput shadow-lg dark:bg-bgModalDark outline-none"
          value={searchValue}
          onChange={(e) => handleChange(e)}
        />
        {searchValue && (
          <button
            className="absolute right-10 top-1/2 -translate-y-1/2 p-1 bg-primary dark:bg-slate-600 rounded-full"
            onClick={(e) => handleSearchClear(e)}
          >
            <AiOutlineClose />
          </button>
        )}
        <button className="p-2 bg-white dark:bg-slate-600 rounded-full">
          <AiOutlineSearch />
        </button>
      </div>

      {searchResult.length > 0 && isOpenResult && (
        <div className="absolute top-12 py-2 text-sm bg-bgInput shadow-lg dark:bg-bgModalDark w-full rounded-lg left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {searchResult.map((data: ProductProps) => (
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/products/${data.slug}`);
                setIsOpenResult(false);
              }}
              key={data._id}
              className="flex justify-start hover:bg-primary dark:hover:bg-indigo-800 py-1.5 px-3 rounded-lg"
            >
              <img src={data.image} alt="" className="w-10 h-10 mr-4" />
              {data.name}
            </Button>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
