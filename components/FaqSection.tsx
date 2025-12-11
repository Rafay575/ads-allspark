"use client"; // Required for Next.js App Router

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import { motion, Variants } from "framer-motion";




export default function FaqSection() {
  const faq = {
    "img1": "faq1.png",
    "img2": "faq2.png",
    "img3": "faq3.png",

    "subtitle": "Frequently Asked Questions",
    "title": "FAQs",
    "faqs": [
      {
        "question": "What services does your software house offer?",
        "answer": "We provide custom software development services, mobile and web app development, AI-powered solutions, UI/UX design, full-stack software development, cloud computing, DevOps, and ongoing tech support. As a full-scale software development agency USA, we cater to businesses from startups to large enterprises."
      },
      {
        "question": "How long does it take to develop a software product?",
        "answer": "Timelines depend on scope and complexity. A basic MVP may take 3–6 months, while complex enterprise solutions often take 6–12 months. Our team follows agile practices to deliver efficiently and adapt to your evolving needs. As a seasoned AI development company and SaaS development agency, we accelerate delivery with automation and smart integration."
      },
      {
        "question": "Do you offer post-launch support and maintenance?",
        "answer": "Absolutely. We provide long-term maintenance, regular security patches, cloud infrastructure support, and performance optimization. As a client-focused software development agency USA, we ensure your digital product evolves with your business."
      },
      {
        "question": "What industries do you work with?",
        "answer": "We serve a variety of industries including fintech, healthcare, e-commerce, logistics, real estate, education, and enterprise SaaS. Our clients value our tailored software development solutions that scale with their operations."
      }
    ]
  }


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};


  return (
    <section className="pad w-[100vw] overflow-x-hidden" id="faqs">
      <div className="container pt-[3%] flex flex-col lg:flex-row items-center lg:justify-between gap-5 lg:gap-10 ">
        {/* ───────── LEFT IMAGE SECTION ───────── */}
        <motion.div
          className="relative w-[90%] lg:w-[43%] mr-auto     "
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* main photo */}
          <div className="relative w-full h-auto">
            <Image
              src="/faq1.png"
              alt="Faq 1"
              width={400}
              height={400}
              className="rounded-3xl w-full "
              unoptimized
            />
          </div>

          {/* bottom-right overlay */}
          {/* <div className="absolute bottom-[-20px] right-[-20px] sm:bottom-[-10px] sm:right-[-50px] !w-[50%]"> */}
          <div className="absolute bottom-[-2%] right-[-10%] !w-[50%]">
            <Image
              src="/faq2.png"
              alt="Faq 2"
              className="!w-full "
              width={200}
              height={200}
              unoptimized   
            />
          </div>

          {/* spinning shape */}
          <Image
            src="/faq3.png"
            alt="Faq 3"
            className="w-[20%] absolute top-0 right-0 animate-spin"
            style={{ animationDuration: "4s" }}
            width={200}
            height={200}
            unoptimized
          />
        </motion.div>

        {/* ───────── RIGHT FAQ SECTION ───────── */}
        <motion.div
          className="w-full lg:w-[57%] lg:text-left   lg:pl-[50px] xl:pl-[80px] flex flex-col justify-center"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* FAQ Label */}
          <div className="mb-2 flex items-center space-x-4 para font-semibold uppercase tracking-wide color mt-[40px] lg:mt-0 justify-start text-center sm:text-start">
            <Image src='/al.png' alt="arrow" width={200} height={200} className=" w-7" />
            <span className="font">{faq.title}</span>
            <Image src='/ar.png' alt="arrow" width={200} height={200} className="w-7" />
          </div>

          {/* Main Heading */}
          <h2 className="heading font-bold !leading-relaxed text-gray-900 text-start">
            {faq.subtitle}
          </h2>

          {/* FAQ Accordion with Stagger Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="para mt-6 space-y-3"
          >
            {faq.faqs.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${index}`} >
                    <AccordionTrigger className="para  font-[500]">
                      {item.question}
                    </AccordionTrigger>

                    <AccordionContent className="para ">
                      {item.answer}
                    </AccordionContent>
                    <hr className=" border-gray-300" />
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
