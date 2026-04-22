"use client";
import { useState, useEffect } from "react";
import {
  DocumentIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];

const allTabs = ["community-highlights", "event", "project"];

export function UploadImg() {
  const [picNameList, setPicNameList] = useState<string[]>([]);
  const [picLinkList, setPicLinkList] = useState<string[]>([]);

  const [curTab, setCurTab] = useState<string>("community-highlights");
  const [file, setFile] = useState<File>();
  useEffect(() => {
    async function fetchImages(folder: string) {
      try {
        setPicNameList([]);
        const { data } = await axios.get("/api/storage", {
          params: {
            folderName: folder,
          },
        });
        console.log(data);
        setPicNameList(data);
        const links = await data.map(
          (pic: any) =>
            `${supabaseUrl}/storage/v1/object/public/cat-website-pics/${curTab}/${pic}`,
        );
        console.log(links);
        setPicLinkList(links);
      } catch (error) {
        console.error(error);
      }
    }
    fetchImages(curTab);
  }, [curTab]);

  function UploadImgButton() {
    async function postImg() {
      if (!file) return;
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", curTab);
        const res = await axios.post("/api/storage", formData);
        if (res.status === 201) {
          console.log("posted img");
          alert("The image was succesfully added. Reloading the page now.");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        alert(`The image failed to get added. Error: ${error}`);
      }
    }
    return (
      <div className="bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] pl-5 h-50 flex flex-col gap-5 pt-3 rounded-xl mb-5">
        <h2 className="subheading">
          Upload to <span className="text-theme-dk-red">{curTab}</span> Folder
        </h2>
        <div className="flex flex-col w-127 gap-2">
          <div className="flex items-center">
            <label className="cursor-pointer select-none">
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
              <div className="flex items-center justify-center gap-3 rounded-lg border-2 w-55 py-1 bg-theme-white">
                <DocumentIcon className="h-5 w-5" />
                <div>Choose Image</div>
              </div>
            </label>
            <div className="border-y-2 border-r-2 rounded-r-lg bg-text-lt-grey-2 h-9 min-w-75 -ml-2.25 flex items-center px-5">
              <div className="overflow-x-auto whitespace-nowrap w-full">
                {file && file.name}
              </div>
            </div>
          </div>
          <button
            className="flex items-center justify-center gap-3 rounded-lg border-2 border-text-dk-grey w-55 py-1 cursor-pointer 
            bg-theme-lt-red disabled:cursor-default disabled:text-text-grey"
            disabled={!file}
            onClick={async () => {
              postImg();
            }}
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            <div>Upload Image</div>
          </button>
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
              className={`${tab === curTab ? "bg-theme-dk-red text-white" : "bg-transparent text-text-dk-grey border-text-dk-grey border"}  px-3 py-1 rounded-[200px]
             select-none cursor-pointer`}
              onClick={() => {
                setCurTab(tab);
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
    );
  }

  function ImageRow() {
    async function deleteImg(folder: string, fileName: string) {
      try {
        const res = await axios.delete("/api/storage", {
          params: { folder: folder, fileName: fileName },
        });
        if (res.status === 200) {
          // idk why 204 doesnt work
          console.log("deleted sucessfully");
          alert(
            `${fileName} has been deleted from ${folder} succesfully. Reloading the page now.`,
          );
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
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
          Images: <span className="text-theme-dk-red">{curTab}</span>
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
    <div className="mx-10 flex flex-col gap-10">
      <ImageRow />
      <UploadImgButton />
    </div>
  );
}
