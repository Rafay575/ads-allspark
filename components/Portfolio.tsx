"use client";
import React, { useState, useEffect, useRef } from "react";
import { allProjects } from "@/lib/Projects";
import ProjectsCard from "@/components/ProjectsCard";
import { GiStarShuriken } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter(
          (project) =>
            project.type.toLowerCase() === activeFilter.toLowerCase()
        );

  // Custom pagination bullet buttons
  const goToSlide = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <section className="pad mb-0" id="portfolio">
      <div className="container">
        {/* Section Header */}
        <div className="w-full lg:w-[80%]">
          <div className="flex justify-start items-center gap-[10px] mb-[10px]">
            <GiStarShuriken className="subheading color" />
            <p className="text-[var(--primary)] font-[600] text-[20px] color">
              PORTFOLIO
            </p>
          </div>

          <p className="font-bold heading color">
            Create a next level digital products
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-[10px] justify-center sm:justify-end my-[15px]">
          {["All", "Custom", "Wordpress"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-[20px] py-[5px] rounded-full font-[600] duration-300 cursor-pointer
                ${
                  activeFilter === filter
                    ? "color bg-[var(--accordion)]"
                    : "hover:bg-[var(--accordion)]"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Swiper Slider */}
        {filteredProjects.length === 0 ? (
          <p className="mt-[20px] text-center text-gray-500">
            No projects found.
          </p>
        ) : (
          <div className="relative mt-[20px]">
            <Swiper
              ref={swiperRef}
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
                el: '.custom-pagination',
                bulletClass: 'custom-bullet',
                bulletActiveClass: 'custom-bullet-active',
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
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={project.slug ?? `${index}`}>
                  <ProjectsCard
                    cardImage={project.cardImage}
                    name={project.name}
                    tech_stack={project.tech_stack}
                    year={project.year}
                    slug={project.slug}
                    index={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination Dots/Buttons */}
            <div className="flex justify-center items-center gap-2 mt-8 custom-pagination">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`custom-bullet w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                    ${currentSlide === index 
                      ? 'custom-bullet-active bg-[var(--primary)] scale-125' 
                      : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}