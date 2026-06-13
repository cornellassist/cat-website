import { Navbar } from "@/app/components/Navbar"
import { Footer } from "@/app/components/Footer";
import { SupportPage } from "@/app/components/Support/SupportPage";


export default function Support() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <SupportPage />
      <Footer />
    </div>
  );
}

