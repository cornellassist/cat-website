"use client";

import Image from "next/image";
import { ButtonRed, ButtonWhite } from "./Buttons";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface ProjectCardProps {
  title: string;
  descrip: string;
  descrip2?: string;
  imageUrls: string[];
  imageAlts?: string[];
  ctaLink?: string;
  ctaTitle?: string;
}

function OurProjectsTopText() {
  return (
    <div className="flex flex-col">
      <h2 className="heading">Featured Projects</h2>
      <p className="subtext mt-3 -mb-4 sm:mb-0">
        Take a look at some of our projects that we're currently working on!
      </p>
    </div>
  );
}

export function OurProjects({ projects }: { projects: ProjectCardProps[] }) {
  function ProjectCard({ projects }: { projects: ProjectCardProps[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: true,
      align: "center",
    });
    const [activeTab, setActiveTab] = useState(0);
    const [curPicIdx, setCurPicIdx] = useState(0);

    useEffect(() => {
      if (!emblaApi) return;

      const onSelect = () => setActiveTab(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      onSelect();

      return (): void => {
        emblaApi.off("select", onSelect);
      };
    }, [emblaApi]);

    useEffect(() => {
      setCurPicIdx(0);
    }, [activeTab]);

    function ProjectButtons({ className }: { className?: string }) {
      return (
        <div className="flex gap-10 self-center mt-10 sm:mt-12 md:mt-15 items-center">
          <ChevronLeftIcon
            className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey"
            onClick={() => emblaApi?.scrollPrev()}
          />
          <p className="subtext">
            Project <span className="font-medium">{activeTab + 1}</span> of{" "}
            <span className="font-medium">{projects.length}</span>
          </p>
          <ChevronRightIcon
            className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey"
            onClick={() => emblaApi?.scrollNext()}
          />
        </div>
      );
    }

    const cardHeight = "h-130 2xl:h-140";
    return (
      <div className="flex flex-col">
        <div className="overflow-hidden flex" ref={emblaRef}>
          <div className={`flex ${cardHeight}`}>
            {projects.map((project, index) => {
              return (
                <div
                  key={`project-${index}`}
                  className={`flex-[0_0_100%] min-w-0 flex flex-col lg:flex-row items-center lg:items-start ${cardHeight} lg:justify-end gap-6 lg:gap-10 xl:gap-12 2xl:gap-14 px-4`}
                >
                  <div className="h-full w-[50%] sm:w-[80%] lg:max-h-none lg:w-[50%] relative rounded-[20px] overflow-hidden">
                    {project.imageUrls.map((item, index) => (
                      <Image
                        key={index}
                        src={item}
                        alt={project?.imageAlts?.[curPicIdx] ?? ""}
                        fill
                        loading={index === activeTab ? "eager" : "lazy"}
                        className={`object-cover absolute inset-0 transition-opacity duration-300 ease-in-out ${index === curPicIdx ? "opacity-100" : "opacity-0"}
                      `}
                      />
                    ))}
                  </div>
                  {/* rightside content and selecting photo */}
                  <div className="flex flex-col justify-between w-full lg:w-[50%] lg:h-full">
                    <div className="flex flex-row justify-center lg:flex-col lg:justify-start gap-6">
                      {project.imageUrls.map((item, index) => (
                        <div key={`subpic-${index}`}>
                          <div
                            className="h-12 w-18 xl:h-14 xl:w-20 2xl:h-16 2xl:w-22 relative rounded-lg overflow-hidden drop-shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] cursor-pointer brightness-90"
                            onClick={() => setCurPicIdx(index)}
                          >
                            <Image
                              src={item}
                              alt={project?.imageAlts?.[index] ?? ""}
                              fill
                              priority={index === activeTab && index === 0}
                              // loading={index === activeTab ? "eager" : "lazy"}
                              className={`object-cover`}
                            />
                            {index === curPicIdx && (
                              <div className="absolute inset-0 bg-white/50 rounded-lg pointer-events-none" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* text */}
                    <div className="flex flex-col text-center lg:text-start mt-10 lg:mt-0 items-center lg:items-start">
                      <h3 className="cardheading">{project.title}</h3>
                      <p className="mt-5 cardtext max-w-[50%] sm:max-w-[75%] lg:max-w-none">
                        {project.descrip}
                      </p>
                      {project?.descrip2 && (
                        <p className="cardtext mt-3 max-w-[50%] sm:max-w-[75%] lg:max-w-none">
                          {project.descrip2}
                        </p>
                      )}
                      {project.ctaTitle !== null && (
                        <div className="mt-5">
                          <div className="hidden md:block">
                            <ButtonRed
                              label={project?.ctaTitle ?? ""}
                              to={project?.ctaLink ?? ""}
                              behav="External"
                              size="M"
                            />
                          </div>
                          <div className="block md:hidden">
                            <ButtonRed
                              label={project?.ctaTitle ?? ""}
                              to={project?.ctaLink ?? ""}
                              behav="External"
                              size="S"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ProjectButtons />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div
        className="h-auto w-full flex flex-col universepad py-8 xl:py-15 2xl:py-24"
        id="our-projects"
      >
        <OurProjectsTopText />
        <div
          className={`flex flex-col gap-8 lg:gap-10 xl:gap-15 2xl:gap-25 mt-15 items-center relative`}
        >
          <ProjectCard projects={projects} />
          <div className="flex justify-center">
            <ButtonWhite
              label="Explore All Projects We've Built"
              to="/assets/OurWork/Extensive-Documentation-of-CAT-Projects.pdf"
              behav="External"
            />
          </div>
        </div>
      </div>
      {/* <img src="/assets/OurWork/wave2-solid-top.svg" className="-z-10 w-full -mb-[0.75px]" />
      <img src="/assets/OurWork/wave2-solid-bottom.svg" className="-z-10 w-full" /> */}
    </div>
  );
}
