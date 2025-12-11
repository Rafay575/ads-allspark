"use client";
import React, { useState, useEffect, useMemo } from "react";
import { allProjects } from "@/lib/Projects";
import ProjectsCard from "@/components/ProjectsCard";
import { GiStarShuriken } from "react-icons/gi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Handle responsive slides-per-view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      if (width < 768) {
        setSlidesPerView(1); // mobile
      } else if (width < 1280) {
        setSlidesPerView(2); // md / lg
      } else {
        setSlidesPerView(3); // xl+
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Filter logic
  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter(
          (project) =>
            project.type.toLowerCase() === activeFilter.toLowerCase()
        );

  // Chunk projects into "pages" for the slider
  const slides = useMemo(() => {
    const result: typeof filteredProjects[] = [];
    for (let i = 0; i < filteredProjects.length; i += slidesPerView) {
      result.push(filteredProjects.slice(i, i + slidesPerView));
    }
    return result;
  }, [filteredProjects, slidesPerView]);

  const totalSlides = slides.length;

  // Reset index when filter or layout changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter, slidesPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < totalSlides - 1 ? prev + 1 : prev
    );
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

        {/* Slider */}
        {filteredProjects.length === 0 ? (
          <p className="mt-[20px] text-center text-gray-500">
            No projects found.
          </p>
        ) : (
          <div className="relative mt-[20px]">
            {/* Slider track */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {slides.map((group, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] lg:gap-[40px] xl:gap-[60px]"
                  >
                    {group.map((project, i) => (
                      <ProjectsCard
                        key={project.slug ?? `${slideIndex}-${i}`}
                        cardImage={project.cardImage}
                        name={project.name}
                        tech_stack={project.tech_stack}
                        year={project.year}
                        slug={project.slug}
                        index={i}
                      />
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
                    ${
                      currentIndex === totalSlides - 1
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
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
        )}
      </div>
    </section>
  );
}
