"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import CATLogo from "@/public/assets/cat-logo.png"
import Image from 'next/image';
import { useState } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid'

const baseTabStyles = "text-base font-medium hover:text-theme-dk-red cursor-pointer"
const activeStyles = `${baseTabStyles} text-theme-red`
const nonActiveStyles = `${baseTabStyles} text-text-dk-grey`

export function Navbar() {
  type TabProps = {
    routeToPath: string;
    tabName: string;
  };

  const router = useRouter();
  const location = usePathname();

  const [showMobileTabs, setShowMobileTabs] = useState(false)

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location === path;
  };

  const Tab = ({ routeToPath, tabName }: TabProps) => {
    return <button
      onClick={() => {
        router.push(routeToPath);
        setShowMobileTabs(false)
      }
      }
      className={`${isActive(routeToPath) ? activeStyles : nonActiveStyles}`
      }>
      {tabName}
    </button >
  }

  function MobileTabs() {
    return (
      <nav className={`bg-theme-white/80 fixed inset-0 mt-15 sm:mt-19 md:mt-23 backdrop-blur-xs overflow-y-auto
      ${showMobileTabs ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col gap-10 items-end pr-7 py-7" >
          <Tab routeToPath="/" tabName="Home" />
          <Tab routeToPath="/OurWork" tabName="Our Work" />
          <Tab routeToPath="/AboutUs" tabName="About Us" />
          {/* <Tab routeToPath="/Blog" tabName="Blog" /> */}
          {/* <Tab routeToPath="/DIY" tabName="DIY" /> */}
          <Tab routeToPath="/JoinUs" tabName="Join Us" />
          <Tab routeToPath="/Contact" tabName="Contact" />
          <Tab routeToPath="/Support" tabName="Support" />
        </div>
      </nav >
    )
  }

  return (
    <>
      <div className="flex fixed top-0 left-0 w-full z-50 justify-between h-16 sm:h-20 md:h-24 bg-white">
        <Image src={CATLogo} alt="Cornell Assistive Technologies Logo" height={CATLogo.height} width={CATLogo.width} className="h-auto w-auto cursor-pointer"
          onClick={() => { router.push("/") }} />
        <nav className="hidden lg:flex justify-end">
          <div className="flex gap-16 mr-20">
            <Tab routeToPath="/" tabName="Home" />
            <Tab routeToPath="/OurWork" tabName="Our Work" />
            <Tab routeToPath="/AboutUs" tabName="About Us" />
            {/* <Tab routeToPath="/Blog" tabName="Blog" /> */}
            {/* <Tab routeToPath="/DIY" tabName="DIY" /> */}
            <Tab routeToPath="/JoinUs" tabName="Join Us" />
            <Tab routeToPath="/Contact" tabName="Contact" />
            <Tab routeToPath="/Support" tabName="Support" />
          </div>
        </nav>
        <div className="flex lg:hidden items-center pr-5">
          <Bars3Icon className="flex lg:hidden h-8 sm:h-10 nonActiveStyles" onClick={() => { setShowMobileTabs(!showMobileTabs) }} />
          <MobileTabs />
        </div>
      </div>
    </>
  );
}
