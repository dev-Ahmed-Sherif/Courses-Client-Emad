"use client";

import type { FC } from "react";
import Link from "next/link";
import { LogoIcon } from "./Icons";

const Footer: FC = () => {
  return (
    <footer id="footer" className="pt-7 border-[2px] rounded-lg flex flex-col">
      <hr className="w-10/12 pb-2 mx-auto font-bold" />

      <section className="container pb-7 text-center">
        <h2 className="font-bold">&copy; جميع الحقوق محفوظة كورساتى </h2>
      </section>
    </footer>
  );
};

export default Footer;
