"use client";
import Image from "next/image";
import { ButtonRed, ButtonWhite } from "./Buttons";
import ImgT from "@/public/assets/Landing/img-tr.png";
import ImgB from "@/public/assets/Landing/img-br.png";
import { loadingComplete, imgLoadStyles } from "../../utils/imgLoad";

const imgStyles =
  "h-35 sm:h-50 w-full xl:h-60 xl:w-85 2xl:h-70 2xl:w-100 rounded-t-[20px] sm:rounded-[20px] shadow-[0_-2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]";

function MissionMainCard() {
  return (
    <div className="flex flex-col items-center relative">
      <Image
        src={ImgT}
        alt=""
        className={`object-cover object-top ${imgStyles} ${imgLoadStyles} sm:hidden`}
        width={340}
        height={240}
        onLoadingComplete={(img) => loadingComplete(img)}
      />
      <div
        className="h-85 sm:h-90 xl:h-130 2xl:h-150 w-full backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] 
    flex flex-col justify-between rounded-b-[20px] sm:rounded-[20px] py-2 sm:py-8 px-10 sm:px-15 relative"
      >
        <div className="flex flex-col">
          <h2 className="heading">Our Mission</h2>
          <p className="subtext mt-2 sm:mt-6">
            We are a student-led team working with community partners to design
            assistive technologies and promote accessibility for people with
            disabilities in Ithaca and beyond.
          </p>
          <p className="subtext mt-4 sm:mt-6 w-3/4">
            We work with individuals, families, and organizations to create
            accessible solutions and educational opportunities.
          </p>
        </div>
        <div className="gap-6 mb-2 hidden xl:flex">
          <ButtonRed label="Join Us" to="/JoinUs" />
          <ButtonWhite label="Meet the Team" to="/AboutUs" />
        </div>
        <div className="gap-6 mb-4 sm:hidden flex">
          <ButtonRed label="Join Us" to="/JoinUs" size="S" />
          <ButtonWhite label="Meet the Team" to="/AboutUs" size="S" />
        </div>
        {/* decorative squares, for large screens */}
        <img
          src="/assets/Landing/mission-square-t.svg"
          alt=""
          className="hidden xl:block absolute right-0 bottom-15 scale-[80%]"
        />
        <img
          src="/assets/Landing/mission-square-b.svg"
          alt=""
          className="hidden xl:block absolute right-6 -bottom-10 scale-[80%]"
        />
        {/* same squares for medium screens */}
        <img
          src="/assets/Landing/mission-square-t.svg"
          alt=""
          className="hidden sm:block xl:hidden absolute right-0 top-8 -scale-y-100 scale-[60%]"
        />
        <img
          src="/assets/Landing/mission-square-b.svg"
          alt=""
          className="hidden sm:block xl:hidden absolute right-5 -top-12 -scale-y-100 scale-[60%]"
        />
      </div>
      {/* same squares for small screens */}
      <img
        src="/assets/Landing/mission-square-t.svg"
        alt=""
        className="sm:hidden absolute rotate-180 -right-7 bottom-2 -scale-y-100 scale-[40%] z-10"
      />
      <img
        src="/assets/Landing/mission-square-b.svg"
        alt=""
        className="sm:hidden absolute rotate-180 -right-7 -bottom-14 -scale-y-100 scale-[40%] z-10"
      />
    </div>
  );
}
function MissionGraphic() {
  return (
    <div className="flex flex-row-reverse justify-between xl:flex-col xl:h-130 2xl:h-150 gap-8 items-center w-full xl:w-1/3">
      <div className="hidden sm:flex flex-1 flex-col items-center gap-8 xl:flex-none xl:w-85">
        <Image
          src={ImgT}
          alt=""
          className={`object-cover object-top ${imgStyles} ${imgLoadStyles}`}
          width={340}
          height={240}
          onLoadingComplete={(img) => loadingComplete(img)}
        />
        {/* Button only shows on small screens */}
        <div className="xl:hidden">
          <ButtonWhite label="Meet the Team" to="/AboutUs" />
        </div>
      </div>
      <div className="hidden sm:flex flex-1 flex-col items-center gap-8 xl:flex-none xl:w-85">
        <Image
          src={ImgB}
          alt=""
          className={`object-cover ${imgStyles} ${imgLoadStyles}`}
          width={340}
          height={240}
          onLoadingComplete={(img) => loadingComplete(img)}
        />
        {/* Button only shows on small screens */}
        <div className="xl:hidden">
          <ButtonRed label="Join Us" to="/JoinUs" />
        </div>
      </div>
    </div>
  );
}

export function Mission() {
  return (
    <div className="xl:h-130 2xl:h-140 flex flex-col-reverse xl:flex-row gap-8 items-center universepad relative">
      <MissionGraphic />
      <MissionMainCard />
      {/* <div className="gap-6 mb-2 flex xl:hidden order-first">
        <ButtonRed label="Join Us" to="/JoinUs" />
        <ButtonWhite label="Meet the Team" to="/AboutUs" />
      </div> */}

      {/* <Image src={BlurM} alt="" height={BlurM.height} width={BlurM.width} className="absolute left-1/2 -translate-x-1/2 -bottom-70 -z-10" /> */}
    </div>
  );
}
