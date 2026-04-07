"use client";
import { ButtonWhite } from "../components/Buttons";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xeoirovwlonjmhxycfxs.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlb2lyb3Z3bG9uam1oeHljZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExOTE0MzksImV4cCI6MjA4Njc2NzQzOX0.UFqN7WwavTXd5zkRGw8JWCdfwduE5crpNxXJRsHl408";

const supabase = createClient(supabaseUrl, anonKey);

export default function AdminLogin() {
  return (
    <div className="h-screen w-full">
      <LoginCard />
    </div>
  );
}

function LoginCard() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      {/* card */}
      <div
        className="h-3/4 w-1/2 flex flex-col px-10 py-7 backdrop-blur-[2px] bg-theme-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)]
    rounded-[20px] gap-5"
      >
        <div>
          <h1 className="heading">CAT Admin Login</h1>
          <h2>Please sign in to access the admin dashboard.</h2>
        </div>
        <button
          onClick={() => {
            supabase.auth.signInWithOAuth({
              provider: "google",
            });
          }}
          className={`
        relative inline-flex items-center gap-3
        bg-white border border-[#747775] rounded-full
        px-3 h-10 max-w-10 min-w-min
        font-['Roboto',Arial,sans-serif] text-sm tracking-[0.25px] text-[#1f1f1f]
        cursor-pointer select-none align-middle whitespace-nowrap overflow-hidden
        transition-[background-color,border-color,box-shadow] duration-[218ms]
        hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.30),_0_1px_3px_1px_rgba(60,64,67,0.15)]
        focus:outline-none
        disabled:cursor-default disabled:bg-white/[0.38] disabled:border-[#1f1f1f1f]
        group
      `}
        >
          <span
            className={`
          absolute inset-0 rounded-full bg-[#303030] opacity-0
          transition-opacity duration-[218ms]
          group-hover:opacity-[0.08]
          group-focus:opacity-[12%]
          group-active:opacity-[12%]
        `}
          />

          <span className={`w-5 h-5 shrink-0 ${false ? "opacity-[0.38]" : ""}`}>
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="block w-full h-full"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
          </span>

          {/* Label */}
          <span
            className={`flex-1 font-medium text-left truncate ${false ? "opacity-[0.38]" : ""}`}
          >
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}

// <div className="flex flex-col gap-2 my-5">
//         <div>
//           <h3>Email</h3>
//           <input
//             type="text"
//             className="border-2 rounded-sm border-text-grey w-full"
//             required
//           />
//         </div>
//         <div>
//           <h3>Password</h3>
//           <input
//             type="text"
//             className="border-2 rounded-sm border-text-grey w-full"
//             required
//           />
//         </div>
//       </div>
