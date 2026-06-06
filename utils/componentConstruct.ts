import type { ProjectCardProps } from "@/app/components/OurProjects";

interface EventPayload {
  title: string;
  tags: string[];
  descrip: string;
  date: Date;
  time: string;
  location: string;
  imageUrl: string;
}

// helper to construct Project obj for POST request body
export function constructProjectObj({
  formData,
  imageUrls = [],
  imageAlts = [],
}: {
  formData: Record<string, string>;
  imageUrls: string[];
  imageAlts: string[];
}) {
  if (!(formData["title"] && formData["descrip"] && formData["descrip2"])) {
    throw new Error("missing project fields");
  }
  const project: ProjectCardProps = {
    title: formData["title"],
    descrip: formData["descrip"],
    ...(imageUrls && { imageUrls: imageUrls }), // opt, not from formData
    ...(formData["descrip2"] && { descrip2: "string" }), // opt
    ...(imageAlts && { imageAlts: imageAlts }), // opt, not from formData
    ...(formData["ctaLink"] && { ctaLink: formData["ctaLink"] }), // opt
    ...(formData["ctaTitle"] && { ctaTitle: "string" }), // opt
  };
  return project;
}

// helper to construct Event obj for POST request body
export function constructEventObj({
  formData,
  tags = [],
}: {
  formData: Record<string, string>;
  tags: string[];
}): EventPayload {
  if (
    !(
      formData["title"] &&
      formData["descrip"] &&
      formData["date"] &&
      formData["time"] &&
      formData["location"] &&
      formData["imageUrl"]
    )
  ) {
    throw new Error("Unfilled fields");
  }
  return {
    title: formData["title"],
    tags: tags,
    descrip: formData["descrip"],
    date: new Date(formData["date"]),
    time: formData["time"],
    location: formData["location"],
    imageUrl: formData["imageUrl"],
  };
}
