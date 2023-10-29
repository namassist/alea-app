"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const signInData = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Ooops! Something error",
      });
    } else {
      router.refresh();
      const session = await getSession();
      session?.user?.role === "admin"
        ? router.push("/admin")
        : router.push("/user");
    }
    setIsLoading(false);
  };

  return (
    <main className="flex h-screen">
      <div className="w-8/12 hidden lg:block">
        <Image
          src="/bg.jpg"
          alt="AirNav Background"
          className="w-full h-full object-cover bg-center"
          width={1000}
          height={1000}
          priority
        />
      </div>
      <div className="lg:w-4/12 w-full space-y-8 flex flex-col justify-center px-14">
        <div className="space-y-1">
          <h1 className="uppercase text-[#242a30] text-2xl font-semibold">
            alea
          </h1>
          <h4 className="capitalize text-[#707478]">Airnav Learning Hub</h4>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoading ? (
            <Button className="w-full" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full">Login</Button>
          )}
        </form>
        <div className="space-y-3">
          <Image
            src="/logo.png"
            alt="AirNav Background"
            width={500}
            height={200}
            className="w-6/12 mx-auto"
            priority
          />
          <div className="text-center text-sm text-[#929ba1] leading-normal">
            <h6 className="text-[#242a30] text-lg font-semibold">
              ALEA AirNav Indonesia
            </h6>
            <p>Gedung AirNav Indonesia</p>
            <p>Jl. Ir. H. Juanda No.1 Tangerang 15121 Banten - Indonesia</p>
            <p>Telp/Fax +62 21 5591 5000</p>
            <p>© AirNav Indonesia</p>
          </div>
        </div>
      </div>
    </main>
  );
}
