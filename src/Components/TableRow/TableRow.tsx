import React from "react";
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";

export interface IFrequency {
  daily: string;
  weekly: string;
  monthly: string;
  "": string;
}

export interface IWeek {
  Sun: string;
  Mon: string;
  Tue: string;
  Wed: string;
  Thu: string;
  Fri: string;
  Sat: string;
}

export interface IMonth {
  "First Monday": string;
  "Last Friday": string;
}

interface TableRowProps {
  title: string;
  description: string;
  subject: string;
  schedule: string;
  frequency: IFrequency;
  repeat: IMonth | IWeek;
  onEdit: () => void;
  onDelete: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  title,
  description,
  subject,
  schedule,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b border-gray-200 bg-white">
      <td className="px-4 py-2 flex justify-start items-center">{title}</td>
      <td className="px-4 py-2 max-w-[440px]">{description}</td>
      <td className="px-4 py-2 flex justify-start items-center">{subject}</td>
      <td className="px-4 py-2 align-top">{schedule}</td>
      <td className="px-4 py-2 flex justify-start gap-2 h-[100%]">
        <button className="text-blue-500 hover:text-blue-700" onClick={onEdit}>
          <img src={Edit} alt="Example Icon" />
        </button>
        <button
          className="text-red-500 hover:text-red-700 ml-2"
          onClick={onDelete}
        >
          <img src={Delete} alt="Example Icon" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
