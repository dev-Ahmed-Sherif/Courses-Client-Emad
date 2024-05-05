"use client";

import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";

import MobileNavFragment from "@/components/MobileNavFragment";
import ModeToggle from "@/components/mode-toggle";
import { LogoIcon } from "@/components/Icons";

import { navbarLinksList, NavProps } from "@/config/nav";
import { siteConfig } from "@/config/site";
const { title } = siteConfig;

const Navbar: FC = () => {
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      {/* Change when lang chang */}
      <NavigationMenu className="mx-auto" dir="rtl">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          {/* desktop */}
          <div className="hidden md:flex">
            <NavigationMenuItem className="font-bold flex">
              <Link
                href="/"
                className="hidden md:flex flex-row font-bold text-xl"
              >
                <Image
                  src="/logo.ico"
                  className="rounded-full"
                  width={40}
                  height={40}
                  alt="logo"
                />
                {/* <LogoIcon /> */}
                {/* <span className="hidden md:block px-4">{title}</span> */}
              </Link>
            </NavigationMenuItem>

            <nav className="md:flex">
              {navbarLinksList.map((route: NavProps, i) => (
                <Link
                  href={route.href}
                  key={i}
                  className={`text-[17px] p-2 ${buttonVariants({
                    variant: "ghost",
                  })}`}
                  // className={`text-[17px] p-2 font-extrabold`}
                >
                  {route.labelAr}
                </Link>
              ))}
            </nav>
            <div className="md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="بحث عن دورات"
                className="sm:w-14 md:w-36 lg:w-56 rounded-lg bg-background pl-3 font-bold"
              />
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <Link
              href="/login"
              className={`border ${buttonVariants({ variant: "blue" })}`}
            >
              {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className={`border ${buttonVariants({
                variant: "blue",
              })}`}
            >
              {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
              انضم لنا
            </Link>

            <ModeToggle />
          </div>

          {/* mobile */}
          <div className="w-screen flex justify-between md:hidden">
            <div className="flex items-center justify-center">
              <MobileNavFragment />
            </div>
            <div className="flex items-center justify-center">
              <Link href="/" className="font-bold text-base">
                <Image
                  className="rounded-full"
                  src="/logo.ico"
                  width={40}
                  height={40}
                  alt="logo"
                />
                {/* <LogoIcon /> */}
                {/* <span className="hidden md:block px-4">{title}</span> */}
              </Link>
            </div>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
