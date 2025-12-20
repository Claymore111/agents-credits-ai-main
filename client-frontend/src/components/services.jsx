import React from "react";

import {
  LaptopIcon,
  CreditCardIcon,
  HandPlatterIcon,
  ChevronsUpIcon,
} from "lucide-react";



const services = [
  {
    id: 1,
    color: "bg-purple-50",
    IconComponent: (
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
        <LaptopIcon className="w-8 h-8 text-purple-600" />
      </div>
    ),
    title: "AI-Powered Assessment",
    description:
      "Advanced artificial intelligence evaluates your loan application instantly. Get transparent decisions with detailed explanations of approval factors and risk assessment.",
  },
  {
    id: 2,
    color: "bg-emerald-50",
    IconComponent: (
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <CreditCardIcon className="w-8 h-8 text-emerald-600" />
      </div>
    ),
    title: "Flexible Loan Options",
    description:
      "Choose from multiple loan types: Personal, Business, Education, Medical, Vehicle, Wedding, and more. Flexible repayment terms from 6 to 48 months with competitive rates.",
  },
  {
    id: 3,
    color: "bg-amber-50",
    IconComponent: (
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
        <HandPlatterIcon className="w-8 h-8 text-amber-600" />
      </div>
    ),
    title: "Instant Decisions",
    description:
      "Get loan approval decisions in minutes. Our AI system processes applications 24/7, providing immediate feedback with clear explanations for every decision.",
  },
  {
    id: 4,
    IconComponent: (
      <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
        <ChevronsUpIcon className="w-8 h-8 text-cyan-600" />
      </div>
    ),
    title: "Secure & Transparent",
    description:
      "Bank-level security protects your data. Full transparency in decision-making process with detailed risk and positive factor analysis for every application.",
  },
];

const Services = () => {
  return (
    <div className="bg-white" id="how-it-works">
      <div className="max-w-8xl mx-auto px-4 sm:px-7 lg:px-14 py-12">
        <h2 className="text-5xl font-extrabold text-gray-900 text-center text-indigo-900">
          Our Services
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-6 border border-indigo-50 flex flex-col items-center"
            >
              {service.IconComponent}
              <h3 className="mt-6 text-xl font-extrabold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-4 text-base text-gray-500 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
