"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function AdminDashboard() {
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
    </div>
  );
}
