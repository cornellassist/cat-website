"use client";
import Image from "next/image";
import { StaticImageData } from "next/image";
// import photoPlaceholder from "@/public/assets/JoinUs/hero-pic.jpg";
import EduAdvoPic1 from "@/public/assets/JoinUs/cornell_assist___sciencenter_2025-03-16r.jpg";
import EduAdvoPic2 from "@/public/assets/JoinUs/cayuga_heights.webp";
import EduAdvoPic3 from "@/public/assets/JoinUs/gobabygo2025.png";

import EngPic1 from "@/public/assets/JoinUs/eng-pic.jpg";
import EngPic2 from "@/public/assets/JoinUs/resna.webp";
import BusinessPic1 from "@/public/assets/JoinUs/business-pic.png";
import BusinessPic2 from "@/public/assets/JoinUs/cms.png";
import { useState } from "react";
import { ButtonRed } from "../Buttons";

type Team = {
  imgUrl: StaticImageData;
  teamName: string;
  description: string[];
  miniDescription?: string;
};

const engineering: Team = {
  imgUrl: EngPic1,
  teamName: "Engineering",
  description: [
    "We design and build assistive technology that helps members of the Ithaca community live more independently.",
    "You'll join project sub-teams that work directly on ongoing build.",
    "We welcome members from all backgrounds!",
  ],
  miniDescription:
    "Design and build assistive technology for the Ithaca community.",
};
const engineeringPics = [EngPic1, EngPic2];

const educationAndAdvocacy: Team = {
  imgUrl: EduAdvoPic1,
  teamName: "Education & Advocacy",
  description: [
    "We create community outreach initiatives and foster K-12 STEM education in Ithaca.",
    "In addition, we help run workshops and events to raise awareness for accessibility and assistive technology.",
    "We also modify toys to give kids with disabilities the opportunity to play.",
  ],
  miniDescription:
    "Foster STEM education and modify toys for the Ithaca community.",
};
const educationAndAdvocacyPics = [EduAdvoPic1, EduAdvoPic2];

const business: Team = {
  imgUrl: BusinessPic1,
  teamName: "Business",
  description: [
    "We promote brand awareness and handle internal operations, like marketing, finance, sponsorships, and partnerships to support CAT's functions.",
    "We also help maintain the organization's website and build internal tools.",
  ],
  miniDescription: "Promote awareness and develop tools for CAT's operations.",
};
const businessPics = [BusinessPic1, BusinessPic2];

function teamToPic(teamName: string): StaticImageData[] {
  switch (teamName) {
    case "Engineering":
      return engineeringPics;
    case "Education & Advocacy":
      return educationAndAdvocacyPics;
    case "Business":
      return businessPics;
    default:
      return engineeringPics;
  }
}

export const TeamCard = ({
  imgUrl,
  teamName,
  miniDescription,
  description,
}: Team) => {
  const [showModal, setShowModal] = useState(false);
  function TeamCardModal({ teamName, description }: Team) {
    const pics = teamToPic(teamName);
    return (
      <div
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <div
          className="w-full lg:w-290 2xl:w-300 max-h-[90vh] lg:h-120 overflow-y-auto flex flex-col lg:flex-row p-4 sm:p-6 gap-4 sm:gap-6 lg:gap-8 bg-bg-lt-grey rounded-2xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* pic gallery */}
          <div className="w-full lg:w-70 flex flex-row lg:flex-col gap-4 lg:justify-between">
            {pics.map((p, index) => {
              return (
                <div
                  key={index}
                  className="bg-theme-white rounded-2xl p-2 flex-1 h-28 sm:h-32 lg:h-auto"
                >
                  <div className="relative h-full rounded-2xl overflow-hidden">
                    <Image
                      src={p}
                      alt={teamName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* text */}
          <div className="flex-1 flex flex-col bg-theme-white rounded-2xl p-4 sm:p-6">
            <h2 className="cardheading mb-3 sm:mb-6">{teamName}</h2>
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10">
              {description.map((d, index) => {
                return (
                  <div key={index} className="descriptext text-text-dk-grey">
                    {d}
                  </div>
                );
              })}
            </div>
            <div className="">
              <ButtonRed
                label={"Apply Now"}
                to={
                  "https://docs.google.com/forms/d/e/1FAIpQLSdmcYlKCtSdxqLfEYYRJw3yBkByUdLtE6donpQ1nDo6mSDvgw/viewform"
                }
                size={"S"}
                behav="External"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 max-w-full">
      {showModal && (
        <TeamCardModal
          imgUrl={imgUrl}
          teamName={teamName}
          description={description}
        />
      )}
      <div
        className="max-w-full min-h-full flex flex-col rounded-2xl
    border border-bg-lt-grey backdrop-blur-[2px] bg-theme-white/90"
      >
        <div className="h-48 sm:h-56 lg:h-60 w-full relative rounded-t-lg overflow-hidden">
          <Image
            src={imgUrl}
            alt={`The ${teamName} subteam`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between mt-6 md:mt-0 p-4 sm:p-6 flex-1 w-full">
          <div>
            <h3 className="cardheading mb-3 sm:mb-4 max-w-full">{teamName}</h3>
            <p className="descriptext text-text-grey mb-4 sm:mb-6">
              {miniDescription}
            </p>
            {/* {description.map((d, index) => {
          return (
            <p
              key={index}
              className="descriptext text-text-grey mt-2 px-2 max-w-full"
            >
              {d}
            </p>
          );
        })} */}
          </div>
          <button
            className="smbutton bg-theme-white hover:bg-bg-lt-grey cursor-pointer transition-colors duration-200 text-text-dk-grey outline-[1.5px] outline-text-dk-grey -outline-offset-1 w-fit rounded-full"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export const AboutTeams = () => {
  return (
    <div className="universepad py-6">
      <h2 className="heading">Our Teams</h2>
      <p className="subtext">See how you can get involved!</p>
      <div className="flex flex-col sm:flex-row justify-center mt-6 sm:mt-10 gap-5">
        <TeamCard
          imgUrl={engineering.imgUrl}
          teamName={engineering.teamName}
          description={engineering.description}
          miniDescription={engineering.miniDescription}
        />

        <TeamCard
          imgUrl={educationAndAdvocacy.imgUrl}
          teamName={educationAndAdvocacy.teamName}
          description={educationAndAdvocacy.description}
          miniDescription={educationAndAdvocacy.miniDescription}
        />

        <TeamCard
          imgUrl={business.imgUrl}
          teamName={business.teamName}
          description={business.description}
          miniDescription={business.miniDescription}
        />
      </div>
    </div>
  );
};
