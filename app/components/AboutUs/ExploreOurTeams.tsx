"use client";

import { useState } from "react";

export function ExploreOurTeams() {
  const [active, setActive] = useState("teamLeads");
  const teams = [
    { id: "teamLeads", name: "Team Leads" },
    { id: "engineering", name: "Engineering" },
    { id: "education&Advocacy", name: "Education & Advocacy" },
    { id: "business", name: "Business" },
  ];

  const scrollToSection = (id: any) => {
    setActive(id);
    const selectedElement =
      id === "all"
        ? document.getElementById("teamLeads")
        : document.getElementById(id);
    selectedElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const subteamsList = teams.map((subteam) => subteam.id);

  return (
    <div className="bg-linear-to-b from-transparent to-[#D1D1D1] mt-5 universepad">
      <h2 className="heading text-black! text-center">Explore Our Teams</h2>
      <div className="flex flex-wrap justify-center gap-3 py-6">
        {subteamsList.map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${active === id ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {id === "all"
              ? "All"
              : teams.find((subteam) => subteam.id === id)?.name}
          </button>
        ))}
      </div>
    </div>
  );
}
