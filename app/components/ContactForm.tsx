"use client"
import { useState } from "react";
import Image from "next/image";
import BlurM from "@/public/assets/blur-m.png"
import BlurTR from "@/public/assets/blur-tr.png"
import { sendEmail } from "@/app/actions/sendEmail";


interface SocialTagProps {
  iconsrc: string;
  label: string;
  link: string;
  className?: string;
}

interface TextFieldProps {
  label: string;
  size: "Line" | "Area";
  val: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

// TODO: Firebase API


function SocialTag({ iconsrc, label, link, className }: SocialTagProps) {
  const iconStyles = "h-6 w-auto";
  return (
    <a href={link} className="cursor-pointer flex gap-2 hover:grayscale grayscale-0 hover:brightness-80 brightness-100 transition-all">
      <img src={iconsrc} alt="" className={iconStyles} />
      <p className={`text-base leading-normal text-theme-white ${className}`}>{label}</p>
    </a>
  )
}


function ContactHeader({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={BlurM} alt="" height={BlurM.height} width={BlurM.width} className="absolute left-1/2 -translate-x-1/2 -bottom-75 -z-10" />
      <img src="/assets/Contact/blob-bg.svg" alt="" className="absolute left-1/2 -translate-x-1/2 -top-10 w-full -z-10 scale-y-1100 scale-x-500 sm:scale-x-125 md:scale-x-100 xl:scale-y-100 lg:scale-y-160 md:scale-y-300 sm:scale-y-400"></img>
      {/* Note the heading and socialtags arent meant to be aligned */}
      <div className={`h-60 w-full universepad flex flex-col gap-5 sm:flex-row sm:gap-0 justify-between `}>
        <div className="flex flex-col gap-3">
          <h1 className="whitemainheading pt-12">Contact Us</h1>
          <p className="whitesubtext">Interested in collaborating or sharing your insights? Reach out to us.</p>
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <SocialTag iconsrc="/assets/Contact/white-email.svg" label="assistivetech@cornell.edu" link="mailto:assistivetech@cornell.edu" className="underline underline-offset-3" />
          <SocialTag iconsrc="/assets/Contact/white-linkedin.svg" label="Cornell Assistive Technologies" link="https://www.linkedin.com/company/cornellassist/" />
          <SocialTag iconsrc="/assets/Contact/white-insta.svg" label="cornellassist" link="https://www.instagram.com/cornellassist/" />
        </div>
      </div>
    </div>
  )
}

function TextField({ label, size, val, setter, className }: TextFieldProps) {
  const inputId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={inputId} className="formlabel text-text-dk-grey">{label}
        <span className="text-theme-red ml-1">*</span>
      </label>
      {size === "Line" ? (
        <input
          id={inputId}
          type="text"
          value={val}
          onChange={event => { setter(event.target.value) }}
          className="border-2 rounded-sm border-text-grey w-full"
          required
        />
      ) : (
        <textarea
          id={inputId}
          value={val}
          rows={10}
          onChange={(event) => setter(event.target.value)}
          className="border-2 rounded-sm border-text-grey"
          required
        />
      )}
    </div>
  );
}


function Form({ className }: { className?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidForm = firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && message.trim() !== ""

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidForm || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendEmail({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      if (result.success) {
        alert("Thank you! Your message has been sent successfully.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        alert(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`flex flex-col bg-theme-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] h-160 xl:w-141 w-4/5 rounded-[20px] px-10 pt-4 ${className}`}>
      <h2 className="formheading">Send a Message</h2>
      {/* <h2 className="subtext">This section is currently under construction, but you can contact us using our social media in the meantime.</h2> */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* <div className="flex pt-6 gap-10"> */}
        <div className="flex flex-col sm:flex-row sm:pt-6 sm:gap-10">
          <TextField
            label="First Name"
            size="Line"
            val={firstName}
            setter={setFirstName}
          />
          <TextField
            label="Last Name"
            size="Line"
            val={lastName}
            setter={setLastName}
          />
        </div>
        <TextField
          label="Email"
          size="Line"
          val={email}
          setter={setEmail}
          className="mt-4"
        />
        <TextField
          label="Message"
          size="Area"
          val={message}
          setter={setMessage}
          className="mt-4"
        />

        <button
          type="submit"
          className={`mt-6 w-full h-10 text-center formlabel text-theme-white bg-theme-red rounded-[1000px]
          transition-colors duration-200 ${!isValidForm || isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-theme-dk-red cursor-pointer"
            }`}
          disabled={!isValidForm || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}


export function ContactForm() {
  return (
    <div className="h-260 sm:h-230 mt-24 relative overflow-hidden">
      <ContactHeader className="absolute left-0 top-0" />
      <Form className="absolute left-1/2 -translate-x-1/2 top-85 sm:top-65 md:top-60 xl:left-90 xl:top-55 " />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.791640024081!2d-76.47607762388589!3d42.45344917118449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d0821a6191da9d%3A0xf50ee64d821b9ff4!2sCornell%20University!5e0!3m2!1sen!2sus!4v1768798639466!5m2!1sen!2sus"
        className="absolute xl:w-100 2xl:w-140 h-100 right-24 top-80 rounded-sm hidden xl:block"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <Image src={BlurTR} alt="" height={BlurTR.height} width={BlurTR.width} className="absolute right-0 -bottom-10 rotate-90" />
    </div>
  )
}