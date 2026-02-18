"use client";

import { Navbar } from "@/app/components/Navbar";
import { OurWorkHero } from "@/app/components/OurWorkHero";
import { OurProjects } from "@/app/components/OurProjects";
import { OurEvents } from "@/app/components/OurEvents";
import { Footer } from "@/app/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OurWork() {
  const [ourEvents, setOurEvents] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchOurEvents() {
      try {
        const { data } = await axios.get("/api/events");
        setOurEvents(data);
        // console.log("Success: \n", JSON.stringify(data));
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    async function fetchProjects() {
      try {
        const { data } = await axios.get("/api/projects");
        setProjects(data);
        // console.log("Success: \n", JSON.stringify(data));
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchOurEvents();
    fetchProjects();
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <OurWorkHero />
      <OurProjects projects={projects} />
      <OurEvents events={ourEvents} />
      <Footer />
    </div>
  );
}
