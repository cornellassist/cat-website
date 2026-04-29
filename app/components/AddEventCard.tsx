"use client";
import { EventCard } from "@/app/components/OurEvents";
import { useState } from "react";
import portraitPlaceholder from "@/public/assets/AboutUs/ProfilePics/portrait-placeholder.png";

// TODO: import all relevant component cards that need to be displayed

const componentCategories = [
  "Blog",
  "Highlight",
  "Member",
  "Project",
  "Sponsors",
] as const; // for readonly, type assertion

type AddEventCardProps = {
  componentCategory?: (typeof componentCategories)[number]; // indexed access type. TODO: remove ?: when done
};

export function AddEventCard({ componentCategory }: AddEventCardProps) {
  // lookup the right keys and values from whatever was passed in as a prop
  // - Could be automatic, if the string is a url
  // - should probably not, be restricted

  // TODO: Make API GET() calls to each of the component categories, and get key labels and value types

  // TODO: Make API GET() call to storage with param projects, to get all project images available

  // TODO: Make API POST() function to be able to add images

  const tagSelections = [
    "In-Person",
    "Virtual",
    "Panel",
    "Workshop",
    "All Ages",
    "Seniors",
    "Kids",
  ];

  // TODO: Replace these with reusable components for each type of input
  // Leave edge cases for stuff like tag
  // Also the components are generally going to be "short string", "long string", etc, with the actual key name inserted after
  const [title, setTitle] = useState("Event Title");
  const [descrip, setDescrip] = useState("A short description of the event...");
  const [date, setDate] = useState("01/01/2026");
  const [time, setTime] = useState("12:00 PM - 2:00 PM");
  const [location, setLocation] = useState("https://www.google.com/maps");
  const [imageURL, setImageURL] = useState(portraitPlaceholder.src);
  const [tags, setTags] = useState<String[]>([]);
  const inputCss = "border border-gray-300 rounded w-full p-2 mb-4";

  function toggleTag(tag: String) {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  }

  // TODO: make a component that assembles all the previously made components together
  // TODO: Make a component for displaying images from project folder, and to be able to add to storage. Refreshes once new things are added

  return (
    // TODO: Change design to be a popup modal instead, with transparent background
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 w-full lg:w:1/2 border-r border-gray-100 p-15 ovrflow-y-auto">
        <div className="border border-gray-200 rounded-2xl p-8">
          <form className="">
            <h1 className="mainheading">Add Event Component</h1>
            <h2 className="subheading">Title</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 50))}
              className={inputCss}
              placeholder="Event Title"
            />
            <p className="text-xs text-gray-400 -mt-3 mb-4 text-right">{title.length}/50</p>

            <h2 className="subheading">Description</h2>
            <textarea
              value={descrip}
              onChange={(e) => setDescrip(e.target.value.slice(0, 300))}
              className={inputCss}
              placeholder="Description..."
            />
            <p className="text-xs text-gray-400 -mt-3 mb-4 text-right">{descrip.length}/300</p>

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
            />

            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded mb-4 inline-block"
            >
              Upload image
            </label>

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
            <p className="text-xs text-gray-400 mt-1 mb-4">Maximum tags: 4</p>

            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-7 w-full">
              Create Component
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 items-start justify-start p-12">
        <h1 className="mt-5 mb-5">Preview</h1>
        {title || descrip || imageURL ? (
          <div className="bg-white rounded-[20px] 2xl:w-[550px] xl:w-[500px] h-[560px] border border-gray-100 mx-auto">
            <EventCard
              title={title}
              descrip={descrip}
              date={date}
              time={time}
              location={location}
              imageUrl={imageURL}
              tags={tags as any}
            />
          </div>
        ) : (
          <div className="h-[560px] w-full rounded-[20px] border-2 border-dashed border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-300">Preview here</p>
          </div>
        )}
      </div>
    </div>
  );
}
