import React from "react";
import { Link } from "react-router-dom";

const Motivation = () => {
  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-indigo-50"
      id="application-form"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Why Choose <span className="text-purple-600">LoanAI</span>?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of loan assessment with AI-powered transparency,
            instant decisions, and fair evaluation for every applicant.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">₺0</div>
              <div className="text-purple-100">Application Fee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-purple-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">5 min</div>
              <div className="text-purple-100">Average Decision Time</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl font-medium text-gray-900 italic">
            "The AI-powered loan system gave me an instant decision with clear
            explanations. I got approval for my business loan in just 5 minutes!
            The transparency and speed were incredible."
          </blockquote>
          <div className="mt-6">
            <div className="text-lg font-semibold text-purple-600">
              Mehmet Yılmaz
            </div>
            <div className="text-gray-500">Small Business Owner, Istanbul</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Apply for a Loan?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands who trust our AI-powered loan assessment system for
              fair, fast, and transparent loan decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-purple-600 bg-white hover:bg-purple-50 transform hover:scale-105 transition-all duration-300"
              >
                Start Your Application
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
