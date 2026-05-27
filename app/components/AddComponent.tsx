"use client";
import { EventCard } from "@/app/components/OurEvents";
import { OurProjects, type ProjectCardProps } from "./OurProjects";
import { useState, useEffect } from "react";
import portraitPlaceholder from "@/public/assets/AboutUs/ProfilePics/portrait-placeholder.png";
import axios from "axios";
import type { AddComponentProps } from "../AdminDashboard/CreateComponent/page";
// TODO: import all relevant component cards that need to be displayed
const tagSelections = [
  "In-Person",
  "Virtual",
  "Panel",
  "Workshop",
  "All Ages",
  "Seniors",
  "Kids",
];

type Field = {
  name: string;
  type: string;
  isRequired: boolean;
};

type EventPayload = {
  title: string;
  tags: string[];
  descrip: string;
  date: Date;
  time: string;
  location: string;
  imageUrl: string;
};

const inputCss = "border border-gray-300 rounded w-full p-2 mb-4";

function FormField({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (name: string, val: string) => void;
}) {
  // if (field.type === "String[]") return; //  a special field that needs custom component
  const capitalizedName = field.name[0].toUpperCase() + field.name.slice(1);
  function renderField() {
    switch (field.type) {
      case "String":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputCss}
            placeholder={field.name}
          />
        );
      case "Int":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value.slice(0, 50))}
            className={inputCss}
          />
        );
      case "DateTime":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputCss}
          />
        );
      default:
        return <div>Unidentified type</div>;
    }
  }
  return (
    <div className="flex flex-col">
      <h2 className="subheading">
        {capitalizedName}
        {field.isRequired && <span className="text-theme-dk-red">*</span>}
      </h2>
      {renderField()}
    </div>
  );
}

