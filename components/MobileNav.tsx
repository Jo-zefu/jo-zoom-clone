import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={32}
          height={32}
          alt="hamburger icon"
          className=" cursor-pointer sm:hidden"
        />
      </SheetTrigger>
      <SheetContent side="left" className="width-[264px] border-none bg-dark-1">
        <Link className="flex items-center gap-1" href="/">
          <Image
            src="/icons/logo.svg"
            width={32}
            height={32}
            alt="Yoom logo"
            className="object-contain"
          />
          <p className="text-[26px] font-extrabold text-white">Yoom</p>
        </Link>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                  <SheetClose asChild key={link.label}>
                    <Link
                      key={link.label}
                      href={link.route}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded w-full max-w-60",
                        { "bg-blue-1": isActive }
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        width={20}
                        height={20}
                        alt={link.label}
                      />
                      <p className="font-semibold">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
