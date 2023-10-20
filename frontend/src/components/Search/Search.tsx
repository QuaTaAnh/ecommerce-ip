import { ChangeEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search: React.FC = () => {
  const [dataSearch, setDataSearch] = useState<string[]>([]);
  const data = ["aa", "bb"];
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setDataSearch([]);
      return false;
    }
    setDataSearch(data.filter((w) => w.includes(e.target.value)).slice(0, 8));
  };

  return (
    <form className=" relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Tìm kiếm sản phẩm"
          className="w-[400px] h-8 p-4 text-sm rounded-full bg-bgInput dark:bg-slate-800 outline-none"
          onChange={(e) => handleSearch(e)}
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary dark:bg-slate-600 rounded-full">
          <AiOutlineSearch />
        </button>
      </div>

      {dataSearch.length > 0 && (
        <div className="absolute top-12 p-2 text-sm bg-bgInput dark:bg-slate-800 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {dataSearch.map((s) => (
            <span>{s}</span>
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
