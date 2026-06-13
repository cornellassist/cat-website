import Image from "next/image";

export function EventNotif() {
  return (
    <div
      className="fixed h-25 bg-theme-white/90 w-1/3 z-20 right-5 bottom-5 rounded-[20px] 
    drop-shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] flex"
    >
      <div className="rounded-[1000px] relative w-1/3 overflow-hidden">
        <Image src="" alt="" fill className="object-cover" />
      </div>
      <div className="flex flex-col w-2/3">
        <p className="">Our Sciencenter community workshop is coming soon!</p>
        <p className="">See Event</p>
      </div>
    </div>
  );
}
