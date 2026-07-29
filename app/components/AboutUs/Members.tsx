"use client";
import Image from "next/image";
import { StaticImageData } from "next/image";
import data from "@/public/assets/AboutUs/team.json"; // auto parsed
import portraitPlaceholder from "@/public/assets/AboutUs/ProfilePics/portrait-placeholder.png";
import { useState } from "react";
import { loadingComplete, imgLoadStyles } from "@/utils/imgLoad";

export interface Member {
  name: string;
  role: string;
  year: string;
  major: string;
  college: string;
  linkedin?: string;
  image?: string;
}

interface MemberCardInfo extends Member {
  // when imgs added to bucket, remove this interface
  // only to pair static imgs with dynamic members
  img?: StaticImageData;
}

interface CreateMemberCardProps {
  name: string;
}

interface SectionProps {
  title: string;
  team: MemberCardInfo[];
  clickMember: (member: MemberCardInfo) => void;
}

const teamData: Member[] = data;

function lookupHelper(name: string): Member {
  const member = teamData.find((curMember) => curMember.name === name);
  if (member === undefined) {
    console.error("Member not found: ", name);
    return {
      name: name,
      role: "",
      year: "",
      major: "",
      college: "",
    };
  } else {
    return member;
  }
}

function getMemberImage(name: string) {
  const fullName = name.split(" ");
  const [fName, lName] = [fullName[0], fullName[fullName.length - 1]];
  try {
    return require(
      `@/public/assets/AboutUs/ProfilePics/${fName.toLowerCase()}-${lName.toLowerCase()}.png`,
    );
  } catch {
    return undefined;
  }
}

function createMemberCardInfo({ name }: CreateMemberCardProps): MemberCardInfo {
  const member = lookupHelper(name);
  const img = getMemberImage(name);
  // const img = undefined
  if (img !== undefined) {
    // console.log("Found img");
    return {
      ...member,
      img: img,
    };
  } else {
    // console.log("No img");
    return member;
  }
}

// For now, commenting out names. Should make GET /team
// leave past members, just in case we do alumni section
const teamLeadsInfo: CreateMemberCardProps[] = [
  // { name: "Lucas Keith" },
  // { name: "Mae Sliwinski" },
  { name: "Natalie Shepherd" },
  // { name: "Chris Parker" },
  // { name: "William Ellis" },
  { name: "Savaas Iqbal" },
  { name: "Alan Wu" },
  { name: "Andy Chen" },
  { name: "Ria Dhulia" },
  { name: "Rishabh Dholakia" },
  { name: "Josephine Kelly" },
  { name: "Sophia Roache" },
  // { name: "Zaid Al-Shoha" },
  { name: "Richard Ballard" },
  { name: "Abigail Jin" },
];

const engSubteamInfo: CreateMemberCardProps[] = [
  { name: "Shannon Lin" },
  { name: "Annie Park" },
  { name: "Emily Wang" },
  { name: "Liz Pappania" },
  { name: "Ajaa-Sungma Sigri-Naah" },
  { name: "Madhu Balaji" },
  // { name: "Selin Toker" },
  { name: "Lila Alderete" },
  { name: "Diya Sheth" },
  { name: "Merve Tutar" },
  { name: "Jay Zhu" },
  { name: "Jenny Dong" },
  { name: "Jayesha Sharma" },
  { name: "Serena Inderjit" },
  { name: "Sahana Behera" },
  { name: "David Shepherd" },
  { name: "Brian Xia" },
  { name: "Saejoon Park" },
  { name: "Neha Chigurupati" },
  // { name: "Elom Eskender" },
  { name: "Mihika Mukherjee" },
];

const eduOutSubteamInfo: CreateMemberCardProps[] = [
  { name: "Sarah Swee" },
  { name: "Emmanuella Umoh" },
  { name: "David Han" },
  { name: "Evan Lee" },
  { name: "Morgan Ogata" },
  { name: "Rachel Turney" },
  { name: "Vanessa Chen Hsieh" },
  // { name: "Omar Alkhitan" },
  { name: "Chloe Jung" },
  // { name: "Neel Behari" },
];

