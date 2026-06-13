import { Navbar } from "@/app/components/Navbar"
import { Footer } from "@/app/components/Footer";
import { JoinUsHero } from "@/app/components/JoinUs/JoinUsHero";
import { AboutTeams } from "@/app/components/JoinUs/AboutTeams";

export default function JoinUs() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <JoinUsHero />
      {/* <AboutTeams /> */}
      <Footer />
    </div>
  );
}