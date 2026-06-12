"use client";
import { DashboardWrapper } from "@/app/components/AdminDashboard/DashboardWrapper";
import { useState, useEffect, cache } from "react";
import { AdminTable } from "@/app/components/AdminDashboard/AdminTable";
import axios from "axios";

export default function CommunityHighlights() {
  const [highlights, setHighlights] = useState<any[]>();

  useEffect(() => {
    async function getHighlights() {
      try {
        // const cachedHighlights = localStorage.getItem("highlights");
        // if (cachedHighlights) {
        //   console.log("in cache");
        //   setHighlights(JSON.parse(cachedHighlights));
        //   return;
        // }
        // console.log("not in cache");
        const { data } = await axios.get("/api/highlights");
        setHighlights(data);
        // localStorage.setItem("highlights", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
    getHighlights();
  }, []);

  return (
    <DashboardWrapper>
      <AdminTable data={highlights} />
    </DashboardWrapper>
  );
}
