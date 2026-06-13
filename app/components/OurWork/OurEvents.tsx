"use client";

import { ButtonRed, ButtonWhite } from "@/app/components/Buttons";
import Image from "next/image";
import { convertDate } from "@/utils/convertDate";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { isURL } from "@/utils/imgLoad";

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
  archived?: boolean;
}

interface OurEventsProps {
  events: EventCardProps[];
}

function OurEventsTopText({
  titleText,
  descrip,
}: {
  titleText: string;
  descrip: string;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="heading">{titleText}</h2>
      <p className="subtext mt-3">{descrip}</p>
    </div>
  );
}

const cardHeight = "h-120 sm:h-115 md:h-130 lg:h-140 xl:h-150 2xl:h-155";

function EventCardContainer({
  title,
  descrip,
  location,
  date,
  time,
  tags = [],
  imageUrl,
  archived,
  loading,
}: EventCardProps & { loading: boolean }) {
  return (
    <div
      className={`backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
    rounded-[20px] pb-6 ${cardHeight} w-full `}
    >
      {!loading &&
        EventCard({
          title,
          descrip,
          location,
          date,
          time,
          tags,
          imageUrl,
          archived,
        })}
    </div>
  );
}

const MIN_SCALE = 0.94;
const MAX_SCALE = 1;
const MIN_OPACITY = 0.45;
const MAX_OPACITY = 1;

function ArchivedEventsCarousel({
  events,
  loading,
}: {
  events: EventCardProps[];
  loading: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: false,
  });
  const [activeTab, setActiveTab] = useState(0);
  const tweenRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tweenScale = useCallback(() => {
    if (!emblaApi) return;

    const containerRect = emblaApi.rootNode().getBoundingClientRect();
    const center = containerRect.left + containerRect.width / 2;

    emblaApi.slideNodes().forEach((slideNode, index) => {
      const tweenNode = tweenRefs.current[index];
      if (!tweenNode) return;

      const slideRect = slideNode.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distance = Math.abs(center - slideCenter);
      const ratio = Math.max(0, 1 - distance / (slideRect.width * 0.85));

      const scale = MIN_SCALE + ratio * (MAX_SCALE - MIN_SCALE);
      const opacity = MIN_OPACITY + ratio * (MAX_OPACITY - MIN_OPACITY);

      tweenNode.style.transform = `scale(${scale})`;
      tweenNode.style.opacity = `${opacity}`;
      tweenNode.style.zIndex = ratio > 0.5 ? "10" : "0";
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setActiveTab(emblaApi.selectedScrollSnap());

    emblaApi.on("scroll", tweenScale);
    emblaApi.on("reInit", tweenScale);
    emblaApi.on("select", onSelect);
    tweenScale();
    onSelect();

    return (): void => {
      emblaApi.off("scroll", tweenScale);
      emblaApi.off("reInit", tweenScale);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, tweenScale]);

  return (
    <div className="flex flex-col mt-10">
      <div
        className="overflow-hidden w-full py-5 sm:py-6 md:py-8"
        ref={emblaRef}
      >
        <div className={`flex items-center ${cardHeight}`}>
          {events
            .sort((e1, e2) => {
              // if e1 < e2, return 1 otherwise -1
              const y1 = new Date(e1.date).getFullYear();
              const y2 = new Date(e2.date).getFullYear();
              if (y1 !== y2) return y1 > y2 ? -1 : 1;
              const m1 = new Date(e1.date).getMonth();
              const m2 = new Date(e2.date).getMonth();
              if (m1 !== m2) return m1 > m2 ? -1 : 1;
              const d1 = new Date(e1.date).getDate();
              const d2 = new Date(e2.date).getDate();
              return d1 < d2 ? 1 : -1;
            })
            .map((item, index) => (
              <div
                key={`archived-event-${index}`}
                className="flex-[0_0_88%] sm:flex-[0_0_78%] xl:flex-[0_0_calc(50%-1.25rem)] min-w-0 pl-6 first:pl-0 h-full flex items-center"
              >
                <div
                  ref={(node) => {
                    tweenRefs.current[index] = node;
                  }}
                  className="w-full origin-center will-change-transform"
                  style={{
                    transform: `scale(${MIN_SCALE})`,
                    opacity: MIN_OPACITY,
                  }}
                >
                  <EventCardContainer
                    title={item.title}
                    descrip={item.descrip}
                    location={item.location}
                    date={item.date}
                    time={item.time}
                    tags={item?.tags}
                    imageUrl={item.imageUrl}
                    archived={item.archived}
                    loading={loading}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      {events.length > 1 && (
        <div className="flex gap-10 self-center mt-10 sm:mt-12 md:mt-15 items-center">
          <ChevronLeftIcon
            className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey"
            onClick={() => emblaApi?.scrollPrev()}
          />
          <p className="subtext">
            Event <span className="font-medium">{activeTab + 1}</span> of{" "}
            <span className="font-medium">{events.length}</span>
          </p>
          <ChevronRightIcon
            className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey"
            onClick={() => emblaApi?.scrollNext()}
          />
        </div>
      )}
    </div>
  );
}

function OurArchivedEvents({
  events,
  loading,
}: {
  events: EventCardProps[];
  loading: boolean;
}) {
  const archivedEvents = events.filter((item) => item.archived);

  if (archivedEvents.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col mt-16 xl:mt-20 overflow-x-hidden">
      <OurEventsTopText
        titleText="Past Events"
        descrip="Explore our previous STEM education and community outreach events."
      />
      <ArchivedEventsCarousel events={archivedEvents} loading={loading} />
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

export function EventCard({
  title,
  descrip,
  location,
  date,
  time,
  tags = [],
  imageUrl,
  archived,
}: EventCardProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 h-full">
      {/* photo */}
      <div className="h-1/2 relative w-full rounded-t-[20px] overflow-hidden">
        {isURL(imageUrl) && (
          <Image src={imageUrl} alt="" fill className="object-cover" />
        )}
      </div>
      {/* content */}
      <div className="flex flex-col h-1/2 justify-between px-6 sm:px-8">
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
            {!archived && (
              <ButtonRed
                label="See Location"
                to={location}
                size="M"
                behav="External"
              />
            )}
          </div>
          <div className="flex gap-4">
            <p className="cardtext font-semibold">{convertDate(date)}</p>
            {!archived && <p className="cardtext">{time}</p>}
          </div>
        </div>
      </div>
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

  const upcomingEvents = allEvents.filter((item) => !item.archived);

  return (
    <div
      className="flex flex-col h-auto w-full universepad py-12 xl:py-18 2xl:py-10"
      id="our-events"
    >
      <OurEventsTopText
        titleText="Our Events"
        descrip="Join us at our upcoming STEM education and community outreach events."
      />
      <div
        className={`grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-10 mt-10`}
      >
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((item, index) => (
            <EventCardContainer
              key={`event-${index}`}
              title={item.title}
              descrip={item.descrip}
              location={item.location}
              date={item.date}
              time={item.time}
              tags={item?.tags}
              imageUrl={item.imageUrl}
              archived={item.archived}
              loading={loading}
            />
          ))
        ) : (
          <div className="descriptext text-text-dk-grey">
            We're working on new events, stay tuned!
          </div>
        )}
      </div>
      {/* Until the archived event descrips in the db have been updated, leave out the component */}
      {/* {allEvents.some((e) => e.archived) && (
        <OurArchivedEvents events={allEvents} loading={loading} />
      )} */}
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
