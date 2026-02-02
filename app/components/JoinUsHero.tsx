"use client"
import { ButtonRed } from "./Buttons"
import HeroPic from "@/public/assets/JoinUs/hero-pic.jpg"
import Image from "next/image"
import BlurTL from "@/public/assets/blur-tl.png"
import BlurTR from "@/public/assets/blur-tr.png"
import { loadingComplete, imgLoadStyles } from "../utils/imgLoad";

const centered = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"

function HeroContent() {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-5">
      <h1 className="mainheading mt-10">Join Us</h1>
      <p className="subtext mt-4 w-4/5 text-center">We will not be recruiting Spring 2026, but applications will reopen Fall 2026. Thank you for your interest, and we look forward to your applications!</p>
      <div className="relative">
        <Image src={HeroPic} alt="A Cornell Assistive Technology team work session" height={HeroPic.height} width={HeroPic.width}
          className={`mt-5 h-80 origin-top scale:90 sm:scale-120 xl:scale-130 2xl:scale-140 w-auto rounded-[20px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] ${imgLoadStyles}`}
          onLoadingComplete={(img) => { loadingComplete(img) }} />
        <img src="/assets/JoinUs/hero-shapes.svg" alt="" className={`${centered} scale-120 sm:scale-140 md:scale-145 xl:scale-155 2xl:scale-165 origin-top -z-10`} />
      </div>

      {/* <div className="mt-12 flex justify-center"> */}
      {/* <ButtonRed label="Apply Now" to="" behav="External" disabled={true} /> */}
      {/* </div> */}

    </div >
  )
}

const HeroContainer = ({ children }: any) => {
  return (
    <div className="mt-16 sm:mt-16 md:mt-24 universepad relative overflow-hidden h-150 sm:h-180 md:h-180 lg:h-190 2xl:h-200">
      <Image src={BlurTL} alt="" height={BlurTL.height / 2} width={BlurTL.width / 2} className="absolute left-0 top-0 -z-10" />
      <Image src={BlurTR} alt="" height={BlurTR.height} width={BlurTR.width} className="absolute right-0 top-0 -z-10" />
      {children}
    </div>
  )
}

export function JoinUsHero() {
  return (
    <HeroContainer>
      <HeroContent />
    </HeroContainer>
  )
}