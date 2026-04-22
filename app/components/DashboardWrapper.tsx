import { ProfileMenu } from "../components/ProfileMenu";
import { Sidebar } from "../components/Sidebar";
import Image from "next/image";
import BlurTL from "@/public/assets/blur-tl.png";
import BlurTR from "@/public/assets/blur-tr.png";

export function DashboardWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen w-screen relative">
      <div className="pl-70 ">
        <Sidebar />
        <div className="flex justify-end">
          <ProfileMenu />
        </div>
        {children}
      </div>
      <Image
        src={BlurTL}
        alt=""
        height={BlurTL.height / 2}
        width={BlurTL.width / 2}
        className="absolute left-60 top-0 -z-10"
      />
      <Image
        src={BlurTR}
        alt=""
        height={BlurTR.height}
        width={BlurTR.width}
        className="absolute right-0 -bottom-10 -z-10 rotate-90"
      />
    </div>
  );
}
