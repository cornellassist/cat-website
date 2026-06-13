"use client";
import { EventCard } from "@/app/components/OurWork/OurEvents";
import { useState } from "react";
import { AddComponent } from "@/app/components/AdminDashboard/AddComponent";

const componentCategories = [
  "Blog",
  "Highlight",
  "Member",
  "Project",
  "Sponsors",
  "Event",
] as const; // for readonly, type assertion

export type AddComponentProps = {
  componentCategory?: (typeof componentCategories)[number];
};

export default function CreateComponent() {
  return (
    <div>
      <AddComponent componentCategory="Event" />
      <AddComponent componentCategory="Blog" />
      <AddComponent componentCategory="Highlight" />
      <AddComponent componentCategory="Member" />
      <AddComponent componentCategory="Project" />
    </div>
  );
}
