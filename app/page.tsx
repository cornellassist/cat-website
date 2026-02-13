"use client";
import Home from "./Home/page";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function HomePage() {
  return (
    <>
      <Home />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
