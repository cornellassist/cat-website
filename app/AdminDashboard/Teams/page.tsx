"use client"
import { useState } from "react";
import { TeamsDashboard } from "@/app/components/AdminDashboard/TeamsDashboard";
import { Sidebar } from "@/app/components/AdminDashboard/Sidebar";
import { ProfileMenu } from "@/app/components/AdminDashboard/ProfileMenu";

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

