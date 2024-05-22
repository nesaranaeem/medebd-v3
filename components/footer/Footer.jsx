import React from "react";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "MedeBD";
  const BackToTop = () => {
    return (
      <a
        href="#top"
        className="text-white cursor-pointer rounded-full bg-orange-500 hover:bg-orange-600 w-10 h-10 flex items-center justify-center"
      >
        <FaArrowUp />
      </a>
    );
  };
  return (
    <>
      <div className="block lg:hidden xl:hidden 2xl:hidden">
        <div className="w-full p-4 text-center text-white bg-gray-800 sm:p-8">
          <h5 className="mb-2 text-3xl font-bold text-white">
            Download Our App
          </h5>
          <p className="mb-5 text-base text-white sm:text-lg">
            Seamlessly access a wealth of information with our cutting-edge
            mobile application. Simplify your experience.
          </p>
          <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-auto flex justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.ncosync.medebd"
                target="_blank" // Open link in new tab
                rel="noopener noreferrer" // Security best practice for opening links in new tabs
                className="bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 border-solid border-2 border-white"
              >
                <svg
                  className="mr-3 w-7 h-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google-play"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                  ></path>
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Get it on</div>
                  <div className="mt-1 font-sans text-sm font-semibold">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-400 rounded-md shadow-lg text-black py-4 border-t-2 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            {/* Footer Logo */}
            <Link href="/">
              <div className="flex items-center">
                <img
                  className="block h-8 w-auto"
                  src="/images/medebd.svg"
                  alt="Logo"
                />
              </div>
            </Link>

            {/* Footer Links */}
            <div className="flex flex-col justify-center items-center md:flex-row md:space-x-4 space-y-2 md:space-y-0 mt-4 md:mt-0 text-black text-center">
              <FooterLink title="Home" path="/" />
              <FooterLink title="About Us" path="/about" />
              <FooterLink title="Contact" path="/contact" />
              <FooterLink title="Privacy Policy" path="/privacy-policy" />
              <FooterLink title="Disclaimer" path="/disclaimer" />
              <div className="flex items-center justify-center">
                {" "}
                {/* Center align content */}
                <BackToTop />
              </div>
            </div>
          </div>

          {/* Copyright Text */}
          <div className="text-center mt-4 text-black text-sm">
            &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

const FooterLink = ({ title, path }) => {
  return (
    <Link href={path} passHref>
      <div className="cursor-pointer text-black hover:text-white">{title}</div>
    </Link>
  );
};

export default Footer;
