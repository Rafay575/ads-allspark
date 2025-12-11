"use client";

import { useState, useEffect, useMemo } from "react";
import { Layers, Code2, Database, Settings, MonitorSmartphone } from "lucide-react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { GiStarShuriken } from "react-icons/gi";

// Services Data
const services = [
  {
    icon: <ShoppingBagIcon />,
    title: "Ecommerce Website Development",
    description:
      "Shopify and WooCommerce Website Development that drives sales and seamless shopping experience for clients.",
  },
  {
    icon: <Code2 />,
    title: "Full Stack Web Development",
    description:
      "Our team delivers fast, scalable full-stack solutions combining front-end and back-end frameworks for performance.",
  },
  {
    icon: <MonitorSmartphone />,
    title: "Web Portal Development Service",
    description:
      "We build secure, user-friendly web portals focused on customer interaction, data access, and business process automation.",
  },
  {
    icon: <Layers />,
    title: "CMS Development",
    description:
      "We create flexible content management systems that make website updates easy, efficient, and fully tailored to your needs.",
  },
  {
    icon: <Database />,
    title: "API Development and Integration",
    description:
      "We design and integrate powerful APIs that seamlessly connect your platforms and enhance data flow across systems.",
  },
  {
    icon: <Settings />,
    title: "Custom Web Application Development",
    description:
      "Tailored Web Application services that perfectly align with your business processes and growth objectives.",
  },
];

export default function CoreWebServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Responsive slides-per-view based on screen width
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesPerView(1); // Mobile: Show 1 slide at a time
      } else if (width < 1280) {
        setSlidesPerView(2); // Tablet: Show 2 slides at a time
      } else {
        setSlidesPerView(3); // Desktop: Show 3 slides at a time
      }
    };
    
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Chunk services into "pages" for the slider
  const slides = useMemo(() => {
    const result: typeof services[] = [];
    for (let i = 0; i < services.length; i += slidesPerView) {
      result.push(services.slice(i, i + slidesPerView));
    }
    return result;
  }, [services, slidesPerView]);

  const totalSlides = slides.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  return (
    <section className="pad bg-white" id="services">
      <div className="container sm:text-center">
        {/* Section Header */}
        <div className="w-full lg:w-[80%]">
          <div className="flex justify-start items-center gap-[10px] mb-[10px]">
            <GiStarShuriken className="subheading color" />
            <p className="text-[var(--primary)] font-[600] text-[20px] color">
              PORTFOLIO
            </p>
          </div>

          <p className="font-bold heading color">
            Create next-level digital products
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-[20px]">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {slides.map((group, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] lg:gap-[40px] xl:gap-[60px]"
                >
                  {group.map((service, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between h-full rounded-2xl border border-gray-200 bg-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 text-left"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 color border">
                          {service.icon}
                        </div>
                        <h3 className="subheading font-semibold text-gray-800">
                          {service.title}
                        </h3>
                        <p className="para text-gray-800 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white/80 dark:bg-slate-900/80 shadow-md hover:scale-105 transition 
                    ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <IoChevronBack />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === totalSlides - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border bg-white/80 dark:bg-slate-900/80 shadow-md hover:scale-105 transition 
                    ${currentIndex === totalSlides - 1 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <IoChevronForward />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 w-2 rounded-full transition ${
                      i === currentIndex
                        ? "bg-[var(--primary)]"
                        : "bg-gray-400/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// Optional custom icon for ecommerce
function ShoppingBagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 2l1.5 2h9L18 2M4 6h16l-1 14H5L4 6z"
      />
    </svg>
  );
}
