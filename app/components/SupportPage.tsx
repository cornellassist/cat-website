"use client"
import { useState } from "react";
import { ButtonRed } from "./Buttons";
import SponsorImg from "@/public/assets/Support/sponsor-img.png"
import Image from "next/image";
import BlurTR from "@/public/assets/blur-tr.png"


interface SponsorTierTagProps {
  label: string;
  bullets: string[];
}

const centered = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"


function SponsorTierSection({ label, bullets }: SponsorTierTagProps) {
  return (
    <div className="flex flex-col">
      {/* Red tag */}
      <div className="rounded-lg bg-theme-white text-theme-red font-semibold text-xl border-2
      h-12 w-100 flex items-center justify-center">{label}</div>
      <ul className="pl-5 mt-2">
        {bullets.map((item, index) => {
          return <li key={`${label}-bullet-${index}`} className="subtext list-disc list-outside">{item}</li>;
        })}
      </ul>
    </div>
  );
}

function SponsorGraphic() {
  return (
    <div className="relative w-120 h-100">
      <img src="/assets/Support/sponsor-blob.svg" alt="" className={`w-120 ${centered}`} />
      <Image src={SponsorImg} alt="The team working on adapting a toy car at a community event"
        className={`h-90 w-auto rounded-[20px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] hover:scale-102 transition-transform duration-300 right-0 top-0 ${centered}`} />
    </div>
  )
}

type Tabs = "Sponsorship" | "Donation";
const tabStyles = "w-50 h-13 rounded-t-[15px] text-theme-red font-medium text-xl cursor-pointer"
const selectedTabStyles = `${tabStyles} bg-theme-white`
const unselectedTabStyles = `${tabStyles} bg-theme-grey`

