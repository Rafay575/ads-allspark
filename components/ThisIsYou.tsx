// app/components/ThisIsYou.tsx
"use client";
import * as React from "react";
import { ArrowDown } from "lucide-react";
type ThisIsYouProps = {
  title?: string;
  leftItems?: string[];
  rightItems?: string[];
};



export default function ThisIsYou({
  title = "This is You, Isn’t It?",
  leftItems = [
    "You have a domain, but not a live website.",
    "You want a portfolio site that actually converts.",
    "You tried WordPress, got lost, and never looked back.",
    "You’ve got a killer product, but your website makes it look average.",
    "You want to stand out on the web, not copy paste another template.",
    "There’s “something missing” on your website, you just don’t know what.",
  ],
  rightItems = [
    "Your present website looks like it was made in the 90s.",
    "Your website is a digital showpiece, it doesn’t bring in any leads, sales or even visits.",
    "You’re losing eyeballs.",
    "You know you need a website, but don’t know where to start.",
    "You’ve watched a hundred Framer tutorials and still feel stuck.",
    "You’re embarrassed to send your link because it feels half-finished.",
  ],
}: ThisIsYouProps) {
  // Make both sides have the same number of rows
  const rows = Math.max(leftItems.length, rightItems.length);
  const pad = (arr: string[]) =>
    arr.length === rows ? arr : [...arr, ...Array(rows - arr.length).fill("")];

  const left = pad(leftItems);
  const right = pad(rightItems);

  return (
    <section className="container px-3 md:px-6 py-10">
      <h2 className="my-8 text-center heading md:text-3xl font-bold color">
        {title}
      </h2>

      {/* Outer blue card */}
      <div className="relative rounded-3xl bg   shadow-lg">
        {/* Double vertical divider, full height of inner area */}
        <div className="pointer-events-none absolute  inset-y-3 md:-inset-y-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex">
          <span className="h-[100%]  w-px bg-white" />
          <span className="w-4" />
          <span className="h-[100%] w-px bg-white" />
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-white">
          {/* Left column as a grid with equal row heights */}
          <ul
            className="grid gap-3 list-none md:gap-4"
            style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
          >
            {left.map((text, i) => (
              <li
                key={`left-${i}`}
                className={`h-full border-b border-white px-3 py-3 md:px-4 md:py-2
      ${i === 0 ? "pt-10" : ""} 
      ${i === left.length - 1 ? "pb-10" : ""}
    `}
              >
                {text ? (
                  <div className="flex h-full items-center gap-3">
                    <span className="inline-block rotate-[315deg]">
                      <ArrowDown className="transition-transform" />
                    </span>
                    <p className="leading-snug text-white text-sm md:text-[18px]">{text}</p>
                  </div>
                ) : (
                  <div className="h-full" />
                )}
              </li>
            ))}

          </ul>

          {/* Right column as a grid with equal row heights */}
          <ul
            className="grid gap-3 list-none md:gap-4"
            style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
          >
            {right.map((text, i) => (
              <li
                key={`right-${i}`}
                className={`h-full border-b border-white px-3 py-3 md:px-4 md:py-3
      ${i === 0 ? "pt-10" : ""} 
      ${i === right.length - 1 ? "pb-10" : ""}
    `}
              >
                {text ? (
                  <div className="flex h-full items-center gap-3">
                    <span className="inline-block rotate-[315deg]">
                      <ArrowDown className="transition-transform" />
                    </span>
                    <p className="leading-snug text-white text-sm md:text-[18px]">{text}</p>
                  </div>
                ) : (
                  <div className="h-full" />
                )}
              </li>
            ))}

          </ul>
        </div>
      </div>
    </section>
  );
}
