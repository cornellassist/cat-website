"use client";
import { EventCard } from "@/app/components/OurWork/OurEvents";
import {
  OurProjects,
  type ProjectCardProps,
} from "@/app/components/OurWork/OurProjects";
import { useState, useEffect } from "react";
import portraitPlaceholder from "@/public/assets/AboutUs/ProfilePics/portrait-placeholder.png";
// import axios from "axios";
import type { AddComponentProps } from "@/app/AdminDashboard/CreateComponent/[slug]/page";
import {
  BlogPostCard,
  type BlogPostCardProps,
} from "@/app/components/BlogPostCard";
import {
  constructProjectObj,
  constructEventObj,
  constructBlogObj,
  constructMembersObj,
} from "@/utils/componentConstruct";
import {
  CommunityHighlights,
  type CommHighProps,
} from "@/app/components/Home/CommunityHighlights";
import {
  Members,
  MemberCard,
  type Member,
} from "@/app/components/AboutUs/Members";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ImgModal } from "./ImgModal";
import { isURL } from "@/utils/imgLoad";

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

const inputCss = "border border-gray-300 rounded w-full p-2 mb-4";

// Helper component to dynamically display any field
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
  if (field.name.toLowerCase().includes("image")) {
    return;
  }
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
            placeholder={capitalizedName}
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
      case "MemberRole":
        return (
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputCss}
          >
            <option value="">Select role</option>
            <option value="TEAM_LEADS">Lead</option>
            <option value="ENGINEERING_LEADS">Engineering Lead</option>
            <option value="OPERATIONS_LEADS">Operations Lead</option>
            <option value="OUTREACH_EDU_LEADS">
              Outreach & Education Lead
            </option>
            <option value="ENGINGEERING">Engineering</option>
            <option value="OPERATIONS">Operations</option>
            <option value="OUTREACH_EDU">Outreach & Education</option>
          </select>
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
  const [blogFields, setBlogFields] = useState([]);
  const [memberFields, setMemberFields] = useState([]);
  const [sponsorFields, setSponsorFields] = useState([]);

  const [containsImg, setContainsImg] = useState<boolean>(true);
  const [showImgModal, setShowImgModal] = useState<boolean>(false);

  const stateVarMap = {
    Event: eventFields,
    Highlight: highlightFields,
    Blog: blogFields,
    Project: projectFields,
    Member: memberFields,
    Sponsors: sponsorFields,
  };

  //  ---------------------------------
  // component-specific state variables
  //  ---------------------------------
  // event
  const [tags, setTags] = useState<string[]>([]);

  // project
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageAlts, setImageAlts] = useState<string[]>([]);
  const [blogCategories, setBlogCategories] = useState<string[]>([]);

  // client-side fetches for the names + types of fields

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

  async function getBlogFields() {
    try {
      const fields = await (
        await fetch("/api/blog/fields", { method: "GET" })
      ).json();
      setBlogFields(fields);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMemberFields() {
    // fields incomplete, needs img/headshot
    try {
      const fields = await (
        await fetch("/api/members/fields", { method: "GET" })
      ).json();
      // console.log(fields);
      setMemberFields(fields);
    } catch (error) {
      console.error(error);
    }
  }

  // map of componentCategories to their GET endpoint call
  const getMap = {
    Event: getEventFields,
    Highlight: getHighlightFields,
    Blog: getBlogFields,
    Member: getMemberFields,
    Project: getProjectFields,
    Sponsors: () => {},
  };

  // on every render, call the component type's respective function to perform GET request for fields
  useEffect(() => {
    getMap[componentCategory ?? "Event"]?.();
  }, []);

  useEffect(() => {
    setContainsImg(
      stateVarMap[componentCategory ?? "Event"].some((e: Field) => {
        return e.name.toLowerCase().includes("image");
      }),
    );
  }, [eventFields, highlightFields, blogFields, projectFields, memberFields]);

  // POST to Event
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

  // POST to project
  async function postProject() {
    try {
      const body = constructProjectObj({ formData, imageUrls, imageAlts });
      const res = await fetch("/api/projects", {
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

  // POST to blog
  async function postBlog() {
    try {
      const body = constructBlogObj({ formData, categories: blogCategories });
      const res = await fetch("/api/blog", {
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

  // POST to members
  async function postMembers() {
    try {
      const body = constructMembersObj(formData);
      const res = await fetch("/api/members", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("res: " + res.status);
      if (!res.ok) {
        throw new Error(`Failed to post, ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const postMap = {
    Event: postEvent,
    Blog: postBlog,
    Highlight: undefined,
    Member: postMembers,
    Project: postProject,
    Sponsors: undefined,
  };

  function postDispatcher() {
    try {
      if (!postMap[componentCategory ?? "Event"]) {
        alert(`No corresponding POST request found.`);
        return;
      }
      postMap["Event"]?.();
      alert(`The ${componentCategory} was succesfully added.`);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Make API GET() call to storage with param projects, to get all project images available

  // TODO: Make API POST() function to be able to add images

  // record uses lowercased keys, source of truth
  const [formData, setFormData] = useState<Record<string, string>>({});
  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []); // load once on render

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("updated storage");
  }, [formData]);

  // clear local storage and record
  function clearStorage() {
    localStorage.clear();
    setFormData({});
  }

  function toggleTag(tag: string) {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  }

  return (
    <div>
      {showImgModal && (
        <ImgModal
          onClose={() => {
            setShowImgModal(false);
          }}
        />
      )}
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
              {componentCategory === "Blog" && (
                <div>
                  {blogFields.map((b: Field) => (
                    <FormField
                      key={b.name}
                      field={b}
                      value={formData[b.name] ?? ""}
                      onChange={(name, val) =>
                        setFormData((prev) => ({ ...prev, [name]: val }))
                      }
                    />
                  ))}
                </div>
              )}
              {componentCategory === "Member" && (
                <div>
                  {memberFields.map((m: Field) => (
                    <FormField
                      key={m.name}
                      field={m}
                      value={formData[m.name] ?? ""}
                      onChange={(name, val) =>
                        setFormData((prev) => ({ ...prev, [name]: val }))
                      }
                    />
                  ))}
                </div>
              )}
              {/* Todo */}
              {containsImg && (
                <div className="flex">
                  <button
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 
              text-gray-700 text-sm px-4 py-2 rounded mb-4 flex gap-2 w-fit 
              items-center justify-center"
                    type="button"
                    onClick={() => {
                      setShowImgModal(!showImgModal);
                    }}
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    Choose image
                  </button>
                </div>
              )}
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
              {/* imageUrls */}
              {componentCategory === "Project" && (
                <h2 className="subheading">Image URLs</h2>
              )}
              {/* imageAlts */}
              {componentCategory === "Project" && (
                <h2 className="subheading">Image Alts</h2>
              )}
              <div className="flex flex-col gap-2">
                <button
                  className=" font-medium py-2 px-4 rounded mt-7 w-1/2 border hover:bg-bg-lt-grey"
                  onClick={() => {
                    const ans = confirm(
                      "Do you want to clear your current inputs?",
                    );
                    if (ans) clearStorage();
                  }}
                >
                  Clear Selection
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-3 w-full"
                  onClick={() => {
                    const ans = confirm(
                      "Do you want to submit your component?",
                    );
                    if (ans) postDispatcher();
                  }}
                >
                  Create Component
                </button>
              </div>
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
              <OurProjects
                projects={[
                  {
                    title: formData["title"],
                    descrip: formData["descrip"],
                    descrip2: formData["descrip2"],
                    imageUrls: imageUrls,
                    imageAlts: imageAlts,
                    ctaLink: formData["ctaLink"],
                    ctaTitle: formData["ctaTitle"],
                  },
                ]}
                showButtons={false}
              />
            )}
            {componentCategory === "Highlight" && <div>hello</div>}
            {componentCategory === "Blog" && (
              <BlogPostCard
                post={{
                  title: formData["title"] ? formData["title"] : "Example",
                  excerpt: formData["excerpt"]
                    ? formData["excerpt"]
                    : "Example",
                  author: {
                    name: formData["authorName"]
                      ? formData["authorName"]
                      : "Example",
                    avatar: isURL(formData["authorAvatar"])
                      ? formData["authorAvatar"]
                      : "",
                  },
                  publishDate: formData["date"],
                  categories: blogCategories,
                  readTime: formData["readTime"]
                    ? parseInt(formData["readTime"])
                    : 0,
                  image: isURL(formData["image"]) ? formData["image"] : "",
                  slug: formData["slug"],
                  content: formData["content"]
                    ? formData["content"]
                    : "Example", // doesn't work
                }}
              />
            )}
            {componentCategory === "Member" && (
              <MemberCard
                member={{
                  name: formData["name"] ?? "Name",
                  role: formData["role"] ?? "",
                  year: formData["year"] ?? "",
                  major: formData["major"] ?? "",
                  college: formData["college"] ?? "",
                  linkedin: formData["linkedin"] ?? "",
                  image: formData["imageUrl"],
                }}
                onClick={() => {}}
              />
            )}
          </div>
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
