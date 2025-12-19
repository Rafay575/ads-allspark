"use client"

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation"; // not needed since you're not using Navigation

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

 const testimonials = [
 
  {
    id: 8,
    name: "Michael Anderson",
    role: "Business Owner",
    text:
      "All Spark Technologies delivered a custom website development solution that perfectly matched our business goals. The design feels modern, loads fast, and clearly builds trust with visitors. Their team understood our vision and executed it flawlessly. Highly recommended.",
    image: "/images/testimonials/avatar.png",
    rating: 5,
  },
  {
    id: 9,
    name: "Sarah Mitchell",
    role: "Ecommerce Brand Manager",
    text:
      "We hired All Spark Technologies for ecommerce website development and the results exceeded expectations. From smooth checkout flow to mobile responsiveness, everything works seamlessly. Our conversion rate improved noticeably after launch.",
    image: "/images/testimonials/avatar.png",
    rating: 5,
  },
  {
    id: 10,
    name: "Daniel Roberts",
    role: "Marketing Director",
    text:
      "Their website design and development services helped us rebrand with confidence. The layout is clean, user friendly, and optimized for search engines. Communication was clear throughout the project and delivery was on time.",
    image: "/images/testimonials/avatar.png",
    rating: 5,
  },
  {
    id: 11,
    name: "Emily Watson",
    role: "Product Manager",
    text:
      "All Spark Technologies built a powerful web app tailored to our internal operations. The web app design and development process was well structured, secure, and scalable. Their technical expertise really stands out.",
    image: "/images/testimonials/avatar.png",
    rating: 5,
  },
  {
    id: 12,
    name: "James Carter",
    role: "Startup Founder",
    text:
      "We needed a custom website that could grow with our business, and All Spark Technologies delivered exactly that. The site is fast, SEO optimized, and easy to manage. Their attention to detail made a big difference.",
    image: "/images/testimonials/avatar.png",
    rating: 5,
  },
  {
    id: 13,
    name: "Olivia Hernandez",
    role: "Operations Lead",
    text:
      "From ecommerce functionality to overall website performance, everything was handled professionally. Their website design and development approach focuses on real user experience, not just visuals. A reliable partner for long term growth.",
    image: "/images/testimonials/avatar.png",
    rating: 5,
  },
];


  return (
    <section className="bg-gray-100 py-24">
      <div className="mx-auto mt-8 max-w-7xl px-6 text-center">
        {/* Section header */}
        <div className="flex items-center justify-center space-x-4 text-sm font-semibold uppercase text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          <span>Testimonials</span>
          <ArrowRight className="h-4 w-4" />
        </div>

        <h2 className="mb-20 mt-5 text-4xl font-bold text-gray-900">
          Our Latest Client Feedback
        </h2>

        {/* Swiper carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1440: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="!pb-8"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={t.id}>
              <div
                className={`flex min-h-[300px] flex-col justify-between rounded-xl p-4 shadow-lg transition-colors duration-300 ${
                  active === idx
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                {/* Stars */}
                <div className="mb-6 mt-3 flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-6 w-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="#ffbb00"
                          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed">{t.text}</p>

                {/* Author block */}
                <div className="mt-auto flex items-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="mr-4 h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />

                  <div className="flex flex-col items-start">
                    <h3 className="ml-0 font-semibold">{t.name}</h3>
                    <p
                      className={`ml-0 text-sm ${
                        active === idx ? "text-blue-200" : "text-gray-500"
                      }`}
                    >
                      {t.role}
                    </p>
                  </div>

                  <Quote
                    className={`ml-auto h-7 w-7 ${
                      active === idx ? "text-blue-200" : "text-gray-300"
                    }`}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
