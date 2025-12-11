import type React from "react"

interface TimelineStep {
  id: number
  title: string
  icon: React.ReactNode
  status: "completed" | "current" | "pending"
}

interface VerticalTimelineProps {
  steps: TimelineStep[]
  lineColor?: string
  dotColor?: string
  completedColor?: string
}

export function VerticalTimeline({
  steps,
  lineColor = "bg-blue-500",
  dotColor = "bg-blue-500",
  completedColor = "bg-blue-600",
}: VerticalTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className={`absolute left-6 top-0 bottom-0 w-1 ${lineColor}`} />

      {/* Timeline steps */}
      <div className= "space-y-5 md:space-y-7">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-16 pt-[2px] min-h-[105px]">
            {/* Dot */}
            <div
              className={`absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center ${
                step.status === "completed" ? completedColor : dotColor
              } text-white shadow-lg`}
            >
              {step.icon}
            </div>

            {/* Content */}
            <div className="pt-1">
              <p className={`subheading md:text-lg  border shadow-md font-[400] hover:text-white text-grey-800  bg-[#F3F4F6] hover:bg-[#384BFF] hover:border-[#384BFF] hover:scale-[1.005] hover:-translate-y-1 py-2 px-6 rounded-[10px] !rounded-tl-none duration-300 min-h-[90px]`}>{step.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
