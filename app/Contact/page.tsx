import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ContactForm } from "@/app/components/Contact/ContactForm";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <ContactForm />
      <Footer />
    </div>
  );
}

