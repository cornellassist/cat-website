"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const borderStyles = "border-theme-grey";

function getRoleBadgeClass(role: string) {
  if (role === "TEAM_LEADS") {
    return "bg-gray-50 text-gray-600";
  }
  if (role === "OPERATIONS_LEADS" || role === "OPERATIONS") {
    return "bg-blue-50 text-blue-600";
  }
  if (role === "ENGINEERING_LEADS" || role === "ENGINEERING") {
    return "bg-red-50 text-red-600";
  }
  return "bg-green-50 text-green-600";
}

function renderCellContent(header: string, value: unknown) {
  if (value == null) {
    return <span className="text-theme-dk-red">None</span>;
  }

  if (Array.isArray(value)) {
    return `[${value.join(", ")}]`;
  }

  if (header === "role" && typeof value === "string") {
    return (
      <span
        className={`inline-block text-xs px-2 py-1 rounded ${getRoleBadgeClass(value)}`}
      >
        {value}
      </span>
    );
  }

  return String(value);
}

function CreateButton({ path }: { path: string }) {
  return (
    <button
      className="descriptext rounded-lg border border-text-grey px-3 py-1 cursor-pointer 
        backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] hover:bg-text-lt-grey
        transition-color duration-200"
      onClick={() => {}}
    >
      <div className="flex items-center gap-2">
        <PlusCircleIcon className="h-5 w-5 text-theme-red" />
        <div>Create New {path.split("/").pop()}</div>
      </div>
    </button>
  );
}

export function AdminTable({ data }: { data?: any[] }) {
  const path = usePathname();
  const colHeaders: string[] = Object.keys(data?.[0] ?? {});
  return (
    <div className="mx-10 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="heading">{path.split("/").pop()} Table</h2>
        {/* here */}
        <CreateButton path={path} />
      </div>
      {!data ? (
        <div className="h-8 rounded-t-lg bg-text-dk-grey text-white pl-3 text-left font-bold">
          Loading...
        </div>
      ) : (
        <table
          className="table-fixed w-full rounded-lg overflow-hidden
      backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]"
        >
          <thead className="h-8 rounded-lg bg-text-dk-grey text-white">
            <tr>
              {colHeaders.map((header, index) => {
                return (
                  <th key={index} className="text-center truncate pl-3">
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((entry, index) => {
              return (
                <tr
                  key={index}
                  className={`text-left truncate h-15 border-collapse border-b last:border-0 hover:bg-text-lt-grey transition-colors duration-200 ${borderStyles}`}
                >
                  {colHeaders.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className={`overflow-x-scroll pl-3 border-x last:border-0 first:border-0 ${borderStyles}`}
                    >
                      {renderCellContent(header, entry[header])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
