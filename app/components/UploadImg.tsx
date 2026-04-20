"use client";
import { useState, useEffect } from "react";
import { DocumentIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
function UploadImgButton() {
  const [file, setFile] = useState<File>();
  return (
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
            <div>Choose a Picture</div>
          </div>
        </label>
        <div className="border-y-2 border-r-2 rounded-r-lg bg-text-lt-grey-2 h-9 min-w-75 -ml-2.25 -z-10 flex items-center px-5">
          <div className="overflow-x-auto whitespace-nowrap w-full">
            {file && file.name}
          </div>
        </div>
      </div>
      <button className="flex items-center justify-center gap-3 rounded-lg border-2 w-55 py-1 cursor-pointer bg-theme-lt-red">
        <ArrowUpTrayIcon className="h-5 w-5" />
        <div>Upload Picture</div>
      </button>
    </div>
  );
}

export function UploadImg() {
  const [picNameList, setPicNameList] = useState<string[]>();
  const [picLinkList, setPicLinkList] = useState<string[]>();

  const [curTab, setCurTab] = useState<string>("community-highlights");
  const [file, setFile] = useState<File>();
  useEffect(() => {
    async function fetchPictures(folder: string) {
      try {
        const { data } = await axios.get("/api/storage", {
          params: {
            folderName: folder,
          },
        });
        console.log(data);
        setPicNameList(data);
        const links = data.map(
          (pic: any) =>
            `${supabaseUrl}/storage/v1/object/public/cat-website-pics/${curTab}/${pic.name}`,
        );
        console.log(links);
        setPicLinkList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPictures(curTab);
  }, [curTab]);

  return <UploadImgButton />;
}
