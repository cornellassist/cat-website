import Image from "next/image"
import { StaticImageData } from 'next/image'
import photoPlaceholder from "@/public/assets/JoinUs/hero-pic.jpg"

type Team = {
    imgUrl: StaticImageData,
    teamName: string,
    description: string
}

const engineeringTeam: Team = {
    imgUrl: photoPlaceholder,
    teamName: "Engineering",
    description: "Design and create assistive solutions for the Ithaca community.",
}

const outreachAndEducation: Team = {
    imgUrl: photoPlaceholder,
    teamName: "Outreach and Education",
    description: "Create community outreach initiatives and foster K-12 STEM education in Ithaca.",
}

const internalOperation: Team = {
    imgUrl: photoPlaceholder,
    teamName: "Operations",
    description: "Promote brand awareness and handle internal operations"
}

export const TeamCard = ({ imgUrl, teamName, description }: Team) => {
    return (
        <div className="shrink flex-1 min-w-0 h-full flex flex-col items-center pt-5 rounded-lg">
            <Image src={imgUrl} alt={"The" + teamName + "subteam"} className="w-full h-auto rounded-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
            <h3 className="subheading text-text-dk-grey max-w-full text-center">{teamName}</h3>
            <p className="descriptext text-text-grey w-95 mt-2 px-2 max-w-full text-center">{description}</p>
        </div>
    )
}

export const AboutTeams = () => {
    return (
        <div className="universepad py-5 xl:h-160 2xl:h-200">
            <h2 className="heading">Our Teams</h2>
            <p className="subtext">See how you can get involved!</p>
            <div className="flex justify-between mt-10 gap-6 md:gap-8 2xl:gap-10">
                <TeamCard
                    imgUrl={outreachAndEducation.imgUrl}
                    teamName={engineeringTeam.teamName}
                    description={engineeringTeam.description} />

                <TeamCard
                    imgUrl={outreachAndEducation.imgUrl}
                    teamName={outreachAndEducation.teamName}
                    description={outreachAndEducation.description} />

                <TeamCard
                    imgUrl={internalOperation.imgUrl}
                    teamName={internalOperation.teamName}
                    description={internalOperation.description} />
            </div>

        </div>
    )
}