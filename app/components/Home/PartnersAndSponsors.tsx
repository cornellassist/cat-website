"use client"

import Image from 'next/image';
import CompanyLogoScroll, { Company } from './CompanyLogoScroll';
// partners row 1 images
import GreaterBOCES from "@/public/assets/Landing/Partners/greater-southen-tier-boces.png"
import TstBOCES from "@/public/assets/Landing/Partners/tst-boces.png"
import IthacaSchool from "@/public/assets/Landing/Partners/ithaca-city-school-district.png"
// row 2 images
import Flic from "@/public/assets/Landing/Partners/flic.jpg"
import Racker from "@/public/assets/Landing/Partners/racker.png"
import CodeRedRobotics from "@/public/assets/Landing/Partners/code-red-robotics.png"
import Sciencenter from "@/public/assets/Landing/Partners/sciencenter.jpg"
import UnityHouse from "@/public/assets/Landing/Partners/unity-house.webp"
// row 3 images (to be redistributed)
import MountainLakesLibrary from "@/public/assets/Landing/Partners/mountain-lakes-library.png"
import NYOpportunity from "@/public/assets/Landing/Partners/ny-opportunity.jpg"
import Nysed from "@/public/assets/Landing/Partners/nysed.png"
// sponsors
import Safc from "@/public/assets/Landing/Sponsors/safc.png"
import Cpfb from "@/public/assets/Landing/Sponsors/CPFB.png"
import ContributionProject from "@/public/assets/Landing/Sponsors/contribution-project.webp"
import HumanEco from "@/public/assets/Landing/Sponsors/human-ecology.png"

const rowStyles = "flex gap-8 justify-center items-center"
const colStyles = "flex flex-col sm:gap-0 md:gap-2 lg:gap-6 xl:gap-8 mt-5 sm:mt-10 md:mt-15"
const imgStyles = "h-7 sm:h-10 md:h-12 lg:h-17 w-auto cursor-pointer"

function Partners() {
  // Row 1: 4 existing + 2 from row 3 (MountainLakesLibrary, Quorum) = 6 total, scroll right
  const row1Companies: Company[] = [
    {
      logo: GreaterBOCES,
      name: "Greater Southern Tier BOCES",
      url: "https://www.gstboces.org/"
    },
    {
      logo: TstBOCES,
      name: "TST BOCES",
      url: "https://www.tstboces.org/"
    },
    {
      logo: IthacaSchool,
      name: "Ithaca City School District",
      url: "https://www.ithacacityschools.org/"
    },
    {
      logo: "/assets/Landing/Partners/ithaca-college.svg",
      name: "Ithaca College",
      url: "https://www.ithaca.edu/academics/school-health-sciences-and-human-performance/occupational-therapy"
    },
    {
      logo: MountainLakesLibrary,
      name: "Mountain Lakes Public Library Makerspace",
      url: "https://bit.ly/m/mlmakerspace"
    },
    {
      logo: "/assets/Landing/Partners/quorum.svg",
      name: "Quorum",
      url: "https://quorumlanguage.com/"
    }
  ];

  // Row 2: 5 existing + 2 from row 3 (NYOpportunity, Nysed) = 7 total, scroll left
  const row2Companies: Company[] = [
    {
      logo: Flic,
      name: "FLIC",
      url: "https://fliconline.org/FLIC/"
    },
    {
      logo: Racker,
      name: "Racker",
      url: "https://www.racker.org/"
    },
    {
      logo: CodeRedRobotics,
      name: "Code Red Robotics",
      url: "https://www.team639.org/"
    },
    {
      logo: Sciencenter,
      name: "Sciencenter",
      url: "https://sciencenter.org/"
    },
    {
      logo: UnityHouse,
      name: "Unity House",
      url: "https://unityhouse.org/"
    },
    {
      logo: NYOpportunity,
      name: "New York State of Opportunity",
      url: "https://www.ny.gov/"
    },
    {
      logo: Nysed,
      name: "New York State Education Department",
      url: "https://www.nysed.gov/new-york-state-school-blind"
    }
  ];

  return (
    <div className={colStyles}>
      {/* row 1 - scroll right */}
      <CompanyLogoScroll scrollDirection="right" companies={row1Companies} />
      {/* row 2 - scroll left */}
      <CompanyLogoScroll scrollDirection="left" companies={row2Companies} />
    </div>
  )
}

function Sponsors() {
  return (
    <div className={colStyles}>
      <div className={rowStyles}>
        <Image src={Safc} alt="Visit Student Activities Funding Commission" height={Safc.height} width={Safc.width} className={imgStyles}
          onClick={() => window.open('https://cornell.campusgroups.com/safc/home/', '_blank')} />
        <Image src={Cpfb} alt="Visit Community Partnership Funding Board" height={Cpfb.height} width={Cpfb.width} className={imgStyles}
          onClick={() => window.open('https://cornell.campusgroups.com/cpfb/home/', '_blank')} />
        <Image src={ContributionProject} alt="Visit The Contribution Project" height={ContributionProject.height} width={ContributionProject.width} className={imgStyles}
          onClick={() => window.open('https://contributionproject.org/', '_blank')} />
        <Image src={HumanEco} alt="Visit Cornell College of Human Ecology" height={HumanEco.height} width={HumanEco.width} className={imgStyles}
          onClick={() => window.open('https://www.human.cornell.edu/hcd/facilities/d2fs', '_blank')} />
      </div>
    </div>
  )
}


export function PartnersAndSponsors() {
  return (

    <div className="sm:h-160 md:h-200 lg:h-220 xl:h-230 w-full flex flex-col universepad pt-15">
      <h2 className="heading">Partners & Sponsors</h2>
      <p className="subtext mt-2 sm:mt-6 md:mt-10 text-center">We are dedicated to partnering with various communities to support accessibility and inclusivity. Here are our partners!</p>
      <Partners />
      <p className="subtext mt-4 sm:mt-12 md:mt-24 text-center">We are so grateful to receive funding to support our mission. Here are our sponsors!</p>
      <Sponsors />
    </div>
  )
}