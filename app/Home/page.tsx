"use client";

import { Navbar } from "@/app/components/Navbar";
import { LandingHero } from "@/app/components/LandingHero";
import { CommunityHighlights } from "@/app/components/CommunityHighlights";
import { PartnersAndSponsors } from "@/app/components/PartnersAndSponsors";
import { TakePart } from "@/app/components/TakePart";
import { Footer } from "@/app/components/Footer";
import { Mission } from "@/app/components/Mission";
import { EventNotif } from "../components/EventNotif";
import { useEffect, useState } from "react";
import axios from "axios";

// import { UnderConstructionPopup } from "../components/UnderConstructionPopup";

// no periods for short description

const curEvents: Array<[string, { short: string; long: string }, string]> = [
  [
    "ISLAND Conference",
    {
      short: "Inclusion in Science Learning Conference",
      long: "Our team participated in the Inclusion in Science Learning Conference, which highlights work that removes barriers to access for people with disabilities.",
    },
    "09/26/2025",
  ],
  [
    "GoBabyGo! 2025",
    {
      short: "Adapting ride-on cars for children with motor disabilities",
      long: "Our annual event where we adapt ride-on cars for children with motor disabilities, in collaboration with Ithaca College Occupational Therapists.",
    },
    "04/12/2025",
  ],
  [
    "Sciencenter Workshop",
    {
      short: "Hands-on circuit workshop to make LED art",
      long: "We taught a hands-on circuit workshop at Ithaca's Sciencenter, introducing basic circuitry to make LED art.",
    },
    "03/22/2025",
  ],
];

export default function Home() {
  const [highlights, setHighlights] = useState();
  useEffect(() => {
    async function fetchHighlights() {
      try {
        const { data } = await axios.get("/api/highlights");
        setHighlights(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchHighlights();
  }, []);

  return (
    <div>
      {/* <UnderConstructionPopup /> */}
      <Navbar />
      {/* <EventNotif /> */}
      <LandingHero />
      <Mission />
      <CommunityHighlights events={curEvents} />
      <PartnersAndSponsors />
      <div className="flex justify-center mb-0 sm:mb-10 lg:mb-20">
        <TakePart />
      </div>
      <Footer />
    </div>
  );
}

// Phones
// 375 × 667
// 414 × 736

// Tablets and IPads
// 768 × 1024
// 1024 × 768

// Laptops
// 1280 × 800
// 1366 × 768

// Desktops and monitors
// 1920 × 1080
// 2560 × 1440

// Breakpoints
// sm 640
// md 768
// lg 1024
// xl 1280
// 2xl 1536
