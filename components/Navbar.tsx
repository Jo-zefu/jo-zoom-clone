"use client";
import Image from "next/image";
import MobileNav from "./MobileNav";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Yoom logo"
          className="object-contain"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Yoom
        </p>
      </Link>

      <div className="flex-between gap-5">
        {/* mobile nav */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
