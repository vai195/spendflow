import Image from "next/image";
import logo from "../public/Designer-removebg-preview.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign, Github } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/expenses");
  return (
    <div className='flex flex-col items-center justify-center gap-5 mt-5'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <Image
          src={logo}
          alt='Spend Flow Logo'
          width={200}
          height={200}
        />
        <span className='font-extrabold tracking-tight text-2xl lg:text-4xl'>
          Welcome to SpendFlow AI
        </span>
      </div>
      <p className='max-w-prose text-center '></p>
      <Button size='lg' asChild className='gap-1'>
        <Link href='/expenses'>
          <DollarSign />
          Get Started
        </Link>
      </Button>
      <Link href='https://github.com/vai195/spend-flow'>
        <Github />
      </Link>
    </div>
  );
}
