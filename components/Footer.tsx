import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#18185E] text-gray-300 py-24 ">
        <div className="container grid grid-cols-1  lg:grid-cols-3   gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/logo-footer.svg"
              alt="AllSpark Logo"
              width={150}
              height={50}
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              AllSpark Technologies is dedicated to delivering innovative tech
              solutions, focusing on modern web and mobile applications to help
              businesses thrive in a digital-first world.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              <Link
                href="https://www.facebook.com/allsparktechnologies.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/allspark_technologies?igsh=aXkzbDMwc2Jvc3g4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://x.com/allsparktec"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <FaXTwitter className="h-4 w-4" />
              </Link>
              
              <Link
                href="https://www.linkedin.com/company/all-spark-technologies/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>

            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 lg:pl-[60px]">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              {[
                { name: "Home", href: "/#hero" },
                { name: "Portfolio", href: "/#portfolio" },
                { name: "Services", href: "/#services" },
                { name: "Why Choose Us", href: "/#why-choose-us" },
                { name: "Relaunch Roadmap", href: "/#relaunch-roadmap" },
                { name: "Faqs", href: "/#faqs" },
                { name: "Contact", href: "/#contact" },
              ].map((linkItem, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <ChevronsRight className="h-4 w-4 text-white" />
                  <Link href={linkItem.href} className="hover:text-white">
                    {linkItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        

          {/* Contact Us */}
          <div className=" text-end">
            <div className="w-fit space-y-6">
              <h3 className="text-lg text-left font-semibold text-white">
                Contact Us
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>info@allsparktechnologies.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>+1(616)308-1863</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-gray-400" />
                  <span className="text-start">
                    638 KNOLLWOOD ROAD, FRANKLIN LAKES, NJ, 07417
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center text-white text-sm">
          <p>
            © {new Date().getFullYear()} All Rights Reserved by AllSpark Technologies
          </p>
          <div className="flex space-x-4">
            <Link href="/termsandconditions" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacypolicy" className="hover:underline">
              Privacy Policy
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}
