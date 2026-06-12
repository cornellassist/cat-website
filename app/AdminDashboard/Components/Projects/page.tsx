"use client";
import { DashboardWrapper } from "@/app/components/AdminDashboard/DashboardWrapper";
import { useEffect, useState } from "react";
import { AdminTable } from "@/app/components/AdminDashboard/AdminTable";
import axios from "axios";

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
        // localStorage.setItem("projects", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
    getProjects();
  }, []);
  return (
    <DashboardWrapper>
      <AdminTable data={projects} />
    </DashboardWrapper>
  );
}
