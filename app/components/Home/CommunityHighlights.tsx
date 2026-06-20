"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { ButtonRed, ButtonWhite } from "@/app/components/Buttons";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { convertDate } from "@/utils/convertDate";

export interface CommHighProps {
  events: {
    id: number;
    title: string;
    longDescrip: string;
    shortDescrip: string;
    date: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

const imgStyles =
  "drop-shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] lg:drop-shadow-none rounded-[20px]";

function CommHighTitle() {
  return (
    <h2 className="heading mb-4 xl:mb-8 relative z-10">Community Highlights</h2>
  );
}

function CommHighDecorations() {
  return (
    <>
      <img
        src="/assets/Landing/hero-blob-clear.svg"
        alt=""
        aria-hidden
        className="hidden lg:block absolute -left-20 xl:-left-12 top-1/2 -translate-y-1/2 -z-10 opacity-20 scale-[45%] xl:scale-[55%] pointer-events-none"
      />
      <img
        src="/assets/Landing/mission-square-t.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute right-2 xl:right-10 top-16 xl:top-20 -z-10 scale-[40%] xl:scale-[50%] pointer-events-none"
      />
      <img
        src="/assets/Landing/mission-square-b.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute right-6 xl:right-14 top-28 xl:top-36 -z-10 scale-[40%] xl:scale-[50%] pointer-events-none"
      />
      <img
        src="/assets/Landing/mission-square-t.svg"
        alt=""
        aria-hidden
        className="sm:hidden absolute -left-6 bottom-10 -z-10 scale-[30%] rotate-180 pointer-events-none"
      />
    </>
  );
}

export function CommunityHighlights({ events }: CommHighProps) {
  // console.log(events);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (events.length !== 0) {
      setLoading(false);
    }
  }, [events]);

  function CommHighPics({ events }: CommHighProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const pictures = events.map((item) => item.imageUrl);
    const cardColors = [
      "bg-theme-lt-red/40",
      "bg-theme-lt-blue/40",
      "bg-theme-lt-purple/40",
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: true,
      align: "center",
    });

    useEffect(() => {
      if (!emblaApi) return;

      const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      onSelect();

      return (): void => {
        emblaApi.off("select", onSelect);
      };
    }, [emblaApi]);

    function CommHighButtons() {
      return (
        <div className="flex gap-10 mx-5 sm:gap-20 sm:mx-0 items-center">
          <div className="flex gap-10 items-center">
            <ChevronLeftIcon
              className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey"
              onClick={() => emblaApi?.scrollPrev()}
            />
            <div className="subtext">
              Highlight <span className="font-medium">{activeIndex + 1}</span>{" "}
              of <span className="font-medium">{events.length}</span>
            </div>
            <ChevronRightIcon
              className="h-9 2xl:h-12 cursor-pointer text-text-grey hover:text-text-dk-grey"
              onClick={() => emblaApi?.scrollNext()}
            />
          </div>
          {/* Uncomment once blog and newsletter are finished */}
          {/* medium buttons for larger screens */}
          {/* <div className="hidden xl:flex gap-4">
            <ButtonRed label="Visit Our Blog" to="/Blog" size="M" />
            <ButtonWhite label="Join Our Newsletter" to="" size="M" />
          </div> */}
          {/* small buttons for smaller screens */}
          {/* <div className="flex xl:hidden gap-4">
            <ButtonRed label="Visit Our Blog" to="/Blog" size="S" />
            <ButtonWhite label="Join Our Newsletter" to="" size="S" />
          </div> */}
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col lg:gap-5 xl:gap-10 items-center w-full relative z-10`}
      >
        <div
          ref={emblaRef}
          className="overflow-hidden w-full max-w-full h-90 lg:h-108"
        >
          <div className="flex">
            {pictures.map((pic, index) => (
              <div
                key={index}
                className="flex-[0_0_60%] lg:flex-[0_0_70%] min-w-0 flex justify-center relative px-2"
              >
                {/* desktop */}
                <div
                  className={`hidden relative lg:flex backdrop-blur-[2px] ${cardColors[index % 3]} h-100 w-250 transition-all duration-300  ${index === activeIndex ? "scale-100 z-10" : "scale-90"}
              rounded-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]`}
                >
                  <div className="flex h-full w-1/2 items-center ml-7 relative z-10">
                    <div className="relative w-full max-w-96 h-80 bg-white rounded-[20px] overflow-hidden">
                      <Image
                        src={pic}
                        alt={events[index].imageAlt}
                        fill
                        className={`object-cover ${imgStyles} origin-left scale-100 border border-white/20 transition-opacity duration-300 ${index === activeIndex ? "opacity-100" : "opacity-50"}`}
                        sizes="(max-width: 768px) 100vw, 548px"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col my-10 mx-10 w-1/2 justify-between relative z-10">
                    <div className="flex flex-col">
                      <h3
                        className={`underline decoration-2 underline-offset-10 decoration-theme-red ${activeIndex === index ? "subheading text-text-dk-grey" : "subheading text-text-grey-muted"}`}
                      >
                        {events[index].title}
                      </h3>
                      <p
                        className={`mt-8 ${activeIndex === index ? "descriptext text-text-dk-grey mt-2 " : "descriptext text-text-grey-muted mt-2 "}`}
                      >
                        {events[index].longDescrip}
                      </p>
                    </div>
                    <p
                      className={
                        activeIndex === index
                          ? "descriptext text-text-dk-grey mt-1"
                          : "descriptext text-text-grey-muted"
                      }
                    >
                      {convertDate(events[index].date)}
                    </p>
                  </div>
                </div>
                {/* mobile */}
                <div
                  className={`block lg:hidden relative w-full max-w-96 h-80 transition-all lg:transition-none duration-300 
                  ${index === activeIndex ? "scale-100 opacity-100 z-10" : "scale-90 opacity-50"} lg:scale-100 lg:opacity-100`}
                >
                  <Image
                    src={pic}
                    alt={events[index].imageAlt}
                    fill
                    className={`object-cover ${imgStyles} transition-opacity duration-300 ${index === activeIndex ? "opacity-100" : "opacity-50"}`}
                    sizes="(max-width: 768px) 100vw, 548px"
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-full h-28 sm:h-28 rounded-b-[20px] transition-all duration-300 backdrop-blur-sm pl-3 pt-2 bg-bg-dk-grey/60`}
                  >
                    <h3
                      className={
                        activeIndex === index
                          ? "subheading text-text-lt-grey"
                          : "subheading text-text-grey-muted"
                      }
                    >
                      {events[index].title}
                    </h3>
                    <p
                      className={
                        activeIndex === index
                          ? "descriptext text-text-lt-grey-2 mt-2 "
                          : "descriptext text-text-grey-muted mt-2 "
                      }
                    >
                      {events[index].shortDescrip}
                    </p>
                    <p
                      className={
                        activeIndex === index
                          ? "descriptext text-text-lt-grey-2 mt-1"
                          : "descriptext text-text-grey-muted"
                      }
                    >
                      {convertDate(events[index].date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CommHighButtons />
      </div>
    );
  }

  return (
    <div className="w-full h-130 md:h-135 lg:h-150 xl:h-170 flex flex-col items-center gap-5 mt-10 sm:mt-20 xl:mt-30 2xl:mt-40 relative overflow-hidden">
      <CommHighDecorations />
      <CommHighTitle />
      {!loading && <CommHighPics events={events} />}
    </div>
  );
}
