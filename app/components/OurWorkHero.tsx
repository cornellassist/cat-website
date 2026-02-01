"use client"
import { ButtonRed, ButtonWhite } from "./Buttons"
import HeroPic from "@/public/assets/OurWork/hero-pic.png"
import BlurTL from "@/public/assets/blur-tl.png"
import BlurTR from "@/public/assets/blur-tr.png"
import Image from 'next/image';
import { imgLoadStyles, loadingComplete } from "../utils/imgLoad";

const HeroText = () => {
  return (
    <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 xl:w-1/2 mb-5 lg:mb-0">
      <h1 className="mainheading mb-2 md:mb-4 lg:mb-6">Our Work</h1>
      <p className="subtext mb-6 md:mb-10 lg:mb-16 text-center lg:text-start">
        Our teams at Cornell Assistive Technologies design adaptive technologies and foster partnerships to expand access to assistive solutions and STEM education.
      </p>
      <div className="hidden lg:flex gap-10">
        <ButtonRed label="Our Projects" to="our-projects" behav="Scroll" />
        <ButtonWhite label="Our Events" to="our-events" behav="Scroll" />
      </div>
      <div className="flex lg:hidden gap-10">
        <ButtonRed label="Our Projects" to="our-projects" behav="Scroll" size="M" />
        <ButtonWhite label="Our Events" to="our-events" behav="Scroll" size="M" />
      </div>
    </div>
  )
}

const HeroGraphic = () => {
  return (
    <>
      {/* desktop version */}
      <div className="hidden lg:flex items-center">
        <div className="h-80 w-106">
          <Image src={HeroPic} alt="Cornell Assistive Technologies team member working on the sensory watch project" height={HeroPic.height} width={HeroPic.width}
            className={`rounded-[20px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] origin-right lg:scale-100 xl:scale-110 2xl:scale-130 ${imgLoadStyles}`}
            onLoadingComplete={(img) => { loadingComplete(img) }} />
        </div>
      </div>
      {/* mobile version */}
      <div className="flex lg:hidden items-end justify-center">
        <div className="h-80 sm:h-86 w-106 -mb-5 sm:mb-0 origin-bottom scale-90 sm:scale-100 md:scale-100 lg:scale-75 xl:scale-100">
          <Image src={HeroPic} alt="Cornell Assistive Technologies team member working on the sensory watch project" height={HeroPic.height} width={HeroPic.width}
            className={`rounded-[20px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] ${imgLoadStyles}`}
            onLoadingComplete={(img) => { loadingComplete(img) }} />
        </div>
      </div>
    </>
  )
}
//h-145 sm:h-200 md:h-220 lg:h-155 xl:h-170 2xl:h-190 mt-10 
const HeroContainer = ({ children }: any) => {
  return (
    <div className="flex flex-col">
      <div className="mt-10 sm:mt-16 md:mt-24 lg:mt-24 xl:mt-24 py-10 sm:py-12 lg:py-26 xl:py-30 2xl:py-40 h-auto universepad flex flex-col-reverse justify-start lg:justify-between lg:flex-row gap-12 relative overflow-hidden lg:items-center">
        <Image src={BlurTL} alt="" height={BlurTL.height / 2} width={BlurTL.width / 2} className="absolute left-0 top-0 -z-10" />
        <Image src={BlurTR} alt="" height={BlurTL.height / 2} width={BlurTL.width / 2} className="absolute right-0 top-0 -z-10" />
        {children}
      </div>
      <div className="hidden lg:flex flex-col mt-20 lg:mt-0">
        <img src="/assets/OurWork/wave-solid-top.svg" className="-z-10 w-full" />
        <img src="/assets/OurWork/wave-solid-bottom.svg" className="-z-10 -mt-[4.25px] w-full" />
      </div>
    </div>
  )
}

export const OurWorkHero = () => {
  return (
    <HeroContainer>
      <HeroText />
      <HeroGraphic />
    </HeroContainer>
  )
}