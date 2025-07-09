import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* logo */}
        <div className="mb-8">
          <img src="/logo.svg" alt="logo" width={100} height={100} />
        </div>
        {/* SignIn component from Clerk */}
        <SignIn />
      </div>
    </div>
  );
}
