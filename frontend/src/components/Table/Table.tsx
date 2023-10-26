import React, { useState } from "react";
import { CustomTableProps } from "../type";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  actions,
  onEdit,
  onDelete,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center min-w-full">
      <table className="min-w-full divide-y divide-gray-200 border mt-6">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.value}
                className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {actions ? (
              <th
                key={"*"}
                className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {currentData.map((row: any, index: any) => (
            <tr
              key={index}
              className="hover:bg-primary dark:hover:bg-indigo-800 cursor-pointer"
            >
              {columns.map((column) => (
                <>
                  <td
                    key={column.value}
                    className="px-6 py-2 whitespace-nowrap"
                  >
                    {row[column.value]}
                  </td>
                </>
              ))}
              {actions ? (
                <td className="flex items-center px-6 py-2">
                  <button
                    className="cursor-pointer text-white p-1 mr-4 bg-textHover rounded-lg"
                    onClick={() => onEdit(row)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <div
                    className="cursor-pointer text-white p-1 bg-textHover rounded-lg"
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
                  currentPage === index + 1
                    ? "bg-primary dark:bg-textHover"
                    : ""
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
