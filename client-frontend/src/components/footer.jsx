import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              LoanAI System
            </h3>
            <p className="text-gray-300 text-sm">
              AI-Driven Loan Risk Assessment and Management System.
              A graduation project by Istanbul Nişantaşı University students.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>Email: info@loanai-system.tr</li>
              <li>Phone: +90 212 000-0000</li>
              <li>Address: Istanbul, Turkey</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-300 text-sm">
            © {new Date().getFullYear()} LoanAI - Graduation Project, Istanbul Nişantaşı University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
