import { Navbar } from "@/app/components/Navbar"
import { AboutUsHero } from "@/app/components/AboutUsHero";
import { Members } from "@/app/components/Members";
import { Footer } from "@/app/components/Footer";
import { ExploreOurTeams } from "@/app/components/ExploreOurTeams";

export default function AboutUs() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <AboutUsHero />
      <ExploreOurTeams />
      <Members />
      <Footer />
    </div>
  );
}