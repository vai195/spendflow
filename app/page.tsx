import SearchBar from "@/components/search-bar";
import Image from "next/image";
import logo from "../public/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Search } from "lucide-react";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-5 mt-5'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <Image
          src={logo}
          alt='crypto-punk-logo'
          width={200}
          height={200}
          className='rounded-full'
        />
        <span className='font-extrabold tracking-tight text-2xl lg:text-4xl'>
          Welcome to Crypto Punk Tracker
        </span>
      </div>
      <p className='max-w-prose text-center '>
        Crypto Punk Tracker is a web app that allows you to search for crypto
        coins based on their market cap and price.
      </p>
      <Button size='lg' asChild className='gap-1'>
        <Link href='/search'>
          <Search />
          Get Started Exploring
        </Link>
      </Button>
      <Link href='https://github.com/vai195/crypto-punk'>
        <Github />
      </Link>
      <SearchBar />
    </div>
  );
}
