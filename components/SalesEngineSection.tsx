// components/SalesEngineSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function SalesEngineSection() {
  return (
    <section className="w-full bg-[#1B36B7] my-16 relative">
      <div className=" md:p-4">
        <div className="grid min-h-[50vh] overflow-hidden rounded-xl container md:grid-cols-2">
          {/* Left: Text */}
          <div className="py-12 px-4 sm:p-8 md:p-10 md:pl-0 xl:pl-10 h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold leading-tight text-white heading ">
              How We Turned a Website
              Into a Sales Engine
            </h2>
            <p className="mt-2 para text-white/80">
              See how our website design and development services helped a business grow from invisible online to generating consistent leads. Your business could be next.
            </p>
           
             <Link
          href="https://calendly.com/teepusheikh96/new-meeting"
          passHref
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
           className="mt-6 inline-flex w-48 items-center justify-center rounded-full bg-[#FF8C3A] px-5 py-3 para font-semibold text-white shadow-sm transition hover:bg-[#ff7a18] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8C3A] "
          
          >
            Schedule a Meeting
          </button>
        </Link>
          </div>

          {/* Right: Image */}
          <div className="relative flex items-center justify-center h-full">
            <Image
              src="/images/2.png" // replace with the image source path
              alt="Laptop displaying website"
              height={500}
              width={600}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
