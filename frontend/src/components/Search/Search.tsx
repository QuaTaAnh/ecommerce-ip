import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import useDebounce from "../../hooks/useDebounce";
// import { request } from "../../utils/request";

const Search: React.FC = () => {
  const inputElement = useRef<HTMLInputElement | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState([]);
  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    //Call API
    const fetchApi = async () => {
      // const result = await request.search(debounced);
      // setSearchResult(result);
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
  };
  return (
    <form className=" relative">
      <div className="relative">
        <input
          ref={inputElement}
          type="search"
          placeholder="Tìm kiếm sản phẩm"
          className="w-[400px] h-8 p-4 text-sm rounded-lg bg-bgInput shadow-lg dark:bg-bgModalDark outline-none"
          value={searchValue}
          onChange={(e) => handleChange(e)}
        />
        {searchValue ? (
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary dark:bg-slate-600 rounded-full"
            onClick={(e) => handleSearchClear(e)}
          >
            <AiOutlineClose />
          </button>
        ) : (
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary dark:bg-slate-600 rounded-full">
            <AiOutlineSearch />
          </button>
        )}
      </div>

      {searchResult.length > 0 && (
        <div className="absolute top-12 p-2 text-sm bg-bgInput shadow-lg dark:bg-bgModalDark w-full rounded-lg left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {searchResult.map((s) => (
            <span>{s}</span>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
