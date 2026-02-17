"use client";

import { ButtonRed, ButtonWhite } from "./Buttons";
import Image from "next/image";
import { convertDate } from "@/utils/convertDate";
import { useEffect, useState } from "react";

type TagTitle =
  | "In-Person"
  | "Virtual"
  | "Panel"
  | "Workshop"
  | "All Ages"
  | "Seniors"
  | "Kids";

interface EventCardProps {
  title: string;
  tags: TagTitle[];
  descrip: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
}

interface OurEventsProps {
  events: EventCardProps[];
}

function OurEventsTopText() {
  return (
    <div className="flex flex-col">
      <h2 className="heading">Our Events</h2>
      <p className="subtext mt-3">
        Join us at our upcoming STEM education and community outreach events.
      </p>
    </div>
  );
}

const redTitles: TagTitle[] = ["In-Person", "Virtual"];
const blueTitles: TagTitle[] = ["Panel", "Workshop"];
const purpleTitles: TagTitle[] = ["All Ages", "Seniors", "Kids"];

function EventLabel({ title }: { title: TagTitle }) {
  const colorStyle = redTitles.includes(title)
    ? "bg-theme-lt-red"
    : blueTitles.includes(title)
      ? "bg-theme-lt-blue"
      : purpleTitles.includes(title)
        ? "bg-theme-lt-purple"
        : "";
  return (
    <div className={`rounded-[1000px] ${colorStyle} cardtext px-4 font-medium`}>
      {title}
    </div>
  );
}

export function OurEvents({ events }: OurEventsProps) {
  const allEvents = events;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (events.length !== 0) {
      setLoading(false);
    }
  }, [events]);

  const cardHeight = "h-120 sm:h-115 md:h-130 lg:h-140 xl:h-150 2xl:h-155";

  function EventCard({
    title,
    descrip,
    location,
    date,
    time,
    tags = [],
    imageUrl,
  }: EventCardProps) {
    return (
      <div
        className={`backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
    rounded-[20px] pb-6 ${cardHeight} w-full lg:w-1/2`}
      >
        {!loading && (
          <div className="flex flex-col gap-4 md:gap-6 h-full">
            {/* photo */}
            <div className="h-1/2 relative w-full rounded-t-[20px] overflow-hidden">
              <Image src={imageUrl} alt="" fill className="object-cover" />
            </div>
            {/* content */}
            <div className="flex flex-col h-1/2  justify-between px-6 sm:px-8">
              <div>
                <h3 className="cardheading">{title}</h3>
                {/* labels */}
                <div className="flex gap-2 mt-4">
                  {tags.map((item, index) => (
                    <EventLabel key={`${item}-label-${index}`} title={item} />
                  ))}
                </div>
                <p className="cardtext mt-6">{descrip}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="block sm:hidden">
                  <ButtonRed
                    label="Location"
                    to={location}
                    size="S"
                    behav="External"
                  />
                </div>
                <div className="hidden sm:block">
                  <ButtonRed
                    label="See Location"
                    to={location}
                    size="M"
                    behav="External"
                  />
                </div>
                <div className="flex gap-4">
                  <p className="cardtext font-semibold">{convertDate(date)}</p>
                  <p className="cardtext">{time}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-auto w-full universepad py-12 xl:py-18 2xl:py-10"
      id="our-events"
    >
      <OurEventsTopText />
      <div className={`flex gap-10 mt-10 ${cardHeight}`}>
        {allEvents.map((item, index) => {
          return (
            <EventCard
              key={`event-${index}`}
              title={item.title}
              descrip={item.descrip}
              location={item.location}
              date={item.date}
              time={item.time}
              tags={item?.tags}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

// const event1: EventCardProps = {
//   title: "CAT at Ithaca Sciencenter",
//   descrip:
//     "Meet us at the Sciencenter, where we will be teaching the local community’s children and families about assistive engineering.",
//   location: "https://maps.app.goo.gl/hYfXPtxKE5NUZhLG8",
//   date: "Feb. 22",
//   tags: ["In-Person", "All Ages", "Workshop"],
//   pic: Sciencenter,
//   time: " 2:00-4:00pm",
// };

// const event2: EventCardProps = {
//   title: "CAT at GST BOCES",
//   description: "We will be going to GST BOCES Bush Campus to teach faculty how to adapt toys!",
//   location: "https://maps.app.goo.gl/xVcuDiP8HkvqRqsYA",
//   date: "Mar. 23, 1:30-2:45pm"
// }
