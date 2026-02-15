"use client";

import { useState } from "react";

export function ExploreOurTeams() {
  const [active, setActive] = useState("all");
  const teams = [
    {id: "teamLeads", name: "Team Leads"},
    {id: "engineering", name: "Engineering"},
    {id: "outreachAndEducation", name: "Outreach & Education"},
    {id: "operations", name: "Operations"}
    ];

  const scrollToSection = (id : any) => {
    setActive(id);
    const selectedElement = id === "all" ? document.getElementById("teamLeads") : document.getElementById(id);
    selectedElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  let subteamsList = teams.map((subteam) => subteam.id);
  subteamsList = ["all"].concat(subteamsList);


  return (
    <div className="bg-gradient-to-b from-transparent to-[#D1D1D1] mt-5">
        <h2 className="heading !text-black text-center">Explore Our Teams</h2>
        <div className="flex justify-center gap-3 py-6">
        {
        subteamsList.map((id) => (
            <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${active === id ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            {id === "all" ? "All" : teams.find((subteam) => subteam.id === id)?.name}
            </button>
        ))}
        </div>
    </div>

  );
}