"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Designer-removebg-preview.png";

import { dark } from "@clerk/themes";

import AIChatButton from "@/components/AIChatButton";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import ExpenseForm from "@/components/expense-form";

function Navbar() {
  const { theme } = useTheme();
  return (
    <div className='p-4 shadow'>
      <div className='flex flex-wrap max-w-7xl m-auto gap-3 items-center justify-between '>
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src={logo}
            alt='SpendFlow Logo'
            width={70}
            height={70}
            className='rounded-full'
          />
          <span className='font-bold text-2xl'>SpendFlow</span>
        </Link>

        <div className='flex flex-wrap items-center gap-2'>
          <ExpenseForm />
          <AIChatButton />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: "2.5rem",
                  height: "2.5rem",
                },
              },
            }}
          />
        </div>

        {/* <div className='sm:hidden flex gap-2 '>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <AlignJustify />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <ExpenseForm />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AIChatButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
