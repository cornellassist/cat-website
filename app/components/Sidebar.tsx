import { HomeIcon } from "@heroicons/react/24/solid";
import {
  SquaresPlusIcon,
  UserGroupIcon,
  PhotoIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const iconStyles = "h-5 w-5";

export function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const supabase = createClient();

  type TabProp = {
    label: string;
    icon: any;
    isActive?: boolean;
    dropdown?: string[];
  };

  const tabs: TabProp[] = [
    { label: "Home", icon: HomeIcon },
    {
      label: "Components",
      icon: SquaresPlusIcon,
      dropdown: [
        "Projects",
        "Community Highlights",
        "Events",
        "Sponsors",
        "Members",
      ],
    },
    { label: "Images", icon: PhotoIcon },
    { label: "Team", icon: UserGroupIcon },
  ];

  function Tab({ label, icon, isActive, dropdown }: TabProp) {
    const [dropOn, setDropOn] = useState<boolean>(path.includes(label));
    const Icon = icon;
    return (
      <div className="flex flex-col mx-1.5 select-none ">
        <div
          className={`px-5 flex items-center justify-between h-12 ${isActive ? "bg-text-lt-grey" : "bg-transparent"} cursor-pointer rounded-sm`}
          onClick={() => {
            if (!dropdown) {
              const routeToPath =
                label === "Home"
                  ? "/AdminDashboard"
                  : `/AdminDashboard/${label}`;
              router.push(routeToPath);
            } else {
              setDropOn(!dropOn);
            }
          }}
        >
          <div className="flex items-center gap-2">
            <Icon className={iconStyles} />
            <div>{label}</div>
          </div>
          {dropdown &&
            (!dropOn ? (
              <ChevronDownIcon className={iconStyles} />
            ) : (
              <ChevronUpIcon className={iconStyles} />
            ))}
        </div>
        {dropdown && (
          <div
            className={`flex flex-col gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
              dropOn ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {dropdown.map((entry, index) => {
              console.log(label);
              console.log("entry: ", entry);
              return (
                <div
                  className={`pl-12 pr-5 descriptext cursor-pointer ${path.includes(entry) ? "bg-text-lt-grey" : "bg-transparent"} rounded-sm`}
                  key={index}
                  onClick={() => {
                    router.push(
                      `/AdminDashboard/${label}/${entry.split(" ").join("")}`,
                    );
                  }}
                >
                  {entry}
                </div>
              );
            })}{" "}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col h-screen w-70 subtext justify-between
    backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="flex flex-col gap-6 w-full mt-30">
        {tabs.map((tab, index) => {
          const splitPath = path.split("/");
          const curPath = splitPath.length > 2 ? splitPath.pop() : "Home";
          return (
            <Tab
              label={tab.label}
              icon={tab.icon}
              key={index}
              isActive={tab.label === curPath}
              dropdown={tab?.dropdown}
            />
          );
        })}
      </div>
    </div>
  );
}
