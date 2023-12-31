import { formatNumber } from "../Global/FormatNumber";
import { CustomTableProps } from "../type";
import { AiOutlineCopy, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  actions,
  onEdit,
  onDelete,
  onCopy,
  itemsPerPage,
  page,
  setPage,
  totalPage,
}) => {
  const totalPages = Math.ceil(totalPage / itemsPerPage);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="flex flex-col items-center min-w-full">
      <table className="min-w-full divide-y divide-gray-200 border mt-6">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-base font-semibold uppercase tracking-wider">
              STT
            </th>
            {columns.map((column) => (
              <th
                key={column.value}
                className="px-4 py-3 text-left text-base font-semibold uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {actions ? (
              <th
                key={"*"}
                className="px-6 py-3 text-left text-base font-semibold uppercase tracking-wider float-right"
              >
                Actions
              </th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row: any, index: any) => (
            <tr
              key={row?._id}
              className="hover:bg-primary dark:hover:bg-indigo-800 cursor-pointer"
            >
              <td className="px-4 py-1/5 text-sm whitespace-nowrap">
                {index + 1}
              </td>
              {columns.map((column) => (
                <>
                  <td
                    key={column.value}
                    className="px-4 py-1/5 text-sm whitespace-nowrap"
                  >
                    {(() => {
                      switch (column.value) {
                        case "image":
                          return (
                            <img
                              src={row?.image}
                              alt={row?.name}
                              className="w-20 h-8"
                            />
                          );
                        case "category":
                          return row?.category?.name;
                        case "description":
                          return row?.description?.length > 28
                            ? row?.description?.slice(0, 28) + "..."
                            : row?.description;
                        case "price":
                          return formatNumber(row?.price) + " VND";
                        default:
                          return row[column.value];
                      }
                    })()}
                  </td>
                </>
              ))}
              {actions ? (
                <td className="flex items-center px-6 py-1 float-right">
                  <button
                    className="cursor-pointer text-white p-0.5 mr-2 bg-textHover rounded-lg"
                    onClick={() => onCopy(row)}
                  >
                    <AiOutlineCopy />
                  </button>
                  <button
                    className="cursor-pointer text-white p-0.5 mr-2 bg-textHover rounded-lg"
                    onClick={() => onEdit(row)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <div
                    className="cursor-pointer text-white p-0.5 bg-textHover rounded-lg"
                    onClick={() => onDelete(row)}
                  >
                    <AiOutlineDelete />
                  </div>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <nav className="flex justify-end">
          <ul className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`mr-2 inline-flex items-center px-2 py-0 border rounded-md cursor-pointer ${
                  page === index + 1 ? "bg-textHover text-white" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CustomTable;
