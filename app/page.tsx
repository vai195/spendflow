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
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      {/* <div className='pulsing-circle circle1'></div>
      <div className='pulsing-circle circle2'></div>
      <div className='pulsing-circle circle3'></div>
      <div className='pulsing-circle circle4'></div>
      <div className='pulsing-circle circle5'></div>
      <div className='pulsing-circle circle6'></div>
      <div className='pulsing-circle circle7'></div>
      <div className='pulsing-circle circle8'></div>
      <div className='pulsing-circle circle9'></div>
      <div className='pulsing-circle circle10'></div> */}
      {/* <div className="wave"></div> */}
      <div className='flex flex-col items-center gap-4 text-center'>
        <Image src={logo} alt='Spend Flow Logo' width={200} height={200} />
        <span className='font-extrabold tracking-tight text-2xl lg:text-4xl'>
          Welcome to SpendFlow AI
        </span>
      </div>
      <p className='max-w-prose text-center neon-text'>
        Effortlessly manage your finances with SpendFlow AI, a smart expense
        tracker that uses AI to streamline budgeting, track spending, and
        optimize your financial flow.
      </p>
      <Button size='lg' asChild className='gap-1'>
        <Link href='/expenses'>
          <DollarSign />
          Get Started
        </Link>
      </Button>
      <Link href='https://github.com/vai195/spendflow'>
        <Github className='neon-text' />
      </Link>
    </div>
  );
}
