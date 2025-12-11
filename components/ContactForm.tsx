"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  budget?: string;
  project?: string;
  industry?: string;
  message?: string;
  captcha?: string;
  general?: string;
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [project, setProject] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{7,20}$/; // basic phone validation

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!budget) newErrors.budget = "Please select your budget.";
    if (!project) newErrors.project = "Please select your project type.";
    if (!industry) newErrors.industry = "Please select your industry.";

    if (!message.trim()) {
      newErrors.message = "Please tell us a bit about your project.";
    } else if (message.trim().length < 20) {
      newErrors.message = "Try to provide at least 20 characters.";
    }

    if (!captchaToken) newErrors.captcha = "Please complete the captcha.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, general: undefined }));

    const formData = {
      name,
      email,
      phone,
      budget,
      project,
      industry,
      message,
      captchaToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");

        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setBudget("");
        setProject("");
        setIndustry("");
        setMessage("");
        setCaptchaToken(null);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: data.message || "Failed to send message. Please try again.",
        }));
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        general: "⚠️ Something went wrong. Please try again later.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-wrap bg2 min-h-[680px] mar sm:pt-[20px]" id="contact">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 relative px-[30px] sm:px-[40px] lg:pt-[40px] hidden sm:block">
        <div className="mb-2 flex items-center space-x-2 para font-semibold color mt-[40px] lg:mt-0 justify-start text-start">
          <Image src="/arw.png" alt="arrow" width={200} height={200} className="w-7" />
          <span className="font text-white">Let’s Get Started</span>
          <Image src="/alw.png" alt="arrow" width={200} height={200} className="w-7" />
        </div>

        <h2 className="heading font-bold text-white text-start leading-[45px]">
          Your Website, Your Growth — Let’s Build It Together
        </h2>
        <p className="text-white text-[19px] mt-[10px] w-[95%]">
          Whether you need your very first website or a complete rebuild of a broken one, we’ll help you
          launch a site for your brand. Book a free session now.
        </p>
        <ul className="text-[19px] text-white list-disc list-inside mt-[10px]">
          <li>Fast turnaround — launch in weeks, not months</li>
          <li>Conversion-driven design (built to get leads & sales)</li>
          <li>Dedicated experts, no hidden costs</li>
        </ul>
        <Image
          src="/contactimg.png"
          alt="img"
          width={400}
          height={400}
          className="absolute bottom-0 !w-[80%] left-[50px] z-[3] hidden lg:block"
        />
      </div>

      {/* Right Side (Form) */}
      <div className="w-full lg:w-1/2 text-white sm:mt-[60px] lg:mt-0">
        <div className="w-[90%] mx-auto lg:mx-0 flex flex-col items-start">
          <p className="text-[27px] lg:text-[33px] 2xl:text-[34px] font-[700] my-[10px] text-start font">
            Got an Idea in Mind? Let’s Make It Live.
          </p>

          {errors.general && (
            <p className="mb-2 text-sm text-red-400">{errors.general}</p>
          )}

          <form className="w-full" onSubmit={handleSubmit} noValidate>
            <div className="w-full flex flex-col items-start xl:gap-[10px] mb-[20px]">
              {/* Name + Email */}
              <div className="flex gap-[7px] xl:gap-[15px] mt-[20px] w-full flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <label>Your Name*</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-[-5px]">{errors.name}</p>
                  )}
                </div>
                <div className="w-full lg:w-1/2">
                  <label>Your Email*</label>
                  <input
                    type="email"
                    placeholder="info@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-[-5px]">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="w-full">
                <label>Your Phone*</label>
                <input
                  type="text"
                  placeholder="Your Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                />
                {errors.phone && (
                  <p className="text-xs text-red-400 mt-[-5px]">{errors.phone}</p>
                )}
              </div>

              {/* Budget */}
              <div className="w-full mb-[20px]">
                <label>Your Budget*</label>
                <div className="flex flex-wrap gap-x-[15px] xl:gap-x-[35px] mt-[15px] text-white">
                  {["$25-$50K", "$50-$80K", "$80-$100K", "$100K+"].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={range}
                        checked={budget === range}
                        onChange={(e) => setBudget(e.target.value)}
                      />
                      {range}
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <p className="text-xs text-red-400 mt-1">{errors.budget}</p>
                )}
              </div>

              {/* Project */}
              <div className="w-full">
                <label>Describe Your Project*</label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                >
                  <option value="" className="bg2">
                    Please Select
                  </option>
                  <option value="Website Design" className="bg2">
                    Website Design
                  </option>
                  <option value="Mobile App Development" className="bg2">
                    Mobile App Development
                  </option>
                  <option value="E-commerce Website" className="bg2">
                    E-commerce Website
                  </option>
                  <option value="Custom Software" className="bg2">
                    Custom Software
                  </option>
                </select>
                {errors.project && (
                  <p className="text-xs text-red-400 mt-[-5px]">{errors.project}</p>
                )}
              </div>

              {/* Industry */}
              <div className="w-full">
                <label>What Industry are You in?*</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                >
                  <option value="" className="bg2">
                    Please Select
                  </option>
                  <option value="Healthcare" className="bg2">
                    Healthcare
                  </option>
                  <option value="Education" className="bg2">
                    Education
                  </option>
                  <option value="Finance" className="bg2">
                    Finance
                  </option>
                  <option value="Technology" className="bg2">
                    Technology
                  </option>
                  <option value="Other" className="bg2">
                    Other
                  </option>
                </select>
                {errors.industry && (
                  <p className="text-xs text-red-400 mt-[-5px]">{errors.industry}</p>
                )}
              </div>

              {/* Message */}
              <div className="w-full">
                <label>What else should we know?*</label>
                <textarea
                  placeholder="Tell us about your product, timeline, and how you heard about us"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="my-[10px] xl:my-[15px] min-h-[150px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-[-5px]">{errors.message}</p>
                )}
              </div>

              {/* reCAPTCHA */}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="px-[20px] py-[10px] font-[500] bg-white text-[#181965] rounded-[25px] text-center border border-white hover:bg-transparent hover:text-white disabled:opacity-60"
              >
                {loading ? "Sending..." : "Book My Free Session"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
