"use client";

import { useRouter } from "next/navigation";

type ButtonProps = {
  label: string;
  to: string;
  size?: "L" | "M" | "S";
  behav?: "Internal" | "Scroll" | "External";
  disabled?: boolean;
};

const baseButtonStyles = "rounded-full";
const baseWidthStyles = "w-auto max-w-full";

const sizeStyles = {
  L: "lgbutton",
  M: "midbutton",
  S: "smbutton",
};

function onClickNavigation({
  to,
  behav = "Internal",
  disabled = false,
  router,
}: {
  to: string;
  behav: string;
  disabled: boolean;
  router: ReturnType<typeof useRouter>;
}) {
  if (!disabled) {
    if (behav === "Scroll") {
      const element = document.getElementById(to);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else if (behav === "Internal") {
      router.push(to);
    } else {
      window.open(to, "_blank");
    }
  }
}

export function ButtonRed({
  label,
  to,
  size = "L",
  behav = "Internal",
  disabled = false,
}: ButtonProps) {
  const router = useRouter();
  return (
    <div className={baseWidthStyles}>
      <button
        onClick={() => onClickNavigation({ to, behav, disabled, router })}
        className={`${!disabled ? "bg-theme-red hover:bg-theme-dk-red cursor-pointer transition-colors duration-200" : "bg-theme-m-red"} text-theme-white ${baseButtonStyles} 
         ${sizeStyles[size]}`}
      >
        {label}
      </button>
    </div>
  );
}

export function ButtonWhite({
  label,
  to,
  size = "L",
  behav = "Internal",
  disabled = false,
}: ButtonProps) {
  const router = useRouter();
  return (
    <div className={baseWidthStyles}>
      <button
        onClick={() => onClickNavigation({ to, behav, disabled, router })}
        className={`${!disabled ? "bg-theme-white hover:bg-bg-lt-grey cursor-pointer transition-colors duration-200" : "bg-bg-lt-grey"} 
        text-text-dk-grey outline-[1.5px] outline-text-dk-grey -outline-offset-1 ${baseButtonStyles}
          ${sizeStyles[size]}`}
      >
        {label}
      </button>
    </div>
  );
}
