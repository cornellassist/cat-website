"use client"
import { ButtonRed, ButtonWhite } from './Buttons';

interface EventCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
}

const event1: EventCardProps = {
  title: "CAT at Ithaca Sciencenter",
  description: "Come meet us at the Sciencenter, where we will be teaching the local community’s children and families about assistive engineering.",
  location: "https://maps.app.goo.gl/hYfXPtxKE5NUZhLG8",
  date: "Feb. 22, 2-4pm"
}

const event2: EventCardProps = {
  title: "CAT at GST BOCES",
  description: "We will be going to GST BOCES Bush Campus to teach faculty how to adapt toys!",
  location: "https://maps.app.goo.gl/xVcuDiP8HkvqRqsYA",
  date: "Mar. 23, 1:30-2:45pm"
}

const allEvents = [event1, event2]


function OurEventsTopText() {
  return (
    <div className="flex flex-col">
      <h2 className="heading">Our Events</h2>
      <p className="subtext mt-3">Learn more about our upcoming STEM education and community outreach events.</p>
    </div>
  )
}

function EventCard({ title, description, location, date }: EventCardProps) {
  return (
    <div>
      <div className="flex flex-col py-6 px-8 cursor-pointer backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] w-full lg:w-4/5 xl:w-2/3 rounded-[20px]">
        {/* text */}
        <h3 className="cardheading">{title}</h3>
        <p className="cardtext mt-3">{description}</p>
        <div className="flex justify-between items-center mt-8">
          <ButtonRed label="See Location" to={location} size="S" behav='External' />
          <p className="cardtext font-semibold">{date}</p>
        </div>
      </div>

    </div>

  )
}

function OurEventsBottomText() {
  return (
    <div className="flex flex-col">
      <p className="subtext mb-8">Check out our past events on our blog!</p>
      <ButtonRed label="Visit Our Blog" to="/Blog" size="M" />
    </div>
  )
}

export function OurEvents() {
  return (
    <div className="flex flex-col h-auto w-full universepad py-12 xl:py-18 2xl:py-10" id="our-events">
      <OurEventsTopText />
      <div className="flex flex-col gap-10 mt-10">
        {allEvents.map((item, index) => {
          return (
            <EventCard key={`event-${index}`} title={item.title} description={item.description} location={item.location} date={item.date} />
          )
        })}
      </div>
      {/* wait until blog page is finished */}
      {/* <OurEventsBottomText /> */}
    </div>
  )
}
