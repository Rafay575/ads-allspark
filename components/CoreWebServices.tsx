"use client";

import { useState } from "react";
import { Layers, Code2, Database, Settings, MonitorSmartphone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Custom pagination bullet buttons
  const goToSlide = (index: number) => {
    // If using ref like in previous example, you would call swiper.slideTo(index)
    // For this simple implementation, we'll just update the state
    setCurrentSlide(index);
  };

  return (
    <section className="pad bg-white" id="services">
      <div className="container sm:text-center">
        {/* Section Header */}
        <div className="w-full lg:w-[80%] mx-auto">
          <h2 className="heading font-bold color"> Services We Offer </h2> 
          <p className="mt-3 para text-gray-600 max-w-3xl mx-auto"> 
            As a leading website development company, we deliver end-to-end web solutions designed to boost performance, usability, and business growth. 
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative mt-[20px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.services-pagination',
              bulletClass: 'services-bullet',
              bulletActiveClass: 'services-bullet-active',
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col justify-between min-h-[300px] rounded-2xl border border-gray-200 bg-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 text-left">
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Dots/Buttons */}
          <div className="flex justify-center items-center gap-2 mt-8 services-pagination">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`services-bullet w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                  ${currentSlide === index 
                    ? 'services-bullet-active bg-[var(--primary)] scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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