export function AddComponent({ componentCategory }: AddComponentProps) {
  const [eventFields, setEventFields] = useState([]);
  const [highlightFields, setHighlightFields] = useState([]);
  const [projectFields, setProjectFields] = useState([]);

  async function getEventFields() {
    try {
      const fields = await (
        await fetch("/api/events/fields", { method: "GET" })
      ).json();
      // console.log(fields);
      setEventFields(fields);
    } catch (error) {
      console.error(error);
    }
  }

  async function getHighlightFields() {
    try {
      const fields = await (
        await fetch("/api/highlights/fields", { method: "GET" })
      ).json();
      setHighlightFields(fields);
    } catch (error) {
      console.log(error);
    }
  }
  // GET from the project fields endpoint
  async function getProjectFields() {
    try {
      const fields = await (
        await fetch("/api/projects/fields", { method: "GET" })
      ).json();
      // console.log(fields);
      setProjectFields(fields);
    } catch (error) {
      console.error(error);
    }
  }
  // map of componentCategories to their GET endpoint call
  const getMap = {
    Event: getEventFields,
    Highlight: getHighlightFields,
    Blog: () => {},
    Member: () => {},
    Project: getProjectFields,
    Sponsors: () => {},
  };

  // on every render, call the component type's respective function to perform GET request for fields
  useEffect(() => {
    getMap[componentCategory ?? "Event"]?.();
  }, []);

  // helper to construct Event obj for POST request body
  function constructEventObj({
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

  // helper to construct Project obj for POST request body
  function constructProjectObj({
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

  // POST to the Event endpoint
  async function postEvent() {
    try {
      const body = constructEventObj({ formData, tags });
      const res = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to post, ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const postMap = {
    Event: postEvent,
    Blog: () => {},
    Highlight: () => {},
    Member: () => {},
    Project: () => {},
    Sponsors: () => {},
  };

  function postDispatcher() {
    try {
      if (!postMap[componentCategory ?? "Event"])
        throw new Error("Incomplete post mapping");
      postMap["Event"]?.();
      alert(`The ${componentCategory} was succesfully added.`);
    } catch (error) {
      console.error(error);
    }
  }

  function isURL(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  // TODO: Make API GET() call to storage with param projects, to get all project images available

  // TODO: Make API POST() function to be able to add images

  const [formData, setFormData] = useState<Record<string, string>>({});

  // component-specific state variables
  // event
  const [tags, setTags] = useState<string[]>([]);

  // project
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageAlts, setImageAlts] = useState<string[]>([]);

  function toggleTag(tag: string) {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 w-full lg:w:1/2 border-r border-gray-100 p-15 ovrflow-y-auto">
        <div className="border border-gray-200 rounded-2xl p-8">
          <form className="">
            <h1 className="mainheading">
              Add {componentCategory ?? "Event"} Component
            </h1>
            {componentCategory === "Event" &&
              eventFields.map((e: Field) => (
                <FormField
                  key={e.name}
                  field={e}
                  value={formData[e.name] ?? ""}
                  onChange={(name, val) =>
                    setFormData((prev) => ({ ...prev, [name]: val }))
                  }
                />
              ))}
            {componentCategory === "Highlight" &&
              highlightFields.map((h: Field) => (
                <FormField
                  key={h.name}
                  field={h}
                  value={formData[h.name] ?? ""}
                  onChange={(name, val) =>
                    setFormData((prev) => ({ ...prev, [name]: val }))
                  }
                />
              ))}
            {componentCategory === "Project" &&
              projectFields.map((p: Field) => (
                <FormField
                  key={p.name}
                  field={p}
                  value={formData[p.name] ?? ""}
                  onChange={(name, val) =>
                    setFormData((prev) => ({ ...prev, [name]: val }))
                  }
                />
              ))}
            {/* Todo */}
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded mb-4 inline-block"
            >
              Upload image
            </label>
            {/* Custom form fields */}
            {/* tags in Event */}
            {componentCategory === "Event" && (
              <div>
                <h2 className="subheading mb-1">Tag</h2>
                {tagSelections.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2 cursor-pointer pl-1"
                  >
                    <input
                      type="checkbox"
                      checked={tags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="accent-red-500"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
                <p className="text-xs text-gray-400 mt-1 mb-4">
                  Maximum tags: 4
                </p>
              </div>
            )}
            {/* todo: imageUrls */}
            {/* todo: imageAlts */}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-7 w-full"
              onClick={() => {
                postDispatcher();
              }}
            >
              Create Component
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 items-start justify-start p-12">
        <h1 className="mt-5 mb-5">Preview</h1>
        <div className="bg-white rounded-[20px] 2xl:w-137.5 xl:w-125 h-140 border border-gray-100 mx-auto">
          {/* EventCard */}
          {componentCategory === "Event" && (
            <EventCard
              title={formData["title"] ?? "Event Title"}
              descrip={
                formData["descrip"] ?? "A short description of the event..."
              }
              date={formData["date"]}
              time={formData["time"] ?? "12:00 PM - 2:00 PM"}
              location={formData["location"]}
              imageUrl={
                !(isURL(formData["imageUrl"]) && formData["imageUrl"])
                  ? portraitPlaceholder.src
                  : formData["imageUrl"]
              }
              tags={tags as any}
            />
          )}
          {/* Project */}
          {componentCategory === "Project" && (
            <OurProjects projects={[]} showButtons={false} />
          )}
        </div>
      </div>
    </div>
  );
}
{
  /* <h2 className="subheading">Title</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 50))}
              className={inputCss}
              placeholder="Event Title"
            />
            <p className="text-xs text-gray-400 -mt-3 mb-4 text-right">
              {title.length}/50
            </p>

            <h2 className="subheading">Description</h2>
            <textarea
              value={descrip}
              onChange={(e) => setDescrip(e.target.value.slice(0, 300))}
              className={inputCss}
              placeholder="Description..."
            />
            <p className="text-xs text-gray-400 -mt-3 mb-4 text-right">
              {descrip.length}/300
            </p>

            <h2 className="subheading">Date</h2>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCss}
              placeholder="Date: MM/DD/YYYY"
            />

            <h2 className="subheading">Time</h2>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputCss}
              placeholder="Start Time - End Time"
            />

            <h2 className="subheading">Location URL</h2>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputCss}
              placeholder="Location URL"
            />

            <h2 className="subheading">Image</h2>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setImageURL(reader.result as string);
                reader.readAsDataURL(file);
              }}
              className="hidden"
            /> */
}
