"use client"
import { useState } from "react"

export function UnderConstructionPopup() {
  const [show, setShow] = useState(true)
  if (!show) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="h-60 md:h-80 2xl:h-110 w-80 md:w-150 backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
    flex flex-col items-center px-5 sm:px-10 rounded-[20px] justify-between">
        <div className="flex flex-col">
          <h1 className="heading mt-5 text-center">Notice to Users</h1>
          <p className="subtext text-center mt-5">The website is being updated! Some features may not be ready yet, but feel free to browse our existing content. New updates coming soon!</p>
        </div>
        {/* only temporary popup anyway, so im using custom button here */}
        <button className="bg-theme-red hover:bg-theme-dk-red cursor-pointer transition-colors duration-200 text-theme-white rounded-[1000px] lgbutton mb-5 sm:mb-10"
          onClick={() => setShow(false)}>Close</button>
      </div>
    </div>
  )
}