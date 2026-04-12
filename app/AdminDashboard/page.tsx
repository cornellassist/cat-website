"use client";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";

const supabase = createClient();

export default function AdminDashboard() {
  async function putProject() {
    try {
      const response = await axios.post("/api/projects", {});
      if (response.status == 200) {
        console.log("good");
        console.log(response);
      } else {
        console.log("bad");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  return (
    <div className="h-20 w-20">
      <button
        className="bg-amber-200 h-20 w-30 cursor-pointer"
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/AdminLogin";
        }}
      >
        Sign out
      </button>
      <button
        className="bg-amber-200 h-20 w-30 cursor-pointer"
        onClick={async () => {
          await putProject();
        }}
      >
        Add a project
      </button>
    </div>
  );
}
