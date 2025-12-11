"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function Navbar2() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Scroll event to toggle sticky navbar
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true); // Sticky navbar when scroll position > 0
    } else {
      setIsSticky(false); // Non-sticky navbar when scroll position = 0
    }
  };

  useEffect(() => {
    // Adding scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup the event listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`${plusJakartaSans.className
          } bg-white relative overflow-hidden flex items-center shadow-md transition-all duration-300 ${isSticky
            ? "sticky top-0 left-0  w-full z-50 shadow-lg"
            : " w-full z-50 shadow-lg sticky"
          }`}
        style={{ zIndex: 100 }}
      >
        <div
          className={`flex-1 flex py-3 items-center justify-around ${isSticky ? "max-w-[100%]" : ""
            }`}
        >
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="All Spark Logo"
                width={150}
                height={150}
              />
            </Link>
          </div>

          {/* Middle: Nav links (Desktop) */}
          <ul className="hidden space-x-4 !list-none  items-center font-medium text-gray-700 lg:flex">
            <li>
              <Link
                href="/#hero"
                className="text-gray-700 px-4 py-2 transition duration-500 rounded-full font-semibold hover:bg-[#384BFF] hover:text-white"
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link
                href="/#portfolio"
                className="text-gray-700 px-4 py-2 transition duration-500 rounded-full font-semibold hover:bg-[#384BFF] hover:text-white"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/#services"
                className="text-gray-700 px-4 py-2 transition duration-500 rounded-full font-semibold hover:bg-[#384BFF] hover:text-white"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/#why-choose-us"
                className="text-gray-700 px-4 py-2 transition duration-500 rounded-full font-semibold hover:bg-[#384BFF] hover:text-white"
              >
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link
                href="/#relaunch-roadmap"
                className="text-gray-700 px-4 py-2 transition duration-500 rounded-full font-semibold hover:bg-[#384BFF] hover:text-white"
              >
                Relaunch Roadmap
              </Link>
            </li>

            <li>
              <Link
                href="/#faqs"
                className="text-gray-700 px-4 py-2 transition duration-500 rounded-full font-semibold hover:bg-[#384BFF] hover:text-white"
              >
                FAQs
              </Link>
            </li>
          </ul>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-700"
            aria-label="Open Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Right: Get a Quote button (Desktop Only) */}
        <div className="hidden lg:block group relative min-w-[15%] bg-[#384BFF] py-3 transition-transform duration-300 ease-out hover:scale-105 hover:bg-[#253AC7]">
          <Link href="#contact">
            <div className="px-4 pl-14 py-2 font-medium text-white transition-colors duration-300">
              Get a Quote &rarr;
            </div>
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: "66%" }}
            animate={{ x: 0 }}
            exit={{ x: "66%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex"
            style={{ zIndex: 1000 }}
          >
            {/* Left half: black overlay */}
            <div
              className="w-1/3 bg-black bg-opacity-90"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Right half: white sidebar */}
            <div className="bg-white w-2/3 z-20 p-4 pt-0 shadow-md flex flex-col relative">
              {/* Close Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="mb-4 absolute top-2 right-2 self-end"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="mt-5 mx-auto text-center">
                <Link href="/">
                  <Image
                    src="/logo.svg"
                    alt="All Spark Logo"
                    width={150}
                    height={150}
                  />
                </Link>
              </div>
              <hr className="mt-3 " />
              <nav className="flex flex-col mx-5 mt-10 h-full">
                <ul className="space-y-2 text-gray-900 list-none">
                  <li className="border-b pb-3">
                    <Link href="/#hero" onClick={() => setIsSidebarOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li className="border-b pb-3">
                    <Link href="/#services" onClick={() => setIsSidebarOpen(false)}>
                      Services
                    </Link>
                  </li>

                  {/* Services with smooth dropdown */}
                  <li className="border-b pb-3">
                    <Link
                      href="/#why-choose-us"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Why Choose Us
                    </Link>


                  </li>

                  <li className="border-b pb-3">
                    <Link href="/#relaunch-roadmap" onClick={() => setIsSidebarOpen(false)}>
                      Relaunch Roadmap
                    </Link>
                  </li>
                  <li className="border-b pb-3">
                    <Link href="/#faqs" onClick={() => setIsSidebarOpen(false)}>
                      Faqs
                    </Link>
                  </li>
                  <li className="border-b pb-3">
                    <Link
                      href="/#contact"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="mb-4 text-xs border-t w-[90%] absolute bottom-2  ">
                <div className="max-w-[75%] mx-auto mt-3 text-center">
                  © All Copyright {new Date().getFullYear()} by AllSpark
                  Technologies
                </div>
              </div>
            </div>

            {/* Overlay to close the sidebar when clicking outside */}
            <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
