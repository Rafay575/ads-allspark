"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "@/public/images/serviceshape1.png";
import img2 from "@/public/images/serviceshape2.png";
import arrowleft from "@/public/images/leftarrow.png";
import arrowright from "@/public/images/rightarrow.png";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { PopupModal } from "react-calendly";

import ReCAPTCHA from "react-google-recaptcha";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
const [openCalendly, setOpenCalendly] = useState(false);
const [rootEl, setRootEl] = useState<HTMLElement | null>(null);
  // ✅ center modal state
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [submitMsg, setSubmitMsg] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    captcha?: string;
  }>({});
 useEffect(() => {
    setRootEl(document.body);
  }, []);
  const pathname = usePathname();
  const formattedPath = pathname
    .replace("/", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const validate = () => {
    const newErrors: typeof errors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Phone validation
    const cleanedPhone = phone.replace(/[^\d+]/g, "");
    if (!cleanedPhone) {
      newErrors.phone = "Phone number is required.";
    } else if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      newErrors.phone = "Phone number should be between 7 and 15 digits.";
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = "Message is required.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    // Captcha validation
    if (!captchaToken) {
      newErrors.captcha = "Please complete the captcha.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset modal and status
    setSubmitStatus(null);
    setSubmitMsg("");

    // Validate form data
    if (!validate()) return;

    // Create values object with proper typing
    const values = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      service: formattedPath,
      captchaToken: captchaToken || "", // The reCAPTCHA token
    };

    // Debug: Log the values being sent
    console.log("Submitting values:", values);

    // ✅ CHANGE THIS LINE: Point to your Node.js backend
    // Use environment variable or hardcode the URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    console.log("API endpoint:", `${API_URL}/api/contact/submit`);

    try {
      setIsSubmitting(true);

      // ✅ CHANGE THIS: Send to Node.js backend instead of Next.js API
      const res = await fetch(`${API_URL}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok && data.success) {
        // Handle success
        toast.success("Message Sent Successfully!", {
          description: "We will get back to you as soon as possible.",
        });

        // Success modal
        setSubmitStatus("success");
        setSubmitMsg(
          "Thank you! Your message has been sent. We'll get back to you soon."
        );

        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setCaptchaToken(null);
        setErrors({});

        // Auto close success modal after 4 seconds
        setTimeout(() => setSubmitStatus(null), 4000);
      } else {
        // Handle API error response
        console.error("API Error:", data);

        toast.error(data?.error || "Something went wrong");

        // Error modal
        setSubmitStatus("error");
        setSubmitMsg(
          data?.error || "Something went wrong. Please try again later."
        );

        // If it's a validation error, update form errors
        if (data.missing) {
          const newErrors: typeof errors = {};
          if (data.missing.name) newErrors.name = data.missing.name;
          if (data.missing.email) newErrors.email = data.missing.email;
          if (data.missing.phone) newErrors.phone = data.missing.phone;
          if (data.missing.message) newErrors.message = data.missing.message;
          if (data.missing.captchaToken)
            newErrors.captcha = data.missing.captchaToken;
          setErrors(newErrors);
        }
      }
    } catch (err: any) {
      console.error("Network error:", err);

      toast.error("Network error. Please check your connection.");

      // Error modal
      setSubmitStatus("error");
      setSubmitMsg("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInputClasses =
    "mt-[10px] text-white w-full border bg-transparent py-[10px] px-[8px] outline-none";

  return (
    <div
      className="newservice bg text-white relative !w-[100vw] overflow-x-hidden"
      id="hero"
    >
      <Image
        src={img1}
        className="absolute top-0 lg:bottom-0 left-0"
        alt="heroimg"
      />
      <Image
        src={img2}
        className="absolute bottom-0 right-0 z-[0]"
        alt="heroimg"
      />

      <div className="container flex flex-wrap lg:items-center justify-center py-5">
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start text-start"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <button className="flex items-center gap-[5px] border py-[10px] px-[20px] rounded-[27px] font-[500] sm:mt-[50px] lg:mt-0 hover:scale-[1.02] duration-500 hidden sm:block">
            No Website = No Trust. Let’s Fix That.
          </button>

          <p className="text-[30px] lg:text-[40px] 2xl:text-[50px] font-[700] sm:mt-[20px] w-full md:w-[70%] lg:w-full sm:leading-14 font">
            Still Running Your Business without a Proper Website?
          </p>

          <p className="w-full md:w-[80%] lg:w-full mt-[10px] text-[18px] hidden sm:block ">
            Without a proper website, you’re invisible to 70% of buyers who
            search online before making a decision. We build professional
            websites that put your business on the map — and in front of paying
            customers.
          </p>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 lg:pl-[80px] flex flex-col items-start z-[20] mt-[0px] lg:mt-[0]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-[5px] mt-[10px] ">
            <Image src={arrowleft} className="w-[35px]" alt="icon" />
            <p className="para font-[500] text-start ">
              {serviceHero.formSubtitle}
            </p>
            <Image src={arrowright} className="w-[35px]" alt="icon" />
          </div>

          <p className="heading font-[700] sm:my-[10px] text-sm text-start w-full">
            Website Design and Development Services
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full flex flex-col items-center sm:items-start gap-[10px] relative z-[20]">
              {/* Name + Email */}
              <div className="flex gap-[15px] mt-[0px] w-full relative z-[20]">
                <div className="w-full lg:w-1/2">
                  <label htmlFor="name" className="!text-start">
                    Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name)
                        setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`${baseInputClasses} ${
                      errors.name ? "border-red-500" : "border"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="w-full lg:w-1/2">
                  <label htmlFor="email" className="!text-start">
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Valid Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`${baseInputClasses} ${
                      errors.email ? "border-red-500" : "border"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="w-full ">
                <label htmlFor="phone">Phone*</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className={`${baseInputClasses} ${
                    errors.phone ? "border-red-500" : "border"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div className="w-full ">
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  placeholder="Type Here..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  className={`${baseInputClasses} min-h-[100px] ${
                    errors.message ? "border-red-500" : "border"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Google reCAPTCHA */}
              {/* Google reCAPTCHA */}
              <div className="w-full mt-2 mb-3">
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      setErrors((prev) => ({ ...prev, captcha: undefined }));
                    }}
                    onErrored={() => {
                      console.error("reCAPTCHA error");
                      setErrors((prev) => ({
                        ...prev,
                        captcha:
                          "reCAPTCHA failed to load. Please refresh the page.",
                      }));
                    }}
                    theme="dark"
                  />
                ) : (
                  <div className="text-yellow-500 text-sm">
                    Warning: reCAPTCHA site key is missing. Please add
                    NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your .env file.
                  </div>
                )}
                {errors.captcha && (
                  <p className="text-xs text-red-400 mt-1">{errors.captcha}</p>
                )}
              </div>

              <div className="w-full flex flex-col sm:flex-row mb-5 sm:gap-[20px] items-center sm:justify-start">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-[20px] py-[10px] cursor-pointer font-[500] bg-[#F98600] h-12 rounded-[25px] text-center hover:border hover:border-white hover:bg-transparent text-white w-full sm:w-[48%] ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : " Get Free Proposal "}
                </button>

                {/* Schedule a Meeting Button */}
                {/* <Link
                  href="https://calendly.com/teepusheikh96/new-meeting"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-[48%] h-12"
                > */}
                  <button
                    type="button"
                     onClick={() => setOpenCalendly(true)}
                    className="mt-6 w-full sm:w-[48%] h-12 cursor-pointer sm:mt-0 inline-flex bg-transparent items-center border-white border justify-center rounded-[25px] hover:border-0 px-5 py-0  para font-semibold text-white shadow-sm transition hover:bg-[#ff7a18] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F98600]"
                  >
                    <span>Book a Free Consultation</span>
                    <IoIosArrowForward className="ml-3 text-white" />
                  </button>
                {/* </Link> */}
              </div>
            </div>
          </form>
        </motion.div>
         {rootEl && (
        <PopupModal
          url="https://calendly.com/teepusheikh96/new-meeting"
          open={openCalendly}
          onModalClose={() => setOpenCalendly(false)}
          rootElement={rootEl}
        />
      )}
      </div>

      {/* ✅ Center Thank You / Error Modal */}
      {submitStatus && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3
              className={`text-xl font-bold ${
                submitStatus === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {submitStatus === "success" ? "Thank You!" : "Oops!"}
            </h3>

            <p className="mt-2 text-gray-700">{submitMsg}</p>

            <button
              type="button"
              onClick={() => setSubmitStatus(null)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
