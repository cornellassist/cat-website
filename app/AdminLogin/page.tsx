import { ButtonWhite } from "../components/Buttons";

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
    rounded-[20px]"
      >
        <div>
          <h1 className="heading">CAT Admin Login</h1>
          <h2>Please sign in to access the admin dashboard.</h2>
        </div>
        <div className="flex flex-col gap-2 my-5">
          <div>
            <h3>Email</h3>
            <input
              type="text"
              className="border-2 rounded-sm border-text-grey w-full"
              required
            />
          </div>
          <div>
            <h3>Password</h3>
            <input
              type="text"
              className="border-2 rounded-sm border-text-grey w-full"
              required
            />
          </div>
        </div>
        <ButtonWhite label="Login" to="" size="M" />
      </div>
    </div>
  );
}
