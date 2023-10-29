import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Signup() {
  return (
    <main className="flex h-screen">
      <div className="lg:w-4/12 w-full space-y-8 flex flex-col justify-center px-14">
        <div className="space-y-1">
          <h1 className="uppercase text-[#242a30] text-2xl font-semibold">
            amel
          </h1>
          <h4 className="capitalize text-[#707478]">
            Aplikasi Manajemen Personel Teknik
          </h4>
        </div>
        <form action="#" className="space-y-3">
          <Input type="username" placeholder="Username" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Register</Button>
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
              AMEL AirNav Indonesia
            </h6>
            <p>Gedung AirNav Indonesia</p>
            <p>Jl. Ir. H. Juanda No.1 Tangerang 15121 Banten - Indonesia</p>
            <p>Telp/Fax +62 21 5591 5000</p>
            <p>© AirNav Indonesia</p>
          </div>
        </div>
      </div>
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
    </main>
  );
}
