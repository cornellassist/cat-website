"use client"
import { ButtonRed } from "./Buttons"
import HeroPic from "@/public/assets/Landing/hero-pic-full.jpg"
import BlurTL from "@/public/assets/blur-tl.png"
import BlurTR from "@/public/assets/blur-tr.png"
import Image from 'next/image';
import { loadingComplete, imgLoadStyles } from "../utils/imgLoad";
import { useEffect } from "react"

const HeroText = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:items-start mt-10 lg:max-w-[50%] lg-mt-0">
      <h1 className="mainheading w-full mb-6 text-center lg:text-left z-10 bg-white sm:bg-none">Making Assistive Technologies Accessible for All</h1>
      <p className="subtext w-full mb-8 sm:mb-10 lg:mb-16 text-center lg:text-left">We create accessible devices and teach inclusive design to empower communities in Ithaca and beyond.</p>
      <ButtonRed label="Explore Our Work" to="/OurWork" />
    </div>

  )
}

const HeroGraphic = () => {
  const detailScaleStyles = "origin-bottom lg:origin-right scale-88 sm:scale-100 md:scale-100 lg:scale-70 xl:scale-90 2xl:scale-110"
  return (
    <>
      {/* desktop */}
      <div className="hidden lg:block w-1/2 xl:w-132 relative self-start mt-10 xl:-mt-3 2xl:-mt-5">
        <div className={`relative right-0 top-0 ${detailScaleStyles}`}>
          {/* No alts for decoration */}
          <img src="/assets/Landing/hero-blob-solid.svg" alt="" className={`absolute left-7.25 top-32`} />
          <img src="/assets/Landing/hero-blob-clear.svg" alt="" className={`absolute left-0 top-29`} />
          <Image src={HeroPic} alt="Cornell Assistive Technologies team member helping a student" height={310} width={466}
            className={`absolute left-15 top-48 rounded-[1000px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] ${imgLoadStyles}`}

            onLoadingComplete={(img) => { loadingComplete(img) }} />
          <img src="/assets/Landing/hero-group.svg" alt="" className={`scale-70 sm:scale-100 absolute left-23 -z-10`} />
        </div>
      </div>
      {/* mobile */}
      <div className="lg:hidden w-4/5 sm:w-2/3 md:w-3/5 relative">
        <div className={`relative right-0 top-0 ${detailScaleStyles}`}>
          {/* No alts for decoration */}
          <img src="/assets/Landing/hero-blob-solid.svg" alt="" className={`absolute -left-0.75 top-32`} />
          <img src="/assets/Landing/hero-blob-clear.svg" alt="" className={`absolute -left-8 top-29`} />
          <Image src={HeroPic} alt="Cornell Assistive Technologies team member helping a student" height={310} width={466}
            className={`absolute left-7 top-44 sm:top-48 rounded-[1000px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] ${imgLoadStyles}`}
            onLoadingComplete={(img) => { loadingComplete(img) }} />
          <img src="/assets/Landing/hero-group.svg" alt="" className={`scale-60 md:scale-70 lg:scale-100 absolute sm:-top-6 md:top-0 left-10 md:left-8 -z-10`} />
        </div>
      </div>
    </>
  )
}

const HeroContainer = ({ children }: any) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row mt-10 sm:mt-16 lg:mt-24 universepad justify-between items-center relative overflow-hidden h-150 sm:h-200 md:h-220 lg:h-155 xl:h-170 2xl:h-190 mb-20 lg:mb-0 ">
      <Image src={BlurTL} alt="" height={BlurTL.height / 3} width={BlurTL.width / 3} className="absolute left-0 top-0 -z-10" />
      <Image src={BlurTR} alt="" height={BlurTR.height / 1.5} width={BlurTR.width / 1.5} className="absolute right-0 top-0 -z-10" />
      {children}
    </div>
  )
}

export const LandingHero = () => {
  return (
    <HeroContainer>
      <HeroText />
      <HeroGraphic />
    </HeroContainer>
  )
}