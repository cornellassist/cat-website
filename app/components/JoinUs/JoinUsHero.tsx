"use client";
import { ButtonRed, ButtonWhite } from "@/app/components/Buttons";
import HeroPic from "@/public/assets/JoinUs/hero-pic.jpg";
import Image from "next/image";
import BlurTL from "@/public/assets/blur-tl.png";
import BlurTR from "@/public/assets/blur-tr.png";
import { loadingComplete, imgLoadStyles } from "@/utils/imgLoad";

const centered = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

function HeroContent() {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-5">
      <h1 className="mainheading mt-10">Join Us</h1>
      <p className="subtext mt-4 w-4/5 text-center">
        Thank you so much for your interest in joining us! This fall, we will be
        accepting applications from August 17th to September 3rd, and we look
        forward to your applications!
      </p>
      <p className="subtext w-4/5 text-center">
        Stay tuned for more info about our teams and the recruiting timeline on
        this page!
      </p>
      <div className="flex gap-6 flex-wrap justify-center items-center mt-8">
        <ButtonRed
          label={"Application Form"}
          to={
            "https://docs.google.com/forms/d/e/1FAIpQLSdmcYlKCtSdxqLfEYYRJw3yBkByUdLtE6donpQ1nDo6mSDvgw/viewform"
          }
          size={"M"}
          behav="External"
        />
        <ButtonWhite
          label={"Coffee Chats"}
          to={
            "https://docs.google.com/forms/d/e/1FAIpQLSeJl9iVXLuzeEw6SwTCo-gPT-32tMe_8c1X7UZg-GwNBobJBA/viewform"
          }
          size={"M"}
          behav="External"
        />
      </div>
      <div className="relative">
        <Image
          src={HeroPic}
          alt="A Cornell Assistive Technology team work session"
          height={HeroPic.height}
          width={HeroPic.width}
          className={`mt-5 h-80 sm:h-96 md:h-112 xl:h-128 2xl:h-144 w-auto rounded-[20px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] ${imgLoadStyles}`}
          onLoadingComplete={(img) => {
            loadingComplete(img);
          }}
        />
        {/* <img
          src="/assets/JoinUs/hero-shapes.svg"
          alt=""
          className={`${centered} origin-top -z-10`}
        /> */}
      </div>

      {/* <div className="mt-12 flex justify-center"> */}
      {/* <ButtonRed label="Apply Now" to="" behav="External" disabled={true} /> */}
      {/* </div> */}
    </div>
  );
}

const HeroContainer = ({ children }: any) => {
  return (
    <div className="mt-16 sm:mt-16 md:mt-24 universepad relative overflow-hidden mb-20">
      <Image
        src={BlurTL}
        alt=""
        height={BlurTL.height / 2}
        width={BlurTL.width / 2}
        className="absolute left-0 top-0 -z-10"
      />
      <Image
        src={BlurTR}
        alt=""
        height={BlurTR.height}
        width={BlurTR.width}
        className="absolute right-0 top-0 -z-10"
      />
      {children}
    </div>
  );
};

export function JoinUsHero() {
  return (
    <HeroContainer>
      <HeroContent />
    </HeroContainer>
  );
}
