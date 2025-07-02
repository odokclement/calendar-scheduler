import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="flex items-center justify-center p-10 gap-24 max-md:flex-col">
      <section className="flex flex-col gap-4 max-md:items-center">
        <Image src="/logo.svg" width={300} height={300} alt="logo" />
        <h1 className="text-2xl font-black lg:text-3xl">
          Your personal event scheduler
        </h1>
        <p className="text-lg text-gray-600">
          Schedule your events with ease and never miss an appointment.
        </p>
        <Image
          src="/planning.svg"
          width={500}
          height={500}
          alt="landing illustration"
        />
      </section>
      <SignIn
        routing="hash"
        appearance={{
          baseTheme: neobrutalism,
        }}
      />
    </main>
  );
}
