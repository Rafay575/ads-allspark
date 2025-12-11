"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ProjectsCardProps {
  cardImage: string;
  name: string;
  tech_stack: string;
  year: string | number;
  index: number;
  slug: string;
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({
  cardImage,
  name,
  tech_stack,
  year,
  index,
  slug,
}) => {
  const pathname = usePathname();
  const even = index % 2 === 0;

  return (
    <Link
      href={`/${slug}`}
      className={`hover:scale-[1.01] mx-3 transition-transform duration-300 cursor-pointer relative `}
    >
      <Image
        src={cardImage}
        className="w-full aspect-[3/2] object-cover rounded-[25px] lg:opacity-85 hover:opacity-100 duration-300"
        alt={name}
        width={400}
        height={300}
        unoptimized
      />
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col items-start">
          <p className="text-[25px] font-[700]">{name}</p>
          <p className="para !text-[var(--primary)] font-[500]">{tech_stack}</p>
        </div>
        <p className="para opacity-80">{year}</p>
      </div>
    </Link>
  );
};

export default ProjectsCard;
