"use client";
import { AddComponent } from "@/app/components/AdminDashboard/AddComponent";
import { useParams } from "next/navigation";

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

export default function CreateComponent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div>
      {/* <AddComponent componentCategory="Event" />
      <AddComponent componentCategory="Blog" />
      <AddComponent componentCategory="Highlight" />
      <AddComponent componentCategory="Member" /> */}
      <AddComponent
        componentCategory={slug as (typeof componentCategories)[number]}
      />
    </div>
  );
}
