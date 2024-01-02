import Image from "next/image";
import Link from "next/link";
import React from "react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href={"/"} className="flex items-center justify-center h-20">
        <Image src="/logo.png" alt="LeetClone" width={200} height={100} />
      </Link>
      <div>
        <button className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-small font-medium hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent transition duration-300 ease-in-out">
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
