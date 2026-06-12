import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useRef } from "react";

export function ProfileMenu() {
  const [name, setName] = useState<string>("");

  const [dropdownHidden, setDropdownHidden] = useState<boolean>(false);
  const supabase = createClient();
  useEffect(() => {
    async function getUser() {
      try {
        // local storage cache
        const cachedName = localStorage.getItem("name");
        if (cachedName) {
          setName(cachedName);
          return;
        }
        const user = await supabase.auth.getUser();
        const name = user.data.user?.email ?? "User";

        setName(name.split("@")[0]);
        localStorage.setItem("name", name.split("@")[0]);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setDropdownHidden(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div
      className="flex flex-col items-center cursor-pointer w-40 mt-2"
      ref={ref}
      onClick={() => {
        setDropdownHidden(!dropdownHidden);
      }}
    >
      <div className="flex gap-4 mr-10 mt-3 items-center">
        <div className="bg-theme-red rounded-[2000px] w-10 h-10 flex justify-center items-center text-text-lt-grey text-xl">
          <div className="select-none">{name.charAt(0).toUpperCase()}</div>
        </div>
        <div className="subtext select-none">{name}</div>
      </div>
      <div
        className={`transition-all duration-100 overflow-hidden ${
          dropdownHidden
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } w-full`}
      >
        <div className="h-10 rounded-sm flex items-center cursor-pointer ">
          <div
            className="border px-2 py-1 rounded-lg select-none w-full text-center"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.replace("/AdminLogin");
            }}
          >
            Sign Out
          </div>
        </div>
      </div>
    </div>
  );
}
