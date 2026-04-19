"use client";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import { ProfileMenu } from "../components/ProfileMenu";
import { Sidebar } from "../components/Sidebar";

export default function AdminDashboard() {
  // const supabase = createClient();
  // async function putProject() {
  //   try {
  //     const response = await axios.post("/api/projects", {});
  //     if (response.status === 201) {
  //       console.log(response);
  //     } else {
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // }

  // async function deleteProject() {
  //   try {
  //     const response = await axios.delete("/api/projects", {});
  //     if (response.status == 204) {
  //       console.log("success");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  return (
    <div className="">
      <Sidebar />
    </div>
  );
}

// <button
//         className="bg-amber-200 h-20 w-30 cursor-pointer"
//         onClick={async () => {
//           await supabase.auth.signOut();
//           window.location.href = "/AdminLogin";
//         }}
//       >
//         Sign out
//       </button>
