
import PublicNav from "@/components/publicNav";
import PrivateNav from "@/components/privateNav";
import { currentUser } from "@clerk/nextjs/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // get user from clerk
  const user = await currentUser();
  return (
    <main className="relative">
      {/* render public nav and private nav based on user */}
     
      {user ? <PrivateNav /> : <PublicNav />}
      <section className="pt-2">{children}</section>
    </main>
  );
}
