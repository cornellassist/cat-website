"use client"
import { ButtonRed, ButtonWhite } from './Buttons';
import Image from 'next/image';
import { StaticImageData } from 'next/image'
import Sciencenter from "@/public/assets/OurWork/sciencenter.jpeg"


type LabelTitle = "In-Person" | "Virtual" | "Panel" | "Workshop" | "All Ages" | "Seniors" | "Kids"

interface EventCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
  labels?: LabelTitle[];
  pic: StaticImageData;
}

const event1: EventCardProps = {
  title: "CAT at Ithaca Sciencenter",
  description: "Meet us at the Sciencenter, where we will be teaching the local community’s children and families about assistive engineering.",
  location: "https://maps.app.goo.gl/hYfXPtxKE5NUZhLG8",
  date: "Feb. 22, 2:00-4:00pm",
  labels: ["In-Person", "All Ages", "Workshop"],
  pic: Sciencenter,
}

// const event2: EventCardProps = {
//   title: "CAT at GST BOCES",
//   description: "We will be going to GST BOCES Bush Campus to teach faculty how to adapt toys!",
//   location: "https://maps.app.goo.gl/xVcuDiP8HkvqRqsYA",
//   date: "Mar. 23, 1:30-2:45pm"
// }

const allEvents = [event1]


function OurEventsTopText() {
  return (
    <div className="flex flex-col">
      <h2 className="heading">Our Events</h2>
      <p className="subtext mt-3">Join us at our upcoming STEM education and community outreach events.</p>
    </div>
  )
}

const redTitles: LabelTitle[] = ["In-Person", "Virtual"]
const blueTitles: LabelTitle[] = ["Panel", "Workshop"]
const purpleTitles: LabelTitle[] = ["All Ages", "Seniors", "Kids"]

function EventLabel({ title }: { title: LabelTitle }) {
  const colorStyle =
    redTitles.includes(title) ? "bg-theme-lt-red" :
      blueTitles.includes(title) ? "bg-theme-lt-blue" :
        purpleTitles.includes(title) ? "bg-theme-lt-purple" : "";
  return (
    <div className={`rounded-[1000px] ${colorStyle} cardtext px-4 font-medium`}>{title}</div>
  )
}

function EventCard({ title, description, location, date, labels = [], pic }: EventCardProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
    h-120 sm:h-115 md:h-130 lg:h-140 xl:h-150 2xl:h-155 w-full lg:w-1/2 rounded-[20px] pb-6">
      {/* photo */}
      <div className="h-1/2 relative w-full rounded-t-[20px] overflow-hidden">
        <Image src={pic} alt="" fill className="object-cover" />
      </div>
      {/* content */}
      <div className="flex flex-col h-1/2  justify-between px-6 sm:px-8">
        <div>
          <h3 className="cardheading">{title}</h3>
          {/* labels */}
          <div className="flex gap-2 mt-4">
            {labels.map((item, index) => (<EventLabel key={`${item}-label-${index}`} title={item} />))}
          </div>
          <p className="cardtext mt-6">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="block sm:hidden">
            <ButtonRed label="Location" to={location} size="S" behav='External' />
          </div>
          <div className="hidden sm:block">
            <ButtonRed label="See Location" to={location} size="M" behav='External' />
          </div>
          <p className="cardtext font-semibold">{date}</p>
        </div>
      </div>
    </div>

  )
}

export function OurEvents() {
  return (
    <div className="flex flex-col h-auto w-full universepad py-12 xl:py-18 2xl:py-10" id="our-events">
      <OurEventsTopText />
      <div className="flex gap-10 mt-10">
        {allEvents.map((item, index) => {
          return (
            <EventCard key={`event-${index}`} title={item.title} description={item.description} location={item.location} date={item.date} labels={item?.labels} pic={item.pic} />
          )
        })}
      </div>
      {/* wait until blog page is finished */}
      {/* <OurEventsBottomText /> */}
    </div>
  )
}
