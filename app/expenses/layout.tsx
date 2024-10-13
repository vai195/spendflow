import { Metadata } from "next";
import Navbar from "./Navbar";

export const metadata: Metadata = {
  title: "SpendFlow - Expenses",
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='p-4 max-w-7xl m-auto'>{children}</main>
    </>
  );
}

export default layout;