//  px-5 sm:px-10 md:px-16 lg:px-18
export function SupportPage() {
  const [tab, setTab] = useState<Tabs>("Sponsorship");

  function FundingTabs({ className }: { className?: string }) {
    return (
      <div className={`flex ${className}`}>
        <button className={`flex-1 sm:flex-none ${tab === "Sponsorship" ? selectedTabStyles : unselectedTabStyles}`}
          onClick={() => { setTab("Sponsorship") }}>Sponsorship</button>
        <button className={`flex-1 sm:flex-none ${tab === "Donation" ? selectedTabStyles : unselectedTabStyles}`}
          onClick={() => { setTab("Donation") }}>Donation</button>
      </div>
    )
  }
  function FundingHeader() {
    return (
      <div className="h-65 w-full bg-linear-to-l from-theme-dk-red to-theme-red flex flex-col gap-3 mt-24 universepad pt-12 relative">
        <h1 className="whitemainheading">Support</h1>
        <p className="whitesubtext">Thank you for your support of our initiative! You can assist us by sponsoring us or making an individual donation.</p>
        <FundingTabs className="absolute -bottom-1 w-full sm:w-auto left-0 sm:left-10 md:left-16 lg:left-18" />
      </div>
    )
  }
  function SponsorshipPage() {
    return (
      <div className="bg-theme-white z-10 h-auto mb-12 universepad relative">
        {/* text section */}
        <div className="flex flex-col w-9/10 gap-6 md:gap-10 lg:gap-14">
          {/* <p className="subtext mt-12">Your sponsorship supports Cornell Assistive
            Technologies’ mission to enhance inclusivity through innovative
            design. Contributions help offset the costs of our student-led projects and community outreach initiatives, each designed to meet the unique needs of individuals with disabilities.</p> */}
          <div>
            <p className="subtext mt-10">Your organization can help our mission in two ways:</p>
            <ol className="subtext list-decimal list-outside pl-10 mt-4 space-y-2">
              <li>
                <strong>Program Partner</strong>: Provide general support to help our ongoing initiatives
              </li>
              <li><strong>Project/Event Sponsor</strong>: Sponsor a specific initiative that aligns with your values
              </li>
            </ol>
          </div>
          {/* <p className="subtext mt-10">See our Program Partner tiers here:</p> */}
          {/* <div className="flex justify-between items-center">
            <div className="flex flex-col gap-10 mt-12">
              <SponsorTierSection label="Supporter Tier: $500 - $3499" bullets={["Website logo placement", "CAT swag pack"]} />
              <SponsorTierSection label="Advocate Tier - $3500" bullets={["Supporter Tier benefits", "Exclusive access to our project portfolio", "Brand recognition at a community event"]} />
              <SponsorTierSection label="Champion Tier - $5000" bullets={["Advocate Tier benefits", "Brand recognition at a resume workshop", "Opportunity to host a showcase session", "Access to the CAT resume book"]} />
              <SponsorTierSection label="Visionary Tier - $6500+" bullets={["Champion Tier benefits", "Recognition as a top sponsor with logo on CAT merchandise", "Opportunity to co-host a professional development workshop"]} />
            </div>
            <SponsorGraphic />
          </div> */}
          <div>
            <p className="subtext mb-4">To become a Program Partner, download and submit the sponsorship packet by mail, then email us at <a href="mailto:assistivetech@cornell.edu" className="underline underline-offset-2">cornellassist@gmail.com </a> to confirm your sponsorship.</p>
            {/* <p className="mt-3 mb-8 text-sm text-text-dk-grey">*Email Cornell Assistive Technologies at cornellassist@gmail.com for custom tier options</p> */}
            <div className="hidden md:block">
              <ButtonRed label="View Sponsor Packet" to="/assets/Support/CAT%202025%20Fall%20Sponsorship.pdf" behav="External" />
            </div>
            <div className="block md:hidden">
              <ButtonRed label="View Sponsor Packet" to="/assets/Support/CAT%202025%20Fall%20Sponsorship.pdf" behav="External" size="M" />
            </div>
          </div>
          <p className="subtext mb-4">To become a Project/Event Sponsor, please contact us at <a href="mailto:assistivetech@cornell.edu" className="underline underline-offset-2">cornellassist@gmail.com </a> and include the event you are interested in sponsoring.</p>

        </div>
        <Image src={BlurTR} alt="" height={BlurTR.height / 2} width={BlurTR.width / 2} className="absolute right-0 top-0" />
      </div>
    );
  }

  function DonationPage() {
    return <div className="bg-theme-white z-10 h-auto universepad flex mb-12">
      <div className="flex flex-col w-9/10 gap-6 md:gap-8 lg:gap-14">
        <div>
          <p className="subtext mt-12">Your contribution as an individual helps us further our mission. There are two ways to give:</p>
          <ol className="subtext list-decimal list-outside pl-10 mt-4 space-y-2">
            <li>
              <strong>Donate a Toy</strong>: We adapt donated toys to make play inclusive for children
            </li>
            <li>
              <strong>Donate With Card</strong>: Make a one-time donation to support our mission and work
            </li>
          </ol>
        </div>
        <p className="subtext">To donate a toy, please first email us at <a href="mailto:assistivetech@cornell.edu" className="underline underline-offset-2">cornellassist@gmail.com </a> to receive our current toy wishlist and instructions.</p>
        {/* <ButtonRed label="See Wishlist" to="https://www.amazon.com/hz/wishlist/ls/13KDRAOU6ZAPR?ref_=wl_share" size="M" /> */}
        <div>
          <p className="subtext mb-4">If you would like to donate via card, you can navigate to our <a href="https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&cid=27217&dids=5596&sort=1&bledit=1" className="underline underline-offset-2">Giving to Cornell</a> page. From here, Giving to Cornell will guide you in safely transferring the funds to our Cornell Assistive Technologies internal account.</p>
          <div className="hidden md:block">
            <ButtonRed label="Visit Giving to Cornell" to="https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&cid=27217&dids=5596&sort=1&bledit=1" />
          </div>
          <div className="block md:hidden">
            <ButtonRed label="Visit Giving to Cornell" to="https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&cid=27217&dids=5596&sort=1&bledit=1" size="M" />
          </div>
        </div>
      </div>
    </div>;
  }

  return (
    <div className="flex flex-col">
      <FundingHeader />
      {tab === "Sponsorship" ? <SponsorshipPage /> : <DonationPage />}
    </div>
  );
} 