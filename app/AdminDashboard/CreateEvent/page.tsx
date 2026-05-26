"use client";
import { EventCard } from "@/app/components/OurEvents";
import { useState } from "react";
import { AddEventCard } from "@/app/components/AddEventCard";

const componentCategories = [
  "Blog",
  "Highlight",
  "Member",
  "Project",
  "Sponsors",
  "Event",
] as const; // for readonly, type assertion

export type AddEventCardProps = {
  componentCategory?: (typeof componentCategories)[number];
};

export default function CreateComponent() {
  return <AddEventCard componentCategory="Event" />;
}
