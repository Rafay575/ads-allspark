"use client";
import { useState } from "react";
import Image from "next/image";

export default function RoadmapSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Email sent successfully!");
      setForm({ firstName: "", lastName: "", email: "", company: "" });
    } else {
      alert("❌ Failed to send email. Please try again.");
    }
  };

  return (
    <section className="w-full bg-white" id="relaunch-roadmap">
      <div className="h-full">
        <div className="grid  bg-gray-100 md:grid-cols-2">
          {/* Left: Form */}
          <div className="bg-[#181965] ">
            <div className="max-w-[95%] mx-auto lg:max-w-[70%] h-full p-6 sm:p-8 md:p-10 my-5 flex flex-col sm:justify-center">
              <h2 className="heading font-bold leading-tight text-white sm:text-[36px] xl:max-w-[75%]">
                Free Website Launch or Relaunch Roadmap
              </h2>
              <p className="mt-2 para text-white/80 xl:max-w-[70%]">
                Not sure how to get started? Let us map it out for you. In 20 minutes, we’ll show you.
              </p>

              <form className="mt-7" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="text-white !mb-2 para">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Your Name"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-white mt-2 bg-transparent px-3 py-2 text-white placeholder-white/70 outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="text-white !mb-2 para">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-white mt-2 bg-transparent px-3 py-2 text-white placeholder-white/70 outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="text-white !mb-2 para">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-white mt-2 bg-transparent px-3 py-2 text-white placeholder-white/70 outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="text-white !mb-2 para">
                      Company Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Company name"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full mt-2 rounded-md border border-white bg-transparent px-3 py-2 text-white placeholder-white/70 outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-[#FF8C3A] px-5 py-3 para font-semibold text-white shadow-sm transition hover:bg-[#ff7a18] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8C3A] focus:ring-offset-[#14215E] sm:w-auto"
                >
                  Get Free Relaunch Roadmap →
                </button>
              </form>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative min-h-[70vh] w-full hidden md:block md:h-auto">
            <Image
              src="/relauch.png"
              alt="Keyboard with magnifying glass"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
