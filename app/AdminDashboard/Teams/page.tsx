"use client"
import { useState } from "react";
import { TeamsDashboard } from "@/app/components/TeamsDashboard";
import { Sidebar } from "@/app/components/Sidebar";
import { ProfileMenu } from "@/app/components/ProfileMenu";

export default function CreateComponent() {
    return (
        <div>
            <Sidebar/>
            <div className="flex justify-end">
                <ProfileMenu/>
            </div>
        
            <TeamsDashboard/>
        </div>
    )
}

