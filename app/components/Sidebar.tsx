import { useState } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { createClient } from "@/utils/supabase/client";

export function Sidebar() {
  const supabase = createClient();
  type TabProp = {
    label: string;
    icon: any;
    isActive?: boolean;
  };

  const tabs: TabProp[] = [
    { label: "Home", icon: HomeIcon },
    { label: "Components", icon: SquaresPlusIcon },
    { label: "Images", icon: PhotoIcon },
    { label: "Team", icon: UserGroupIcon },
  ];

  const [activeTab, setActiveTab] = useState<string>("Home");

  function Tab({ label, icon, isActive }: TabProp) {
    const Icon = icon;
    return (
      <div
        className={`flex items-center gap-4 h-12 ${isActive ? "bg-text-lt-grey" : "bg-transparent"} cursor-pointer pl-5 mx-1.5 rounded-sm`}
        onClick={() => {
          setActiveTab(label);
        }}
      >
        <Icon className="h-5 w-5" />
        <div>{label}</div>
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
          return (
            <Tab
              label={tab.label}
              icon={tab.icon}
              key={index}
              isActive={tab.label === activeTab}
            />
          );
        })}
      </div>

      <div
        className="bg-amber-200 cursor-pointer"
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Dev signout button
      </div>
    </div>
  );
}
