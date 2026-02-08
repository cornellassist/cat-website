"use client"
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { ButtonRed, ButtonWhite } from './Buttons';
import Bag1 from "@/public/assets/OurWork/bag1.png"
import Bag2 from "@/public/assets/OurWork/bag2.png"
import { useState, useEffect } from 'react';
import Tcb1 from "@/public/assets/OurWork/tcb1.png"
import Tcb2 from "@/public/assets/OurWork/tcb2.webp"
import Tcb3 from "@/public/assets/OurWork/tcb3.png"
import Touchpad1 from "@/public/assets/OurWork/touchpad1.png"
import Touchpad2 from "@/public/assets/OurWork/touchpad2.png"
import Chair1 from "@/public/assets/OurWork/chair1.png"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'


interface ProjectCardProps {
  title: string;
  description1: string;
  description2?: string;
  cta?: { label: string; to: string };
  imgs: { pic: StaticImageData; alt: string }[];
  index?: number;
}

const project1: ProjectCardProps = {
  title: "Tactile Coding Blocks",
  description1: "Touch-friendly code blocks with Braille labels and unique textures, enabling visually impaired learners to explore programming through touch",
  imgs: [{ pic: Tcb1, alt: "A team member opening a tactile coding blocks kit" }, { pic: Tcb2, alt: "An example of code written using tacile coding blocks." }],
  cta: { label: "Visit Project's Website", to: "https://tactile-coding-blocks-unified-websi.vercel.app/" },
}

const project2: ProjectCardProps = {
  title: "Urinary Drainage Bag",
  description1: "A urinary drainage bag designed for practicality and dignity, offering a lightweight, durable, and leak-resistant solution.",
  description2: "The reusable system includes a custom remote-controlled clamp, allowing easy repeated open-and-close cycles for daily use",
  imgs: [{ pic: Bag2, alt: "A close-up photo of the urinary drainage bag's clamp" }, { pic: Bag1, alt: "Team members working on the urinary drainage bag" }],
}

const project3: ProjectCardProps = {
  title: "Sensory Music Touchpad",
  description1: "A lap touchpad that lets users with hearing impairments feel music through vibrations",
  description2: "Melodies and rhythms are translated into pulse patterns, making music accessible and enjoyable for everyone",
  imgs: [{ pic: Touchpad1, alt: "Team members building 2 sensory music touchpads" }, { pic: Touchpad2, alt: "A close-up photo of the sensory music touchpad" }],
}

const project4: ProjectCardProps = {
  title: "Smart Wheelchair",
  description1: "An electric wheelchair controlled through brain–computer interfaces, under development to expand accessible mobility.",
  description2: "The system currently supports remote control and vision-based control modes.",
  imgs: [{ pic: Chair1, alt: "A team member testing the smart wheelchair" }],
}





const allProjects = [project1, project2, project3, project4];

function OurProjectsTopText() {
  return (
    <div className="flex flex-col">
      <h2 className="heading">Our Projects</h2>
      <p className="subtext mt-3 -mb-4 sm:mb-0">Take a look at some of our projects that we're currently working on!</p>
    </div>
  )
}


export function OurProjects() {
  function ProjectCard({ projects }: { projects: ProjectCardProps[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
    const [activeTab, setActiveTab] = useState(0)
    const [curPicIdx, setCurPicIdx] = useState(0);

    useEffect(() => {
      if (!emblaApi) return

      const onSelect = () => setActiveTab(emblaApi.selectedScrollSnap())
      emblaApi.on('select', onSelect)
      onSelect()

      return (): void => { emblaApi.off('select', onSelect) }
    }, [emblaApi])

    useEffect(() => {
      setCurPicIdx(0);
    }, [activeTab])

    function ProjectButtons({ className }: { className?: string }) {
      return (
        <div className="flex gap-10 self-center mt-10 sm:mt-12 md:mt-15 items-center">
          <ChevronLeftIcon className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey" onClick={() => emblaApi?.scrollPrev()} />
          <p className="subtext">
            Project <span className="font-medium">{activeTab + 1}</span> of <span className="font-medium">{projects.length}</span>
          </p>
          <ChevronRightIcon className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey" onClick={() => emblaApi?.scrollNext()} />
        </div>
      )
    }

    return (
      <div className="flex flex-col">
        <div className="overflow-hidden flex" ref={emblaRef}>
          <div className="flex">
            {projects.map((project, index) => {
              return (
                <div key={`project-${index}`} className="flex-[0_0_100%] min-w-0 flex flex-col lg:flex-row items-center lg:items-start h-130 2xl:h-140 lg:justify-end gap-6 lg:gap-10 xl:gap-12 2xl:gap-14 px-4">
                  <div className="h-full w-[50%] sm:w-[80%] lg:max-h-none lg:w-[50%] relative rounded-[20px] overflow-hidden">
                    {project.imgs.map((item, index) => (
                      <Image
                        key={index}
                        src={item.pic}
                        alt={item.alt}
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
                      {project.imgs.map((item, index) => (
                        <div key={`subpic-${index}`}>
                          <div className="h-12 w-18 xl:h-14 xl:w-20 2xl:h-16 2xl:w-22 relative rounded-lg overflow-hidden drop-shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] cursor-pointer brightness-90"
                            onClick={() => setCurPicIdx(index)}>
                            <Image
                              src={item.pic}
                              alt={item.alt}
                              fill
                              priority={index === activeTab && index === 0}
                              // loading={index === activeTab ? "eager" : "lazy"}
                              className={`object-cover`}
                            />
                            {index === curPicIdx && <div className="absolute inset-0 bg-white/50 rounded-lg pointer-events-none" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* text */}
                    <div className="flex flex-col text-center lg:text-start mt-10 lg:mt-0 items-center lg:items-start">
                      <h3 className="cardheading">{project.title}</h3>
                      <p className="mt-5 cardtext max-w-[50%] sm:max-w-[75%] lg:max-w-none">{project.description1}</p>
                      {project.description2 && <p className="cardtext mt-3 max-w-[50%] sm:max-w-[75%] lg:max-w-none">{project.description2}</p>}
                      {project.cta !== undefined &&
                        <div className="mt-5">
                          <div className="hidden md:block">
                            <ButtonRed label={project.cta.label} to={project.cta.to} behav='External' size="M" />
                          </div>
                          <div className="block md:hidden">
                            <ButtonRed label={project.cta.label} to={project.cta.to} behav='External' size="S" />
                          </div>
                        </div>}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div >
        <ProjectButtons />
      </div >
    )
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="h-auto w-full flex flex-col universepad py-8 xl:py-15 2xl:py-24" id="our-projects">
        <OurProjectsTopText />
        <div className="flex flex-col gap-8 lg:gap-10 xl:gap-15 2xl:gap-25 mt-15 items-center">
          <ProjectCard projects={allProjects} />
          <div className="flex justify-center">
            <ButtonWhite label="Explore All Projects We've Built" to="/assets/OurWork/Extensive-Documentation-of-CAT-Projects.pdf" behav="External" />
          </div>
        </div>
      </div>
      {/* <img src="/assets/OurWork/wave2-solid-top.svg" className="-z-10 w-full -mb-[0.75px]" />
      <img src="/assets/OurWork/wave2-solid-bottom.svg" className="-z-10 w-full" /> */}
    </div>
  )
}