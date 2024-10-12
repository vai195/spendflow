import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import { Button } from "@/components/ui/button";
import { AlignJustify, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  return (
    <div className='p-4 shadow'>
      <div className='flex flex-wrap max-w-7xl m-auto gap-3 items-center justify-between '>
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src={logo}
            alt='Crypto Punk Logo'
            width={60}
            height={60}
            className='rounded-full'
          />
        </Link>
        <div className='sm:flex flex-wrap items-center gap-2 lg:gap-20 hidden'>
          <Button asChild className='gap-1'>
            <Link href='/search'>
              <Search /> Search
            </Link>
          </Button>
        </div>

        <div className='sm:hidden flex gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <AlignJustify />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href='/search' className='flex items-center gap-3'>
                  <Search /> <span>Search</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
