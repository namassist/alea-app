import ButtonSignOut from "@/components/buttonSignOut";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  if (session?.user?.role !== "admin") {
    redirect(`/${session?.user?.role}`);
  }

  if (session?.user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <h2>Welcome back {session?.user?.username}</h2>
        <ButtonSignOut />
      </div>
    );
  }
};

export default page;
