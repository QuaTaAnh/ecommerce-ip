import React from "react";
import { CustomTableProps } from "../type";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  actions,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 border-2 mt-6">
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
        {data.map((row: any, index: any) => (
          <tr key={index} className="hover:bg-primary dark:hover:bg-indigo-800">
            {columns.map((column) => (
              <>
                <td key={column.value} className="px-6 py-2 whitespace-nowrap">
                  {row[column.value]}
                </td>
              </>
            ))}
            {actions ? (
              <td className="flex items-center px-6 py-2">
                <button
                  className="cursor-pointer p-1 mr-4 bg-primary dark:bg-indigo-800 rounded-lg"
                  onClick={() => onEdit(row)}
                >
                  <AiOutlineEdit />
                </button>
                <div
                  className="cursor-pointer p-1 bg-primary dark:bg-indigo-800 rounded-lg"
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
  );
};

export default CustomTable;
