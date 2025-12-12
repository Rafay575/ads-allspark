'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import img1 from "@/public/images/serviceshape1.png"
import img2 from "@/public/images/serviceshape2.png"
import arrowleft from "@/public/images/leftarrow.png"
import arrowright from "@/public/images/rightarrow.png"
import { usePathname } from "next/navigation";
import { toast } from "sonner"; // Sonner for toasts
import Link from 'next/link'
import { motion } from "framer-motion";
import { baseURL } from '@/api/baseURL'
import ReCAPTCHA from 'react-google-recaptcha';
import { IoIosArrowForward } from "react-icons/io"; 
interface HeroData {
  btnText: string;
  btnText2: string;
  btnText3: string;
  title: string;
  description: string;
  formSubtitle: string;
  formTitle: string;
}

interface ServiceHeroProps {
  serviceHero: HeroData;
}

export default function ServiceHero({ serviceHero }: ServiceHeroProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    captcha?: string;
  }>({})

  const pathname = usePathname();
  const formattedPath = pathname
    .replace("/", "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const validate = () => {
    const newErrors: typeof errors = {}

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required."
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required."
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address."
      }
    }

    // Phone validation
    const cleanedPhone = phone.replace(/[^\d+]/g, "")
    if (!cleanedPhone) {
      newErrors.phone = "Phone number is required."
    } else if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      newErrors.phone = "Phone number should be between 7 and 15 digits."
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = "Message is required."
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters."
    }

    // Captcha validation
    if (!captchaToken) {
      newErrors.captcha = "Please complete the captcha."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields.")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const values = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      service: formattedPath,
      captchaToken,
    }

    try {
      setIsSubmitting(true)

      const res = await fetch(`${baseURL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast("Message Sent Successfully!", {
          description: "Message Sent Successfully. We will catch you as soon as possible.",
          action: {
            label: "OK",
            onClick: () => console.log("OK clicked"),
          },
        });

        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
        setCaptchaToken(null)
        setErrors({})
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Network error");
      console.log(err);
    } finally {
      setIsSubmitting(false)
    }
  };

  const baseInputClasses =
    'mt-[10px] text-white w-full border bg-transparent py-[10px] px-[8px] outline-none'

  return (
    <div className='newservice bg text-white  relative !w-[100vw]overflow-x-hidden' id='hero'>
      <Image src={img1} className='absolute top-0 lg:bottom-0 left-0' alt="heroimg" />
      <Image src={img2} className='absolute bottom-0 right-0 z-[0]' alt="heroimg" />
      <div className="container flex flex-wrap lg:items-center justify-center py-5">
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start text-start"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Link href='/contact'>
            <button className='flex items-center gap-[5px] border py-[10px] px-[20px] rounded-[27px] font-[500] sm:mt-[50px] lg:mt-0 hover:scale-[1.02] duration-500 hidden sm:block'>
              No Website = No Trust. Let’s Fix That.
            </button>
          </Link>
          <p className='text-[30px] lg:text-[40px] 2xl:text-[50px] font-[700] sm:mt-[20px] w-full md:w-[70%] lg:w-full sm:leading-14 font'>
            Still Running Your Business without a Proper Website?
          </p>
          <p className='w-full md:w-[80%] lg:w-full mt-[10px] text-[18px] hidden sm:block '>
            Without a proper website, you’re invisible to 70% of buyers who search online before making a decision. We build professional websites that put your business on the map — and in front of paying customers.
          </p>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 lg:pl-[80px] flex flex-col items-start z-[20] mt-[0px] lg:mt-[0]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className='flex items-center gap-[5px] mt-[10px] '>
            <Image src={arrowleft} className='w-[35px]' alt='icon' />
            <p className='para font-[500] text-start '>{serviceHero.formSubtitle}</p>
            <Image src={arrowright} className='w-[35px]' alt='icon' />
          </div>
          <p className='heading font-[700] sm:my-[10px] text-start w-full'>{serviceHero.formTitle}</p>

          <form onSubmit={handleSubmit} className='w-full'>
            <div className='w-full flex flex-col items-center sm:items-start gap-[10px] relative z-[20]'>

              {/* Name + Email */}
              <div className='flex gap-[15px] mt-[0px] w-full relative z-[20]'>
                <div className='w-full lg:w-1/2'>
                  <label htmlFor="name" className='!text-start'>Name*</label>
                  <input
                    type="text"
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                    }}
                    className={`${baseInputClasses} ${errors.name ? 'border-red-500' : 'border'}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className='w-full lg:w-1/2'>
                  <label htmlFor="email" className='!text-start'>Email*</label>
                  <input
                    id="email"
                    type="email"
                    placeholder='Enter Valid Email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                    }}
                    className={`${baseInputClasses} ${errors.email ? 'border-red-500' : 'border'}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className='w-full '>
                <label htmlFor="phone">Phone*</label>
                <input
                  id="phone"
                  type="text"
                  placeholder='Enter Phone'
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
                  }}
                  className={`${baseInputClasses} ${errors.phone ? 'border-red-500' : 'border'}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div className='w-full '>
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  placeholder='Type Here...'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    if (errors.message) setErrors(prev => ({ ...prev, message: undefined }))
                  }}
                  className={`${baseInputClasses} min-h-[100px] ${errors.message ? 'border-red-500' : 'border'}`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Google reCAPTCHA */}
              <div className="w-full mt-2 mb-3">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setErrors((prev) => ({ ...prev, captcha: undefined }));
                  }}
                  theme="dark"
                />
                {errors.captcha && (
                  <p className="text-xs text-red-400 mt-1">{errors.captcha}</p>
                )}
              </div>

            <div className="w-full flex flex-col sm:flex-row mb-5 sm:gap-[20px] items-center sm:justify-start">
  {/* Submit Button (Form) */}
  <button
    type="submit"
    disabled={isSubmitting}
    className={`px-[20px] py-[10px] font-[500] bg-[#F98600] h-12 rounded-[25px] text-center hover:border hover:border-white hover:bg-transparent text-white w-full sm:w-[48%] ${
      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
    }`}
  >
    {isSubmitting ? "Sending..." : serviceHero.btnText3}
  </button>

  {/* Schedule a Meeting Button */}
  <Link
    href="https://calendly.com/teepusheikh96/new-meeting"
    passHref
    target="_blank"
    rel="noopener noreferrer"
    className='w-full sm:w-[48%] h-12'
  >
    <button
    type='button'
      className="mt-6 sm:mt-0 inline-flex w-full bg-transparent items-center border-white border justify-center rounded-[25px] hover:border-0 px-5 py-0 h-12 para font-semibold text-white shadow-sm transition hover:bg-[#ff7a18] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F98600]"
    >
      <span>Book a Free Session</span>
      <IoIosArrowForward className="ml-3 text-white" /> {/* Arrow icon */}
    </button>
  </Link>
</div>

            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
