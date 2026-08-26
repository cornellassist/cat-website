"use client";

import { DashboardWrapper } from "@/app/components/AdminDashboard/DashboardWrapper";
import { useEffect, useState } from "react";
import { AdminTable } from "@/app/components/AdminDashboard/AdminTable";
import axios from "axios";

export default function Members() {
  const [members, setMembers] = useState<any[]>();

  useEffect(() => {
    async function getMembers() {
      try {
        const { data } = await axios.get("/api/members");
        setMembers(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to fetch members:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
        } else {
          console.error("Failed to fetch members:", error);
        }
      }
    }
    getMembers();
  }, []);

  return (
    <DashboardWrapper>
      <AdminTable data={members} />
    </DashboardWrapper>
  );
}
