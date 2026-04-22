"use client"
import { EventCard } from "@/app/components/OurEvents";
import { useState } from "react";

export function AddEventCard() {
    const tagSelections = ["In-Person", "Virtual", "Panel", "Workshop", "All Ages", "Seniors", "Kids"]

    const [title, setTitle] = useState("");
    const [descrip, setDescrip] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [imageURL, setImageURL] = useState("")
    const [tags, setTags] = useState<String[]>([]);
    const [showPreview, setShowPreview] = useState(false);
    const inputCss = "border border-gray-300 rounded w-full p-2 mb-4"

    function toggleTag(tag: String) {
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
                        <h1 className="mainheading">Add Event Component</h1>
                        <h2 className="subheading">Title</h2>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCss} placeholder="Event Title"/>

                        <h2 className="subheading">Description</h2>
                        <textarea value={descrip} onChange={(e) => setDescrip(e.target.value)} className={inputCss} placeholder="Description..."/>
                        
                        <h2 className="subheading">Date</h2>
                        <input value={date} onChange={(e) => setDate(e.target.value)} className={inputCss} placeholder="Date: MM/DD/YYYY" />
                        
                        <h2 className="subheading">Time</h2>
                        <input value={time} onChange={(e) => setTime(e.target.value)} className={inputCss} placeholder="Start Time - End Time" />
                        
                        <h2 className="subheading">Location URL</h2>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCss} placeholder="Location URL"/>

                        <h2 className="subheading">Image</h2>
                        <input type="file"
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

                        <label htmlFor="image-upload"
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded mb-4 inline-block">
                        Upload image</label>

                        <h2 className="subheading mb-1">Tag</h2>
                        {tagSelections.map((tag) => (
                        <label key={tag} className="flex items-center gap-2 cursor-pointer pl-1">
                            <input
                            type="checkbox"
                            checked={tags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                            className="accent-red-500"
                            />
                            <span className="text-sm">{tag}</span>
                        </label>
                        ))}


                        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-7 w-full">Create Component</button>
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