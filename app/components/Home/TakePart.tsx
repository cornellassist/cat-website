"use client"

import { ButtonRed, ButtonWhite } from "@/app/components/Buttons";


export function TakePart() {
  return (
    <div className="h-100 sm:h-110.25 w-full relative flex justify-center items-center universepad">
      <div className="rounded-[20px] h-60 sm:h-90 md:h-97 2xl:h-110 w-full flex flex-col justify-between bg-[linear-gradient(135deg,#FFFFFF_36%,#F5C6CB_60%,#D22333_100%)]
      drop-shadow-[0_-2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] pl-6 sm:pl-10 md:pl-15">
        <div className="flex flex-col">
          <h2 className="mainheading mt-4 sm:mt-8 md:mt-10">Take Part in Our Work</h2>
          <p className="subtext w-3/4 sm:w-2/3 mt-2 sm:mt-5 2xl:mt-8">Be part of a project team making assistive technology more effective, and reach out if you’d like to collaborate or share your ideas</p>
        </div>
        <div className="flex mb-4 sm:mb-10 gap-4 sm:gap-10">
          <ButtonRed label="Join Us" to="/JoinUs" />
          <ButtonWhite label="Contact Us" to="/Contact" />
        </div>
      </div>
      <img src="/assets/Landing/takepart-square-l.svg" alt="" className="hidden sm:block absolute top-8 left-5 md:top-0 md:left-14 z-10 scale-[80%] md:scale-100" />
      <img src="/assets/Landing/takepart-square-r.svg" alt="" className="hidden sm:block absolute -top-7 left-13 -rotate-60 md:-top-15 md:left-26 z-10 scale-[80%] md:scale-100" />
    </div>
  )
}


