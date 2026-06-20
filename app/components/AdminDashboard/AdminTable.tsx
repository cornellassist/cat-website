"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export function AdminTable({
  data,
  update,
}: {
  data?: any[];
  update?: (row: number, field: string, value: string) => void;
}) {
  const path = usePathname();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editCell, setEditCell] = useState<{ row: number; col: string } | null>(
    null,
  );
  const [editedValue, setEditedValue] = useState<string>("");
  const [tableData, setTableData] = useState(data);
  const [pendingChanges, setPendingChanges] = useState<
    { row: number; field: string; value: string }[]
  >([]);

  const colHeaders: string[] = Object.keys(data?.[0] ?? {});

  const startEditing = (row: number, col: string, newValue: string) => {
    setEditCell({ row, col });
    setEditedValue(newValue);
  };

  const commitEdit = () => {
    if (editCell) {
      const updated = tableData?.map((row, i) =>
        i === editCell.row ? { ...row, [editCell.col]: editedValue } : row,
      );
      setTableData(updated);
      setPendingChanges((prev) => [
        ...prev.filter(
          (c) => !(c.row === editCell.row && c.field === editCell.col),
        ), // dedupe
        { row: editCell.row, field: editCell.col, value: editedValue },
      ]);
      setEditCell(null);
    }
  };

  const saveChanges = async () => {
    await Promise.all(
      pendingChanges.map(({ row, field, value }) =>
        update?.(row, field, value),
      ),
    );
    setPendingChanges([]);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      commitEdit();
    }
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className="mx-10 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="heading">{path.split("/").pop()} Table</h2>
        <button
          className="descriptext rounded-lg border border-text-grey px-3 py-1 cursor-pointer 
          backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] 
          hover:bg-text-lt-grey transition-color duration-200"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="h-5 w-5 text-theme-red" />
            <div>Create New {path.split("/").pop()}</div>
          </div>
        </button>
      </div>

      {!tableData ? (
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
              {colHeaders.map((header, index) => (
                <th key={index} className="text-left truncate pl-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((entry, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-left h-15 border-collapse border-b last:border-0 hover:bg-text-lt-grey transition-colors duration-200"
              >
                {colHeaders.map((col) => {
                  const isEditing =
                    editCell?.row === rowIndex && editCell?.col === col;
                  const cellValue = entry[col];

                  return (
                    <td
                      key={col}
                      className="pl-3 relative"
                      onClick={() =>
                        !isEditing && startEditing(rowIndex, col, cellValue)
                      }
                    >
                      {isEditing ? (
                        <input
                          className="w-full border border-blue-400 rounded px-1.5 py-0.5 text-sm outline-none 
                          focus:ring-2 focus:ring-blue-300 bg-white"
                          autoFocus
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                          onKeyDown={handleEnter}
                          onBlur={commitEdit}
                        />
                      ) : (
                        <span className="block cursor-pointer truncate">
                          {cellValue ?? (
                            <span className="text-theme-dk-red">None</span>
                          )}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-end">
        <button
          className="bg-theme-red text-white py-2 px-4 rounded-lg hover:bg-theme-red/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={pendingChanges.length === 0}
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
