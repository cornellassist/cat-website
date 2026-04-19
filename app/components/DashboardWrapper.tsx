import { ProfileMenu } from "../components/ProfileMenu";
import { Sidebar } from "../components/Sidebar";

export function DashboardWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="pl-70">
      <Sidebar />
      <div className="flex justify-end">
        <ProfileMenu />
      </div>
      {children}
    </div>
  );
}
