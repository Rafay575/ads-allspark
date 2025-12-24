"use client";

import React, { useRef, useState } from "react";
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

  // ✅ Center modal state (success/error)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [submitMsg, setSubmitMsg] = useState("");

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

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

    // ⚠️ NOTE: Your Industry UI is commented out.
   

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

    // reset modal each submit
    setSubmitStatus(null);
    setSubmitMsg("");

    if (!validate()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, general: undefined }));

    const formData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      budget,
      project,
      industry,
      message: message.trim(),
      captchaToken,
    };

    // ✅ Node backend URL
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5001";

    try {
      const res = await fetch(`${API_URL}/api/contact/form`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        // ✅ Center success modal
        setSubmitStatus("success");
        setSubmitMsg(
          "Thank you! Your message has been sent. We’ll get back to you soon."
        );

        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setBudget("");
        setProject("");
        setIndustry("");
        setMessage("");
        setCaptchaToken(null);
        setErrors({});

        // Reset captcha widget
        recaptchaRef.current?.reset();

        // auto close after 4s
        setTimeout(() => setSubmitStatus(null), 4000);
      } else {
        // map backend missing errors (if your API sends { missing: { field: "..." } })
        if (data?.missing && typeof data.missing === "object") {
          const mapped: FormErrors = { ...errors };

          if (data.missing.name) mapped.name = data.missing.name;
          if (data.missing.email) mapped.email = data.missing.email;
          if (data.missing.phone) mapped.phone = data.missing.phone;
          if (data.missing.budget) mapped.budget = data.missing.budget;
          if (data.missing.project) mapped.project = data.missing.project;
     
          if (data.missing.message) mapped.message = data.missing.message;

          // backend might return captchaToken, UI uses captcha
          if (data.missing.captchaToken) mapped.captcha = data.missing.captchaToken;

          setErrors(mapped);
        }

        const msg =
          data?.message || data?.error || "Failed to send message. Please try again.";

        setErrors((prev) => ({ ...prev, general: msg }));

        // ✅ Center error modal
        setSubmitStatus("error");
        setSubmitMsg(msg);
      }
    } catch (err) {
      console.error(err);
      const msg = "⚠️ Network error. Please try again later.";

      setErrors((prev) => ({ ...prev, general: msg }));

      // ✅ Center error modal
      setSubmitStatus("error");
      setSubmitMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container flex flex-wrap bg2 min-h-[680px] mar sm:pt-[20px]"
      id="contact"
    >
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
          Whether you need your very first website or a complete rebuild of a broken one,
          we’ll help you launch a site for your brand. Book a free session now.
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

          {errors.general && <p className="mb-2 text-sm text-red-400">{errors.general}</p>}

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
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-[-5px]">{errors.name}</p>}
                </div>

                <div className="w-full lg:w-1/2">
                  <label>Your Email*</label>
                  <input
                    type="email"
                    placeholder="info@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-[-5px]">{errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="w-full">
                <label>Your Phone*</label>
                <input
                  type="text"
                  placeholder="Your Phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                />
                {errors.phone && <p className="text-xs text-red-400 mt-[-5px]">{errors.phone}</p>}
              </div>

              {/* Budget */}
              <div className="w-full mb-[20px]">
                <label>Your Budget*</label>
                <div className="flex flex-wrap gap-x-[15px] xl:gap-x-[35px] mt-[15px] text-white">
                  {["Less than 1k", "$1K-$3K", "$3K-$5K", "$5K-$7K", "$7K-$10K", "$10K+"].map(
                    (range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          value={range}
                          checked={budget === range}
                          onChange={(e) => {
                            setBudget(e.target.value);
                            if (errors.budget) setErrors((p) => ({ ...p, budget: undefined }));
                          }}
                        />
                        {range}
                      </label>
                    )
                  )}
                </div>
                {errors.budget && <p className="text-xs text-red-400 mt-1">{errors.budget}</p>}
              </div>

              {/* Project */}
              <div className="w-full">
                <label>Describe Your Project*</label>
                <select
                  value={project}
                  onChange={(e) => {
                    setProject(e.target.value);
                    if (errors.project) setErrors((p) => ({ ...p, project: undefined }));
                  }}
                  className="my-[10px] xl:my-[15px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                >
                  <option value="" className="bg2">
                    Please Select
                  </option>
                  <option value="Website Design" className="bg2">
                    Website Design & Development
                  </option>
                  <option value="Mobile App Development" className="bg2">
                    Mobile App Development
                  </option>
                  <option value="E-commerce Website" className="bg2">
                    E-commerce Website
                  </option>
                  <option value="Custom Software" className="bg2">
                    Custom Software Development
                  </option>
                </select>
                {errors.project && <p className="text-xs text-red-400 mt-[-5px]">{errors.project}</p>}
              </div>

              {/* Industry (UI is missing in your code) */}
              {/* Add your industry select here, otherwise remove industry validation */}

              {/* Message */}
              <div className="w-full">
                <label>What else should we know?*</label>
                <textarea
                  placeholder="Tell us about your product, timeline, and how you heard about us"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  className="my-[10px] xl:my-[15px] min-h-[150px] text-white w-full border bg-transparent py-[10px] px-[10px]"
                />
                {errors.message && <p className="text-xs text-red-400 mt-[-5px]">{errors.message}</p>}
              </div>

              {/* reCAPTCHA */}
              <div className="w-full mt-2 mb-3">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={(token) => {
                    setCaptchaToken(token);
                    setErrors((prev) => ({ ...prev, captcha: undefined }));
                  }}
                  onExpired={() => {
                    setCaptchaToken(null);
                    setErrors((prev) => ({ ...prev, captcha: "Captcha expired. Please try again." }));
                  }}
                  theme="dark"
                />
                {errors.captcha && <p className="text-xs text-red-400 mt-1">{errors.captcha}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="px-[20px] py-[10px] cursor-pointer font-[500] bg-white text-[#181965] rounded-[25px] text-center border border-white hover:bg-transparent hover:text-white disabled:opacity-60"
              >
                {loading ? "Sending..." : "Get Free Proposal"}
              </button>
            </div>
          </form>
        </div>
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
