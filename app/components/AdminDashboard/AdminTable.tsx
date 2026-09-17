"use client";
import { useState, useEffect, ComponentProps } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  OurProjects,
  ProjectCardProps,
} from "@/app/components/OurWork/OurProjects";
import {
  CommunityHighlights,
  CommHighProps,
} from "@/app/components/Home/CommunityHighlights";
import { EventCard } from "@/app/components/OurWork/OurEvents";
import { MemberCard } from "@/app/components/AboutUs/Members";

const IMAGE_COLUMNS = ["imageUrl", "imageUrls"];

function ComponentPreview({
  component,
  row,
}: {
  component: string;
  row: Record<string, unknown>;
}) {
  switch (component) {
    case "Project":
      return (
        <OurProjects
          projects={[row as unknown as ProjectCardProps]}
          showButtons={false}
        />
      );
    case "CommunityHighlights":
      return (
        <CommunityHighlights
          events={[row as unknown as CommHighProps["events"][number]]}
        />
      );
    case "Events":
      return (
        <div
          className="backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
          rounded-[20px] pb-6 h-130 sm:h-140 md:h-160 w-full max-w-md mx-auto"
        >
          <EventCard
            {...(row as unknown as ComponentProps<typeof EventCard>)}
          />
        </div>
      );
    case "Members":
      return (
        <MemberCard
          member={row as unknown as ComponentProps<typeof MemberCard>["member"]}
          onClick={() => {}}
        />
      );
    default:
      return (
        <p className="text-theme-dk-red">
          No live preview available for this component.
        </p>
      );
  }
}

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
  const [previewImages, setPreviewImages] = useState<string[] | null>(null);
  const [previewRow, setPreviewRow] = useState<Record<string, unknown> | null>(
    null,
  );
  const [tableData, setTableData] = useState(data);
  const [pendingChanges, setPendingChanges] = useState<
    { row: number; field: string; value: string }[]
  >([]);

  const colHeaders: string[] = Object.keys(data?.[0] ?? {});

  const startEditing = (row: number, col: string, newValue: string) => {
    setEditCell({ row, col });
    setEditedValue(newValue);
  };

  const cancelEdit = () => {
    setEditCell(null);
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
          <div
            className="flex items-center gap-2"
            onClick={() => {
              window.location.href = `/AdminDashboard/CreateComponent/${path.split("/").pop()}`;
            }}
          >
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
        <div className="overflow-x-auto rounded-lg">
          <table
            className="table-fixed w-full rounded-lg overflow-hidden
          backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]"
          >
            <thead className="h-8 rounded-lg bg-text-dk-grey text-white">
              <tr>
                <th className="text-left pl-3 w-24"></th>
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
                  <td className="pl-3 relative">
                    <button
                      className="rounded-md border border-text-grey px-1 cursor-pointer
                    backdrop-blur-[2px] bg-theme-white/90 hover:bg-text-lt-grey transition-color duration-200"
                      onClick={() => setPreviewRow(entry)}
                    >
                      Preview
                    </button>
                  </td>
                  {colHeaders.map((col) => {
                    const cellValue = entry[col];
                    const isImageCol = IMAGE_COLUMNS.includes(col);

                    if (isImageCol) {
                      const urls = Array.isArray(cellValue)
                        ? cellValue
                        : cellValue
                          ? [cellValue]
                          : [];

                      return (
                        <td key={col} className="pl-3 relative">
                          <button
                            className="rounded-md border border-text-grey px-1 cursor-pointer
                          backdrop-blur-[2px] bg-theme-white/90 hover:bg-text-lt-grey transition-color duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={urls.length === 0}
                            onClick={() => setPreviewImages(urls)}
                          >
                            {urls.length === 0 ? "None" : "Show"}
                          </button>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={col}
                        className="pl-3 relative"
                        onClick={() => startEditing(rowIndex, col, cellValue)}
                      >
                        <span className="block cursor-pointer truncate">
                          {cellValue === null || cellValue === undefined ? (
                            <span className="text-theme-dk-red">None</span>
                          ) : (
                            String(cellValue)
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editCell && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full max-w-lg mx-4 p-6 flex flex-col gap-4 backdrop-blur-[2px] bg-theme-white
            shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] rounded-xl"
          >
            <h3 className="subheading">{editCell.col}</h3>
            <textarea
              className="w-full min-h-40 border border-blue-400 rounded px-1.5 py-0.5 text-sm outline-none
              focus:ring-2 focus:ring-blue-300 bg-white"
              autoFocus
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="descriptext rounded-lg border border-text-grey px-3 py-1 cursor-pointer
                backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
                hover:bg-text-lt-grey transition-color duration-200"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button
                className="bg-theme-red text-white py-2 px-4 rounded-lg hover:bg-theme-red/80 transition-colors duration-200 cursor-pointer"
                onClick={commitEdit}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {previewImages && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setPreviewImages(null)}
          />
          <div
            className="relative w-full max-w-2xl mx-4 p-6 flex flex-col gap-4 backdrop-blur-[2px] bg-theme-white
            shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] rounded-xl max-h-[80vh] overflow-y-auto"
          >
            <h3 className="subheading">Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {previewImages.map((url, i) => (
                <div key={i} className="relative w-full h-48">
                  <Image
                    src={url}
                    alt={`Preview ${i + 1}`}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="descriptext rounded-lg border border-text-grey px-3 py-1 cursor-pointer
                backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
                hover:bg-text-lt-grey transition-color duration-200"
                onClick={() => setPreviewImages(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {previewRow && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setPreviewRow(null)}
          />
          <div
            className="relative w-[95vw] max-w-[1400px] mx-4 p-6 flex flex-col gap-4 backdrop-blur-[2px] bg-theme-white
            shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] rounded-xl max-h-[92vh] overflow-auto"
          >
            <div className="flex justify-end">
              <button
                className="descriptext rounded-lg border border-text-grey px-3 py-1 cursor-pointer
                backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
                hover:bg-text-lt-grey transition-color duration-200"
                onClick={() => setPreviewRow(null)}
              >
                Close
              </button>
            </div>
            <ComponentPreview
              component={path.split("/").pop() ?? ""}
              row={previewRow}
            />
          </div>
        </div>
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
