"use client";
import { DashboardWrapper } from "@/app/components/DashboardWrapper";
import { useEffect, useState } from "react";
import { AdminTable } from "@/app/components/AdminTable";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();


export default function Projects() {
  const [projects, setProjects] = useState<any[]>();
  useEffect(() => {
    async function getProjects() {
      // no need for auth check here
      try {
        // const cachedProjects = localStorage.getItem("projects");
        // if (cachedProjects) {
        //   console.log("in cache");
        //   setProjects(JSON.parse(cachedProjects));
        //   console.log(JSON.parse(cachedProjects));
        //   return;
        // }
        // console.log("not in cache");
        const { data } = await axios.get("/api/projects");
        setProjects(data);
        setProjects(data);
        // localStorage.setItem("projects", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
    getProjects();
  }, []);

  const handleUpdate = async (rowIndex: number, field: string, value: string) => {
    const row = projects?.[rowIndex];
    if (!row) return;
    await axios.patch("/api/projects", { id: row.id, field, value });
  };


  return (
    <DashboardWrapper>
      <AdminTable data={projects} update={handleUpdate} />
    </DashboardWrapper>
  );
}
