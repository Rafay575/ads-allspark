"use client";

import React from 'react';
import Link from 'next/link';

const CalendlyButton: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 py-16">
      <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Ready to Schedule a Meeting?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Click below to schedule a meeting at a time that works for you.
        </p>
        <Link
          href="https://calendly.com/teepusheikh96/new-meeting"
          passHref
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="bg-blue-500 text-white py-3 px-8 rounded-full text-xl font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          
          >
            Book a Meeting
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CalendlyButton;