const businessSubteamInfo: CreateMemberCardProps[] = [
  { name: "Ariana Sanchez" },
  { name: "Scott Zinman" },
  { name: "Sonya Zheng" },
  // { name: "Jason Yang" },
  // { name: "Dina Shlufman" },
];

// const alumniInfo: CreateMemberCardProps[] = [
//   { name: 'Alum' },
// ]

const teamLeads: MemberCardInfo[] = teamLeadsInfo.map((member) =>
  createMemberCardInfo({ name: member.name }),
);

const engSubteam: MemberCardInfo[] = engSubteamInfo.map((member) =>
  createMemberCardInfo({ name: member.name }),
);

const eduOutSubteam: MemberCardInfo[] = eduOutSubteamInfo.map((member) =>
  createMemberCardInfo({ name: member.name }),
);

const businessSubteam: MemberCardInfo[] = businessSubteamInfo.map((member) =>
  createMemberCardInfo({ name: member.name }),
);

// const alumni: MemberCardInfo[] = alumniInfo.map((member) => (createMemberCardInfo({ name: member.name })))

function MemberModal({
  member,
  closeModal,
}: {
  member: MemberCardInfo;
  closeModal: () => void;
}) {
  const imgSrc = () => {
    if (member.img) {
      return member.img;
    } else {
      return "/assets/photo-placeholder.png";
    }
  };

  const labelStyles = "font-semibold";
  return (
    <div
      className="fixed flex justify-center items-center bg-black/50 inset-0 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-text-dk-grey rounded-[20px] max-w-lg w-auto relative px-15 py-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="absolute top-2 right-4 text-xl" onClick={closeModal}>
          <img
            src="/assets/close-icon.svg"
            alt="Close"
            className="h-10 w-10 cursor-pointer transition duration-300 hover:invert-[0.25]"
          />
        </button>
        <div className="mt-4 flex flex-col items-center">
          <Image
            src={imgSrc()}
            width="300"
            height="300"
            alt={`Photo of ${member.name}`}
            className="rounded-[20px] border-2 border-gray-100"
          />
          <div className="mt-4 justify-start whitesubtext">
            <p>
              <span className={labelStyles}>Name:</span> {member.name}
            </p>
            <p>
              <span className={labelStyles}>Role:</span> {member.role}
            </p>
            <p>
              <span className={labelStyles}>Year:</span> {member.year}
            </p>
            <p>
              <span className={labelStyles}>Major:</span> {member.major}
            </p>
            <p>
              <span className={labelStyles}>College:</span> {member.college}
            </p>
            {/* <p><span className={labelStyles}>LinkedIn:</span> <a href={member.linkedin} target="_blank" className="text-red-600 visited:text-purple-600">{member.linkedin}</a></p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhereWeAreNow() {
  return <div></div>;
}

export function MemberCard({
  member,
  onClick,
}: {
  member: MemberCardInfo;
  onClick: () => void;
}) {
  const name = member.name;
  const role = member.role;
  const img = member.image ?? member.img ?? portraitPlaceholder;
  const linkedin = member.linkedin ?? "";

  const linkedinStyles =
    "bg-theme-white rounded-md border-2 border-theme-white cursor-pointer";

  const roleTagBackground = () => {
    if (role !== "") {
      const lowerCaseRole = role.toLowerCase();
      if (lowerCaseRole.toLowerCase().includes("lead")) {
        return "bg-[#444444]";
      } else if (lowerCaseRole == "engineering") {
        return "bg-[#D23333]";
      } else if (lowerCaseRole == "education & advocacy") {
        return "bg-[#8E2800]";
      } else {
        return "bg-[#004AB9]";
      }
    }
  };

  return (
    <div className="flex flex-col rounded-[20px] max-w-xs origin-center scale-90 2xl:scale-100 drop-shadow-sm/50 bg-white p-4 transition duration-300 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]">
      <div className="relative">
        <Image
          src={img}
          alt={name}
          width={300}
          height={300}
          // className={`w-auto rounded-[15px] cursor-pointer ${imgLoadStyles}`} onClick={onClick} onLoadingComplete={(img) => { loadingComplete(img) }} />
          className={`2xl-100 xl:w-70 lg:w-60 rounded-[15px] cursor-pointer border border-gray-500/50 p-1`}
          onClick={onClick}
          onLoadingComplete={(img) => {
            loadingComplete(img);
          }}
        />
        {/* mobile linkedin button */}
        <img
          src="/assets/colored-linkedin.svg"
          alt={`Visit ${name}'s LinkedIn profile`}
          className={`${linkedin === "" ? "hidden" : "block lg:hidden"} absolute right-3 bottom-3 sm:bottom-5 sm:right-5 h-9 sm:h-12 ${linkedinStyles}`}
          onClick={() =>
            window.open(linkedin !== undefined ? linkedin : "", "_blank")
          }
        />
      </div>
      <div className="flex flex-col pt-3 px-2">
        <div className="flex justify-between items-center">
          <h4
            className={`max-w-4/5 ${name.length <= 14 ? "membername" : "longmembername"} text-black`}
          >
            {name}
          </h4>
          <img
            src="/assets/colored-linkedin.svg"
            alt={`Visit ${name}'s LinkedIn profile`}
            className={`${linkedin === "" ? "hidden" : "hidden lg:block"} lg:h-9 2xl:h-10 ${linkedinStyles}`}
            onClick={() =>
              window.open(linkedin !== undefined ? linkedin : "", "_blank")
            }
          />
        </div>
        {role !== "" && (
          <div className={`${roleTagBackground()} w-fit rounded-lg mt-4`}>
            <p className="membertag px-2 py-1 font-semibold">{role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamSection({ title, team, clickMember }: SectionProps) {
  const generateId = () => {
    const lowerCaseTitle = title.toLowerCase();
    if (lowerCaseTitle.includes("lead")) {
      return "teamLeads";
    } else if (lowerCaseTitle.includes("engineering")) {
      return "engineering";
    } else if (lowerCaseTitle.includes("business")) {
      return "business";
    } else {
      return "business";
    }
  };
  return (
    <div
      id={generateId()}
      className={`flex flex-col universepad w-full pt-10 pb-15`}
    >
      <h2 className="teamheading text-center rounded-sm mb-5">{title}</h2>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 2xl:gap-20 xl:gap-12 lg:gap-12 md:gap-15 sm:gap-10 gap-10 mt-10 place-items-center">
        {team.map((item, index) => {
          return (
            <MemberCard
              key={`Team Lead ` + index}
              member={item}
              onClick={() => clickMember(item)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Members() {
  const [selectedMember, setSelectedMember] = useState<MemberCardInfo | null>(
    null,
  );
  const clickMember = (member: MemberCardInfo) => {
    setSelectedMember(member);
  };

  let modal = null;
  if (selectedMember !== null) {
    modal = (
      <MemberModal
        member={selectedMember}
        closeModal={() => setSelectedMember(null)}
      />
    );
  }

  return (
    <div
      className="bg-[#D0D0D0] b-10 relative pt-5"
      style={{
        backgroundImage: `
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.02) 2px,
      rgba(255,255,255,0.02) 4px
    )
  `,
      }}
    >
      <TeamSection
        title="Our Team Leads"
        team={teamLeads}
        clickMember={clickMember}
      />
      <TeamSection
        title="Engineering Subteam"
        team={engSubteam}
        clickMember={clickMember}
      />
      <TeamSection
        title="Education & Advocacy Subteam"
        team={eduOutSubteam}
        clickMember={clickMember}
      />
      <TeamSection
        title="Business Subteam"
        team={businessSubteam}
        clickMember={clickMember}
      />
      {/* <TeamSection title="Our Alumni" team={alumni} clickMember={clickMember} /> */}
      {modal}
    </div>
  );
}
