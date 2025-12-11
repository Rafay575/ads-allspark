"use client"; 
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { allProjects } from "@/lib/Projects";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { RxLaptop } from "react-icons/rx";
import { TbDeviceLaptopOff } from "react-icons/tb";
import { SlScreenTablet } from "react-icons/sl";
import { TbDeviceTabletOff } from "react-icons/tb";
import { TbDeviceMobile } from "react-icons/tb";
import { TbDeviceMobileOff } from "react-icons/tb";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { GiStarShuriken } from "react-icons/gi";
import Navbar2 from "@/components/Navbar2";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProjectPage() {
  const params = useParams();
  const { project } = params; // gets 'frontic' from /frontic
  const [device,setDevice]=useState("laptop")
  const projectData = allProjects.find(p => p.slug === project);


  if (!projectData) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }
  const iconclass = " text-[100px] w-full color"
  return (
    <>
      <Navbar2 />
      <div className=" pcontainer">
        <div className="flex justify-between hcolor items-center py-[15px]">
          <Link href="/" className="flex items-center gap-[5px] md:gap-[10px] color cursor-pointer opacity-80 hover:opacity-100 duration-300 hover:translate-x-[-5px] ">
            <FaArrowLeft />
            <p className="font-[600] ">Back to Projects</p>
          </Link>
          <p className="para font-[600] !text-[var(--primary)]">{projectData.year}</p>
        </div>
        <Image
          width={200}
          height={200}
          src={projectData.heroImage}
          alt={projectData.name}
          className={`w-full  mb-4 aspect-[10/4] object-cover mt-[5px] rounded-[10px] border `}
          unoptimized
        />
        <div className="flex flex-col lg:flex-row  items-start lg:justify-between lg:items-center flex-wrap ">
          <p className="heading lfont font-[700]">{projectData.name}</p>
          <div className=" item-center gap-[5px] hidden lg:flex">
            <a href={projectData.live_preview_link} className="btn flex items-center gap-[5px] bg text-white px-[20px] py-[10px] rounded-full hover:scale-[1.03] duration-500" target="_blank">Live Preview<GoArrowUpRight className="font-[800]" /></a>
          </div>
        </div>
        <p className="para mb-1 mt-[10px]">{projectData.description}</p>
        <strong className="para  mt-[15px] flex gap-[15px] opacity-80"><span>Type : </span>  <span className="capitalize font-[600]">{projectData.type}</span></strong>
        <strong className="para  mb-4  flex gap-[15px] opacity-80"><span>Tech Stack : </span>  <span className=" font-[600]">{projectData.tech_stack}</span></strong>

        <div className="flex flex-wrap">
          {
            projectData.technologies.map((tech, i) => (
              <span key={i} className="bgacc mr-2 mb-2 px-[10px] py-[5px] rounded-[5px] color font-[600]">{tech}</span>

            ))
          }
        </div>
        <div className=" item-center gap-[5px] lg:hidden flex mt-[20px]">
          <a href={projectData.live_preview_link} className="btn flex items-center gap-[10px]  bg text-white px-[20px] py-[10px] rounded-full hover:scale-[1.03] duration-500" target="_blank">Live Preview<GoArrowUpRight className="font-[800]" /></a>
        </div>

        <div className="pad">
          <div className="flex  items-center gap-[10px] lg:gap-[15px]">
            <GiStarShuriken className="subheading text-[var(--primary)]" />
            <p className="heading font-[700] color">Landing Page</p>
          </div>

          <Image
            src={projectData.landing_page_image}
            alt={`${projectData.name} landing`}
            className="w-full mt-[10px] border"
            width={900}
            height={700}
            unoptimized
          />
        </div>
        {
          projectData.extraDetail && projectData.extraDetail.map((detail, index) => (
            <div className="pad" key={index}>
              {/* Title with SplitText animation */}
              <div className="flex  items-center gap-[10px] lg:gap-[15px]">
                <GiStarShuriken className="subheading text-[var(--primary)]" />
                <p className="heading font-[700] color">{detail.title}</p>
              </div>


              {/* Carousel for all images inside each detail */}
              <Carousel
                className="w-full mt-[10px]"
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2500,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {detail.images.map((img, imgIndex) => (
                    <CarouselItem key={imgIndex} className="basis-full">
                      <Image
                        src={img}
                        alt={`${detail.title} - image ${imgIndex + 1}`}
                        className="w-full border rounded-xl"
                        width={1400}
                        height={1400}
                        unoptimized
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          ))
        }



        <div className="pad">
          <div className="flex  items-center gap-[10px] lg:gap-[15px]">
            <GiStarShuriken className="subheading text-[var(--primary)]" />

            <p className="heading font-[700] color">Color Pallete</p>
          </div>

          <p className="para mt-[5px]">This project’s color palette is designed to create a cohesive visual experience. The chosen colors balance contrast and harmony, reinforcing brand identity while maintaining readability and aesthetic appeal.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] mt-[10px]">
            {
              projectData.colors_used.map((color, index) => (
                <div key={index} className="flex flex-col rounded-[15px] border overflow-hidden" >
                  <div className="min-h-[100px]" style={{ backgroundColor: color, color: color }}> 123</div>
                  <p className="font-[600] p-1">{color}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="pad">
          <div className="flex  items-center gap-[10px] lg:gap-[15px]">
            <GiStarShuriken className="subheading text-[var(--primary)]" />

            <p className="heading font-[700] color" >Typography</p>
          </div>

          <p className="para mt-[5px]">The typography of this project is designed to create a clear visual hierarchy and enhance readability across all devices. A combination of elegant display fonts for headings and clean sans-serif fonts for body text ensures both style and legibility. Font sizes are carefully balanced to maintain consistency, accessibility, and a modern visual appeal throughout the user interface.</p>
          <div className="bgacc p-4 rouned-[10px] mt-[10px]">
            <div>
              <p className="subheading font-[600] color">Font Sizes:</p>
              <p className="flex gap-[10px]"><span className="font-[600]">Heading:</span> <span>{projectData.typography.font_size_heading}</span> </p>
              <p className="flex gap-[10px]"><span className="font-[600]">Sub Heading:</span> <span>{projectData.typography.font_size_subheading}</span> </p>
              <p className="flex gap-[10px]"><span className="font-[600]">Paragraph:</span> <span>{projectData.typography.font_size_paragraph}</span> </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] mt-[20px]">
              {
                projectData.typography.font_families.map((ff, i) => (
                  <div key={i} className="border bgcon rounded-[15px] p-4">
                    <p className="subheading !text-[#222121] font-[600] ">{ff}</p>
                    <p className="opacity-70 text-[15px] ">Google Fonts</p>
                    <p className="opacity-70 text-[15px] mt-[10px]">Extra Bold</p>
                    <p className="opacity-70 text-[15px]">Bold</p>
                    <p className="opacity-70 text-[15px]">Regular</p>
                  </div>
                ))
              }
            </div>

          </div>
        </div>

        <div className="pad">
          <div className="flex  items-center gap-[10px] lg:gap-[15px]">
            <GiStarShuriken className="subheading text-[var(--primary)]" />

            <p className="heading font-[700] color">Responsiveness</p>
          </div>

          <p className="para mt-[5px]">Fully responsive design optimized for mobile, tablet, and laptop devices to ensure a smooth user experience across all platforms.</p>
          <div className="flex flex-wrap  mt-[20px] items-center gap-[10px] ">
            <Dialog>
              <DialogTrigger asChild  onClick={()=>setDevice("laptop")}>
                <div className="bgacc w-full md:w-[32%] rounded-[10px] py-8 cursor-pointer hover:scale-[1.04] duration-300 border-2 !border-[#384BFF]">
                  {projectData.responsiveness.laptop == true ? <RxLaptop className={iconclass} /> : <TbDeviceLaptopOff className={iconclass} />}
                  <p className="text-center font-[600] color mt-[20px]">{projectData.responsiveness.laptop == true ? "Laptop Responsive" : "Not Laptop Responsive"}</p>
                </div>
              </DialogTrigger>

              <DialogTrigger asChild  onClick={()=>setDevice("tablet")}>
                <div className="bgacc w-full md:w-[32%] rounded-[10px] py-8 cursor-pointer hover:scale-[1.04] duration-300 border-2 !border-[#384BFF]">
                  {projectData.responsiveness.tablet == true ? <SlScreenTablet className={iconclass} /> : <TbDeviceTabletOff className={iconclass} />}
                  <p className="text-center font-[600] color mt-[20px]">{projectData.responsiveness.tablet == true ? "Tablet Responsive" : "Not Tablet Responsive"}</p>

                </div>
              </DialogTrigger>

              <DialogTrigger asChild  onClick={()=>setDevice("mobile")}>
                <div className="bgacc w-full md:w-[32%] rounded-[10px] py-8 cursor-pointer hover:scale-[1.04] duration-300 border-2 !border-[#384BFF]">
                  {projectData.responsiveness.mobile == true ? <TbDeviceMobile className={iconclass} /> : <TbDeviceMobileOff className={iconclass} />}
                  <p className="text-center font-[600] color mt-[20px]">{projectData.responsiveness.mobile == true ? "Mobile Responsive" : "Not Mobile Responsive"}</p>
                </div>
              </DialogTrigger>


              <DialogTrigger asChild>

              </DialogTrigger>
              <DialogContent className="sm:min-w-[90%] md:min-w-[80%] lg:min-w-[80%] xl:min-w-[70%] 2xl:min-w-[60%] ">

                <Image src={`/projects/${projectData.slug}/${device}.png`} className="w-full" width={1400} height={800} alt="device" unoptimized />
              </DialogContent>

            </Dialog>
          </div>
        </div>




        {
          projectData.other_details !== null && (
            <div className="text-left w-full">
              {/* Safely render your HTML list from JSON */}
              <div
                dangerouslySetInnerHTML={{ __html: projectData.other_details }}
              ></div>

            </div>
          )
        }

      </div>
      <Footer />
    </>
  );
}
