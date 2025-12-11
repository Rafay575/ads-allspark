// components/WhyChooseUsSection.tsx
import Image from "next/image";

export default function WhyChooseUsSection() {
  return (
    <>
   
      <div className="container  pad" id="why-choose-us">
        <p className="heading  sm:text-center sm:w-[80%] xl:w-[60%] mx-auto color font-[700]">Why Choose Allspark Technologies?</p>
        <p className="para sm:text-center sm:w-[80%] xl:w-[60%] mx-auto">Trusted by businesses worldwide, we blend creativity and technology to craft digital experiences that drive growth, performance, and success.</p>
        <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-3 gap-[20px] mt-[30px]">
          <div className=" flex flex-col gap-[20px]">
            <div className=" h-[50%] bg-[#F3F4F6] rounded-[20px] p-[20px] flex flex-col justify-between shadow-md cursor-pointer hover:-translate-y-1 duration-300 border min-h-[200px]">
              <Image
                src="/icons/1.png"
                alt="Industries Served"
                width={60}
                height={60}
                className="bg p-[5px] rounded-[20px] w-[60px] h-[60px] object-contain"
              />
              <div>
                <p className="subheading text-gray-800 font-[500]">20+ Industries Served</p>
                <p className="para text-gray-800">With experience in 20+ sectors, our team builds tailored solutions that fit your business perfectly.</p>
              </div>
            </div>
            <div className=" h-[50%] bg-[#F3F4F6] rounded-[20px] p-[20px] flex flex-col justify-between shadow-md cursor-pointer hover:-translate-y-1 duration-300 border min-h-[200px]">
              <Image
                src="/icons/4.png"
                alt="Industries Served"
                width={60}
                height={60}
                className="bg p-[10px] rounded-[20px] w-[60px] h-[60px] object-contain"
              />
              <div>
                <p className="subheading text-gray-800 font-[500]">Responsive Designs</p>
                <p className="para text-gray-800">Crafting pixel-perfect websites that shine on desktops, tablets, and smartphones alike.</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block ">
            <Image src="/images/whychooseus.jpg" alt="whychooseus" className="w-[100%] h-full rounded-[20px] object-cover" width={500} height={600} loading="lazy" />
          </div>
          <div className=" flex flex-col gap-[20px] ">
            <div className=" h-[50%] bg-[#F3F4F6] rounded-[20px] p-[20px] flex flex-col justify-between shadow-md cursor-pointer hover:-translate-y-1 duration-300 border min-h-[200px]">
              <Image
                src="/icons/2.png"
                alt="Industries Served"
                width={60}
                height={60}
                className="bg p-[5px] rounded-[20px] w-[60px] h-[60px] object-contain rotate-270"
              />
              <div>
                <p className="subheading text-gray-800 font-[500]">Launched 100+ Websites</p>
                <p className="para text-gray-800.">Empowering brands with conversion-focused designs that turn traffic into sales.</p>
              </div>
            </div>
            <div className=" h-[50%] bg-[#F3F4F6] rounded-[20px] p-[20px] flex flex-col justify-between shadow-md cursor-pointer hover:-translate-y-1 duration-300 border min-h-[200px]">
              <Image
                src="/icons/3.png"
                alt="Industries Served"
                width={60}
                height={60}
                className="bg p-[5px] rounded-[20px]"
              />
              <div>
                <p className="subheading text-gray-800 font-[500]">Custom Designs</p>
                <p className="para text-gray-800">Every pixel is made to match your vision creative, consistent, and built for your brand.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
  //  <section className="w-full bg-white py-16">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <h2 className="text-3xl font-bold text-center text-[#1B36B7] mb-8">
  //           Why Choose Us?
  //         </h2>
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-3 max-h-[1200px]">
  //           {/* First Card */}
  //           <div className=" grid gap-3 grid-rows-3 h-full ">
  //             <div className="flex flex-col h-full row-span-2  bg-[#1B36B7] text-white px-3 rounded-xl shadow-md">
  //               <div className=" mb-0 flex ">
  //                 <h3 className="text-3xl font-bold "><span className="text-[100px] font-bold">20+</span> Industries Served</h3>
  //                 <Image
  //                   src="/icons/1.png"
  //                   alt="Industries Served"
  //                   width={450}
  //                   height={250}
  //                   priority
  //                 />
  //               </div>
  //               <p className="mt-0 text-[40px] text-left font-semibold text-white">We Know Yours Too</p>
  //             </div>

  //             {/* Second Card */}
  //             <div className="flex flex-col h-full row-span-1  bg-[#1B36B7] text-white px-3 py-1 rounded-xl shadow-md">
  //               <div className=" ">
  //                 <p className="font-bold text-[72px] !m-0 !p-0 leading-16">Since 2020</p>
  //                 <p className="font-bold text-[34px] !mt-0 !pt-0">Proven Digital Partner</p>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="grid gap-3 grid-rows-3 grid-cols-2 h-full">
  //             <div className="flex flex-col  h-full row-span-1 col-span-2 relative bg-[#1B36B7] text-white p-2 rounded-xl shadow-md">
  //               <div className="absolute -bottom-2 right-8 mb-4">
  //                 <Image
  //                   src="/icons/2.png" // Update this with your icon path
  //                   alt="Mobile Perfect Websites"
  //                   width={150}
  //                   height={64}
  //                   priority
  //                 />
  //               </div>
  //               <h3 className="text-2xl font-semibold">Launched 100+ Websites </h3>
  //               <p className="mt-0 text-2xl text-white font-semibold">
  //                 That Drive Sales
  //               </p>
  //             </div>

  //             {/* Fourth Card */}
  //             <div className="flex flex-col h-full row-span-2 col-span-1  bg-[#1B36B7] text-white p-2 rounded-xl shadow-md">
  //               <h3 className="text-[22px] font-semibold">Mobile-Perfect Websites for Every Screen Size.</h3>
  //               <div className=" mb-4 mx-auto">
  //                 <Image
  //                   src="/icons/4.png" // Update this with your icon path
  //                   alt="From Idea to Launch"
  //                   width={100}
  //                   height={100}
  //                   priority
  //                 />
  //               </div>

  //             </div>
  //             <div className="flex flex-col h-full row-span-2  col-span-1 items-center bg-[#1B36B7] text-white p-3 rounded-xl shadow-md">

  //               <p className="my-2 font-semibold text-[24px]">
  //                 From Idea
  //               </p>
  //               <Image
  //                 src="/icons/5.png" // Update this with your icon path
  //                 alt="From Idea to Launch"
  //                 width={20}
  //                 height={20}
  //                 priority
  //               />
  //               <p className="my-2 font-semibold text-[24px]">

  //                 Launch
  //               </p>
  //               <Image
  //                 src="/icons/5.png" // Update this with your icon path
  //                 alt="From Idea to Launch"
  //                 width={20}
  //                 height={20}
  //                 priority
  //               />
  //               <p className="my-2 font-semibold text-[24px]">

  //                 Support
  //               </p>
  //             </div>
  //           </div>
  //           {/* Fifth Card */}
  //           <div className="grid gap-3 grid-rows-3 h-full">
  //             <div className="flex !h-full row-span-1 gap-2 items-center bg-[#1B36B7] text-white p-3 rounded-xl shadow-md">
  //               <div>

  //                 <h3 className="text-3xl font-semibold">
  //                   Custom Design for
  //                 </h3>
  //                 <p className="mt-0 text-5xl text-white font-bold">
  //                   Your Brand

  //                 </p>
  //               </div>
  //               <div className=" mb-4">
  //                 <Image
  //                   src="/icons/3.png" // Update this with your icon path
  //                   alt="Custom Design"
  //                   width={100}
  //                   height={100}
  //                   priority
  //                 />
  //               </div>
  //             </div>

  //             {/* Sixth Card */}
  //             <div className="flex flex-col  h-full row-span-2 items-center bg-[#1B36B7] text-white p-3 rounded-xl shadow-md">
  //               <h3 className="text-[28px] font-semibold text-center leading-8 mb-4 px-4">We  Built Websites to
  //                 attract, engage, convert,
  //                 not just look pretty.</h3>
  //               <div className=" mb-4 mx-auto">
  //                 <Image
  //                   src="/icons/6.png" // Update this with your icon path
  //                   alt="From Idea to Launch"
  //                   width={100}
  //                   height={100}
  //                   priority
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>