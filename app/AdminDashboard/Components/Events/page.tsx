"use client";
import { DashboardWrapper } from "@/app/components/AdminDashboard/DashboardWrapper";
import { useState, useEffect, cache } from "react";
import { AdminTable } from "@/app/components/AdminDashboard/AdminTable";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState<any[]>();

  useEffect(() => {
    async function getEvents() {
      try {
        // const cachedHighlights = localStorage.getItem("highlights");
        // if (cachedHighlights) {
        //   console.log("in cache");
        //   setHighlights(JSON.parse(cachedHighlights));
        //   return;
        // }
        // console.log("not in cache");
        const { data } = await axios.get("/api/events");
        setEvents(data);
        // localStorage.setItem("highlights", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
    getEvents();
  }, []);

  const handleUpdate = async (
    rowIndex: number,
    field: string,
    value: string,
  ) => {
    const row = events?.[rowIndex];
    if (!row) return;
    await axios.patch("/api/events", { id: row.id, field, value });
  };

  return (
    <DashboardWrapper>
      <AdminTable data={events} update={handleUpdate} />
    </DashboardWrapper>
  );
}
