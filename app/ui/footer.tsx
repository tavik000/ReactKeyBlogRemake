import Link from "next/link";
import { homepageURL } from "../lib/constants";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div id="section-footer" >
      <div className="footer-divider -translate-y-3" />
      <div className="flex flex-col py-4 text-center text-xs">
        <Link href={homepageURL} className="mb-2 flex justify-center hover:underline">
          Home
        </Link>
        <Link
          href="//linktr.ee/keyzhao"
          className="mb-2 flex justify-center hover:underline"
        >
          Contact
        </Link>
        <p className="flex justify-center mb-2">&copy; {year} KEY </p>
      </div>
    </div>
  );
};

export default Footer;
