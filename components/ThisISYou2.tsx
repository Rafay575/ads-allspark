"use client"

import { useState } from "react"
import {
  Globe,
  Monitor,
  Trophy,
  Target,
  Eye,
  AlertCircle,
  BookOpen,
  Lightbulb,
  Palette,
  HelpCircle,
  Zap,
  Share2,
} from "lucide-react"

const scenarios = {
  current: [
    {
      id: 1,
      icon: Globe,
      title: "You have a domain, but not a live website.",
    },
    {
      id: 2,
      icon: Monitor,
      title: "Your present website looks like it was made in the 90s.",
    },
    {
      id: 3,
      icon: Trophy,
      title: "Your website is a digital showpiece, it does not bring in any leads, sales or even visits.",
    },
    {
      id: 4,
      icon: Eye,
      title: "You are losing eyeballs.",
    },
    {
      id: 5,
      icon: BookOpen,
      title: "You tried WordPress, got lost, and never looked back.",
    },
    {
      id: 6,
      icon: Zap,
      title: "You have got a killer product, but your website makes it look average.",
    },
    {
      id: 7,
      icon: HelpCircle,
      title: "You know you need a website, but do not know where to start.",
    },
    {
      id: 8,
      icon: Palette,
      title: "You want to stand out on the web, not copy paste another template.",
    },
    {
      id: 9,
      icon: Lightbulb,
      title: "You have watched a hundred Framer tutorials and still feel stuck.",
    },
    {
      id: 10,
      icon: AlertCircle,
      title: "There is something missing on your website, you just do not know what.",
    },
   
  ],
  desired: [
    {
      id: 1,
      icon: Target,
      title: "You want a portfolio site that actually converts.",
    },
    {
      id: 2,
      icon: Zap,
      title: "Your website is a modern, professional masterpiece.",
    },
    {
      id: 3,
      icon: Lightbulb,
      title: "Your website consistently generates leads, sales, and engagement.",
    },
    {
      id: 4,
      icon: Eye,
      title: "You are attracting the right audience and gaining visibility.",
    },
    {
      id: 5,
      icon: Palette,
      title: "Your site is beautifully designed and easy to manage.",
    },
    {
      id: 6,
      icon: Trophy,
      title: "Your product shines through a stunning web presence.",
    },
    {
      id: 7,
      icon: Lightbulb,
      title: "You have a clear roadmap and professional guidance.",
    },
    {
      id: 8,
      icon: Share2,
      title: "You stand out with a unique, custom-built website.",
    },
    {
      id: 9,
      icon: Zap,
      title: "You are creating something amazing, not just learning.",
    },
    {
      id: 10,
      icon: Monitor,
      title: "Your website is complete, polished, and professional.",
    },
   
  ],
}

export default function ThisIsYou() {
  const [activeTab, setActiveTab] = useState<"current" | "desired">("current")

  const items = scenarios[activeTab]

  return (
    <div className="">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="heading font-[700] color mb-4">This is You, Is not It?</h1>
          <p className="text-slate-600 para max-w-2xl mx-auto">
            Your journey to a better website starts here — where design meets performance, and every click turns
            visitors into loyal customers.
          </p>
        </div>  

        {/* Tab Navigation */}
        <div className="flex  justify-center mb-8 md:mb-12  ">
          <button
            onClick={() => setActiveTab("current")}
            className={`px-4 md:px-6 py-2 rounded-l-[5px] font-semibold text-[10px] sm:text-[16px] transition-all duration-300 border-2 cursor-pointer ${
              activeTab === "current"
                ? "bg text-white bcolor"
                : "bg-white text-slate-400 border-slate-300 hover:border-slate-400"
            }`}
          >
            YOUR CURRENT STATE
          </button>
          <button
            onClick={() => setActiveTab("desired")}
            className={`px-6 md:px-8 py-2 rounded-r-[5px] text-[10px] sm:text-[16px] transition-all duration-300 border-2 cursor-pointer ${
              activeTab === "desired"
                ? "bg text-white bcolor"
                : "bg-white text-slate-400 border-slate-300 hover:border-slate-400"
            }`}
          >
            DESIRED OUTCOME
          </button>
        </div>

        {/* Grid of Scenarios */}
        <div className="bg-[#F3F4F6] border rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {items.map((item) => {
              const IconComponent = item.icon
              return (
                <div key={item.id} className="flex items-center gap-4 pb-4 md:pb-6 border-b border-slate-200 ">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100">
                      <IconComponent className="w-9 h-9 color" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 para">{item.title}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

