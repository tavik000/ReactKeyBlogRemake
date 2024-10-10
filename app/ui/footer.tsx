import Link from "next/link";
import { homepageURL } from "../lib/constants";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div id="section-footer">
      <div className="footer-divider -translate-y-3" />
      <div className="flex flex-col py-4 text-center text-xs">
        <div className="mb-2 flex justify-center">
          <Link href={homepageURL} className="mb-2 flex justify-center hover:underline">
            Home
          </Link>
        </div>
        <div className="mb-2 flex justify-center">
          <Link
            href="//linktr.ee/keyzhao"
            className="mb-2 flex justify-center hover:underline"
          >
            Contact
          </Link>
        </div>
        <p className="mb-2 flex justify-center">&copy; {year} KEY </p>
      </div>
    </div>
  );
};

export default Footer;
