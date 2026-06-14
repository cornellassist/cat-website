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
        console.error(error);
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
