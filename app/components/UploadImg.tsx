"use client";
import { useState, useEffect } from "react";
import {
  DocumentIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { postImg, getImg, deleteImg } from "@/utils/imgRequests";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] ?? "";

const allTabs = ["community-highlights", "event", "project"];

export function UploadImg() {
  const [picNameList, setPicNameList] = useState<string[]>([]);
  const [picLinkList, setPicLinkList] = useState<string[]>([]);

  const [curTab, setCurTab] = useState<string>("community-highlights");
  useEffect(() => {
    async function fetchImages(folder: string) {
      try {
        const [data, links] = (await getImg({
          folder,
        })) ?? [[], []];
        setPicNameList(data);
        setPicLinkList(links);
      } catch (error) {
        console.error(error);
      }
    }
    fetchImages(curTab);
  }, [curTab]);

  function UploadImgButton() {
    const [file, setFile] = useState<File>();

    return (
      <div className="bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] pl-5 h-50 flex flex-col gap-5 pt-3 rounded-xl mb-5">
        <h2 className="subheading">
          Upload to <span className="text-theme-red">{curTab}</span> Folder
        </h2>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col">
            <label className="w-fit cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded mb-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) {
                    setFile(event.target.files[0]);
                  }
                }}
              />
              <div className="flex gap-2 select-none">
                <ArrowUpTrayIcon className="h-5 w-5" />
                Upload image
              </div>
            </label>
            <div className="text-sm h-5">{file && file.name}</div>
          </div>
          <div>
            <button
              className="cursor-pointer hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded mb-4 flex gap-2 border disabled:hover:bg-white"
              onClick={() => {
                file && postImg({ file, folder: curTab });
              }}
              disabled={!file}
            >
              Submit Image
            </button>
          </div>
        </div>
      </div>
    );
  }

  function TabSelect() {
    return (
      <div className="flex gap-2">
        {allTabs.map((tab, index) => {
          return (
            <div
              key={index}
              className={`${tab === curTab ? "bg-theme-red text-white" : "bg-transparent text-text-dk-grey border-text-dk-grey border"}  px-3 py-1 rounded-[200px]
             select-none cursor-pointer`}
              onClick={() => {
                setCurTab(tab);
              }}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </div>
          );
        })}
      </div>
    );
  }

  function ImageRow() {
    async function download(picName: string) {
      // figure this out some time
      const url = `${supabaseUrl}/storage/v1/object/public/cat-website-pics/${curTab}/${picName}`;
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = picName;
      a.click();
      URL.revokeObjectURL(blobUrl);
    }

    return (
      <div className="flex flex-col gap-5">
        <h1 className="blackheading">
          Images: <span className="text-theme-red">{curTab}</span>
        </h1>
        <TabSelect />
        <div className="flex gap-5 flex-wrap">
          {picNameList.length > 0 ? (
            picNameList.map((picName, index) => {
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center pt-8 px-4 pb-4 hover:bg-text-lt-grey rounded-md transition-colors duration-200 relative"
                >
                  <div className="flex gap-2 items-center justify-center rounded-2xl w-15 absolute right-0 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowDownTrayIcon
                      className="cursor-pointer h-5 w-5 text-text-dk-grey"
                      onClick={() => {
                        download(picName);
                      }}
                    />
                    <TrashIcon
                      className="cursor-pointer h-5 w-5 text-theme-dk-red"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${picName}?`,
                          )
                        ) {
                          deleteImg(curTab, picName);
                        }
                      }}
                    />
                  </div>
                  <img
                    src={picLinkList?.[index] || ""}
                    className="h-40 rounded-md object-contain"
                  />
                  <div className="subtext">{picName}</div>
                </div>
              );
            })
          ) : (
            <div className="subtext h-20">Loading...</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 flex flex-col gap-10">
      <ImageRow />
      <UploadImgButton />
    </div>
  );
}
