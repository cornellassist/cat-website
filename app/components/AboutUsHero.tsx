"use client";
import { ButtonRed, ButtonWhite } from "./Buttons";
import HeroPic from "@/public/assets/AboutUs/hero-pic.png";
import BlurTL from "@/public/assets/blur-tl.png";
import BlurTR from "@/public/assets/blur-tr.png";
import BlurM from "@/public/assets/blur-m.png";
import Image from "next/image";
import { loadingComplete, imgLoadStyles } from "../../utils/imgLoad";

const HeroText = () => {
  return (
    <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start lg:justify-center text-center lg:text-start">
      <h1 className="mainheading mb-4 md:mb-6">About Us</h1>
      <p className="subtext mb-8 md:mb-14 text-base md:text-lg">
        Founded in Fall 2021, the Cornell Assistive Technologies Project Team is
        a student group dedicated to making supportive technologies more
        accessible in Ithaca and beyond. Meet our passionate team below!
      </p>
      <ButtonRed label="Join Us" to="/JoinUs" />
    </div>
  );
};

const HeroGraphic = () => {
  return (
    <div className="flex justify-center lg:justify-start w-full lg:w-1/2 min-w-64 md:min-w-80 mt-20 sm:mt-20 md:mt-0">
      <Image
        src={HeroPic}
        alt="Cornell Assistive Technologies team photo"
        height={HeroPic.height}
        width={HeroPic.width}
        className={`xl:h-100 xl:w-auto md:scale-80 lg:scale-100 xl:scale-100 2xl:scale-110 lg:origin-left rounded-[20px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] ${imgLoadStyles}`}
        onLoadingComplete={(img) => {
          loadingComplete(img);
        }}
      />
    </div>
  );
};
const HeroContainer = ({ children }: any) => {
  return (
    <div className="flex flex-col">
      <div className="mt-0 sm:mt-16 md:mt-24 xl:mt-24 py-10 sm:py-12 lg:py-26 xl:py-30 2xl:py-40 h-auto universepad flex flex-col lg:flex-row lg:justify-between items-center gap-12 lg:gap-20 relative">
        <Image
          src={BlurTL}
          alt=""
          height={BlurTL.height / 2}
          width={BlurTL.width / 2}
          className="absolute left-0 top-0 -z-10 "
        />
        <Image
          src={BlurTR}
          alt=""
          height={BlurTR.height}
          width={BlurTR.width}
          className="absolute right-0 top-0 -z-10 "
        />
        <Image
          src={BlurM}
          alt=""
          height={BlurM.height}
          width={BlurM.width}
          className="absolute left-1/2 -translate-x-1/2 top-110 -z-10 hidden lg:block"
        />
        {children}
      </div>
    </div>
  );
};

export const AboutUsHero = () => {
  return (
    <HeroContainer>
      <HeroGraphic />
      <HeroText />
    </HeroContainer>
  );
};
