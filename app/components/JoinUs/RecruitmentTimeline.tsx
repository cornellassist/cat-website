import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";

function RecruitmentTimeline() {
  return (
    <Timeline defaultValue={2} className="w-full max-w-md">
      <TimelineItem step={1}>
        <TimelineHeader>
          <TimelineDate>August 17</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Applications Begin
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
        <TimelineContent className="text-text-dk-grey">
          We look forward to your applications!
        </TimelineContent>
      </TimelineItem>

      <TimelineItem step={2}>
        <TimelineHeader>
          <TimelineDate>August 28</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            All Subteam Info Session
          </TimelineTitle>
          <TimelineTitle className="text-sm">7:00 - 8:30PM, Zoom</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
        <TimelineContent className="text-text-dk-grey">
          Come learn more about each of our subteams, and how you can contribute
          to each! Stay tuned for Zoom information.
        </TimelineContent>
      </TimelineItem>

      <TimelineItem step={3}>
        <TimelineHeader>
          <TimelineDate>August 29</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Education & Advocacy Info Session 1
          </TimelineTitle>
          <TimelineTitle className="text-sm">
            4:00 - 5:30PM, Human Ecology Building, Room 2L32
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
        <TimelineContent className="text-text-dk-grey">
          Come learn more about how you can join the Education & Advocacy
          subteam and how our team adapts toys.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem step={4}>
        <TimelineHeader>
          <TimelineDate>August 30</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Education & Advocacy Info Session 2
          </TimelineTitle>
          <TimelineTitle className="text-sm">
            4:00 - 5:30PM, Human Ecology Building, Room 2L32
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
      </TimelineItem>
      <TimelineItem step={5}>
        <TimelineHeader>
          <TimelineDate>August 31</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Engineering Info Session
          </TimelineTitle>
          <TimelineTitle className="text-sm">
            5:00 - 6:00PM, Location TBD
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
        <TimelineContent className="">
          Come learn more about how you can join the Engineering subteam.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem step={6}>
        <TimelineHeader>
          <TimelineDate>September 1</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Project Team Fest
          </TimelineTitle>
          <TimelineTitle className="text-sm">
            4PM - 6PM, Duffield Attrium
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineContent className="">
          Check us out and learn about our mission at Project Team Fest!
        </TimelineContent>
        <TimelineSeparator className="bg-theme-dk-red" />
      </TimelineItem>
      {/* <TimelineItem step={6}>
        <TimelineHeader>
          <TimelineDate>September 2</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Education & Advocacy Info Session 3
          </TimelineTitle>
          <TimelineTitle className="text-sm">
            Time TBD, Location TBD
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
      </TimelineItem> */}
      <TimelineItem step={7}>
        <TimelineHeader>
          <TimelineDate>September 3</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Applications due (Sophomores, Juniors, and Seniors)
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
      </TimelineItem>
      <TimelineItem step={8}>
        <TimelineHeader>
          <TimelineDate>October 15</TimelineDate>
          <TimelineTitle className="timelinetitle text-theme-red">
            Applications due (First-Year and Transfer students)
          </TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator className="bg-theme-dk-red" />
      </TimelineItem>
    </Timeline>
  );
}

function RecruitmentTimelineDecorations() {
  return (
    <>
      {/* right side */}
      <img
        src="/assets/Landing/hero-blob-clear.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute -right-36 xl:-right-40 top-20 -z-10 opacity-20 scale-100 xl:scale-125 rotate-45 pointer-events-none"
      />
      <img
        src="/assets/Landing/mission-blob.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute -right-40 xl:-right-32 top-1/2 -translate-y-1/2 -z-10 opacity-20 scale-90 xl:scale-110 -rotate-12 pointer-events-none"
      />
      <img
        src="/assets/Landing/hero-blob-solid.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute -right-36 xl:-right-26 bottom-10 -z-10 opacity-10 scale-90 xl:scale-110 rotate-90 pointer-events-none"
      />
      {/* left side */}
      <img
        src="/assets/Landing/mission-blob.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute -left-40 xl:-left-50 top-35 -z-10 opacity-20 scale-90 xl:scale-110 rotate-180 pointer-events-none"
      />
      <img
        src="/assets/Landing/hero-blob-solid.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute -left-36 xl:-left-28 top-3/4 -translate-y-1/2 -z-10 opacity-15 scale-100 xl:scale-125 -rotate-45 pointer-events-none"
      />
      {/* <img
        src="/assets/Landing/mission-square-t.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute left-2 xl:left-10 top-16 xl:top-20 -z-10 scale-[40%] xl:scale-[50%] pointer-events-none"
      /> */}
      {/* <img
        src="/assets/Landing/mission-square-b.svg"
        alt=""
        aria-hidden
        className="hidden sm:block absolute left-6 xl:left-14 bottom-28 xl:bottom-36 -z-10 scale-[40%] xl:scale-[50%] rotate-90 pointer-events-none"
      /> */}
      {/* mobile */}
      <img
        src="/assets/Landing/mission-blob.svg"
        alt=""
        aria-hidden
        className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-15 scale-125 pointer-events-none"
      />
    </>
  );
}

export function RecruitmentTimelineSection() {
  return (
    <div className="universepad mt-20 flex flex-col relative overflow-hidden">
      <RecruitmentTimelineDecorations />
      <h1 className="heading">Fall Recruitment Timeline</h1>
      <p className="descriptext">
        Details are being finalized, and more events may be added as we finalize
        our recruitment schedule. Check back soon!
      </p>
      <div className="flex justify-center mt-10 mb-10">
        <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] pl-24 sm:pl-32 py-8 pr-8 h-160 overflow-scroll">
          <RecruitmentTimeline />
        </div>
      </div>
    </div>
  );
}
