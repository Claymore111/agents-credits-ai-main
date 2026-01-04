import React, { useState } from "react";
import axios from "axios";
import { LaptopMinimalCheck } from "lucide-react";

const steps = [
  { id: 1, title: "Employment" },
  { id: 2, title: "Loan" },
  { id: 3, title: "Credit" },
  { id: 4, title: "Motivation" },
  { id: 5, title: "Review" },
  { id: 6, title: "Success" },
];

const categories = [
  { id: 1, title: "Personal Loan" },
  { id: 2, title: "Home Renovation" },
  { id: 3, title: "Education" },
  { id: 4, title: "Medical" },
  { id: 5, title: "Business" },
  { id: 6, title: "Vehicle" },
  { id: 7, title: "Wedding" },
  { id: 8, title: "Debt Consolidation" },
  { id: 9, title: "Electronics" },
  { id: 10, title: "Other" },
];

const employmentTypes = [
  { id: 1, title: "Full-time" },
  { id: 2, title: "Part-time" },
  { id: 3, title: "Self-employed" },
  { id: 4, title: "Freelance" },
  { id: 5, title: "Unemployed" },
  { id: 6, title: "Student" },
];
const ApplyPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    location: "",
    zip_code: "",
    cin: "",
    monthly_income: "",
    employment_type: "",
    employment_duration: "",
    requested_amount: "",
    duration: "",
    purpose: "",
    category: "",
    credit_history: "",
    existing_debts: "",
    motivation: "",
  });

  const totalSteps = steps.length;
  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.monthly_income || formData.monthly_income <= 0) {
        newErrors.monthly_income = "Monthly income is required and must be greater than 0";
      }
      if (!formData.employment_type) {
        newErrors.employment_type = "Please select an employment type";
      }
      if (!formData.employment_duration || formData.employment_duration.trim() === "") {
        newErrors.employment_duration = "Employment duration is required";
      }
    }

    if (currentStep === 2) {
      if (!formData.requested_amount || formData.requested_amount <= 0) {
        newErrors.requested_amount = "Requested amount is required and must be greater than 0";
      }
      if (!formData.duration || formData.duration <= 0) {
        newErrors.duration = "Duration is required and must be greater than 0";
      }
      if (!formData.purpose || formData.purpose.trim() === "") {
        newErrors.purpose = "Please describe the purpose of your loan";
      }
      if (!formData.category) {
        newErrors.category = "Please select a loan category";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(totalSteps, s + 1));
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    const allStepsValid = validateStep(1) && validateStep(2);
    
    if (!allStepsValid) {
      alert("Please complete all required fields before submitting.");
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/applications`,
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setApplicationData(response.data.updatedApplication);
        setStep((prev) => prev + 1);
        setIsLoading(false);
      } else {
        console.log(response);
        setIsLoading(false);
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("An error occurred while submitting your application. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col gap-6 justify-start items-center max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center animate-fade-in-up">
        Fast & Secure Loan Application
      </h1>
      <p className="text-lg text-gray-500 text-center animate-fade-in-up-delay max-w-2xl">
        Complete your loan application online in minutes. Get instant AI-powered evaluation
        with transparent decision-making. Fast, secure, and 100% digital!
      </p>

      {/* Stepper */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s) => (
            <div key={s.id} className="flex-1 text-center">
              <div
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  s.id <= step
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {s.id}
              </div>
              <div className="mt-2 text-xs text-gray-600">{s.title}</div>
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-zinc-100 rounded-xl p-6 md:p-8 bg-zinc-50 w-full shadow-md animate-fade-in-up-delay-2"
      >
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-fade-right">
            <h2 className="text-2xl font-semibold">Employment & Income</h2>
            
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm font-semibold mb-2">Please fix the following errors:</p>
                <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                  {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Monthly income (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  name="monthly_income"
                  type="number"
                  value={formData.monthly_income}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect ${
                    errors.monthly_income ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  required
                />
                {errors.monthly_income && (
                  <p className="text-red-500 text-xs mt-1">{errors.monthly_income}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Employment type <span className="text-red-500">*</span>
                </label>
               <select
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect ${
                    errors.employment_type ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select employment type</option>
                  {employmentTypes.map((type) => (
                    <option key={type.id} value={type.title}>
                      {type.title}
                    </option>
                  ))}
                </select>
                {errors.employment_type && (
                  <p className="text-red-500 text-xs mt-1">{errors.employment_type}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold">
                  Employment duration <span className="text-red-500">*</span>
                </label>
                <input
                  name="employment_duration"
                  value={formData.employment_duration}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect ${
                    errors.employment_duration ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="e.g., 2 years"
                  required
                />
                {errors.employment_duration && (
                  <p className="text-red-500 text-xs mt-1">{errors.employment_duration}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <h2 className="text-2xl font-semibold">Loan Details</h2>
            
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm font-semibold mb-2">Please fix the following errors:</p>
                <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                  {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Requested amount (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  name="requested_amount"
                  type="number"
                  value={formData.requested_amount}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect ${
                    errors.requested_amount ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  required
                />
                {errors.requested_amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.requested_amount}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Duration (months) <span className="text-red-500">*</span>
                </label>
                <input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect ${
                    errors.duration ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  required
                />
                {errors.duration && (
                  <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={`border rounded-md p-3 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect ${
                    errors.purpose ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Tell us how you'll use the funds"
                  required
                />
                {errors.purpose && (
                  <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect ${
                    errors.category ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6 animate-fade-right">
            <h2 className="text-2xl font-semibold">Credit Background</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Credit history</label>
                <textarea
                  name="credit_history"
                  value={formData.credit_history}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Existing debts (USD)</label>
                <textarea
                  name="existing_debts"
                  value={formData.existing_debts}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <h2 className="text-2xl font-semibold">Motivation</h2>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500 form-input-effect"
              placeholder="Share your goal and how this financing helps"
            />
          </div>
        )}

        {step === 5 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold mb-2">Quick Review</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <span className="font-medium">Income:</span> $
                {formData.monthly_income}
              </div>
              <div>
                <span className="font-medium">Employment:</span>{" "}
                {formData.employment_type}
              </div>
              <div>
                <span className="font-medium">Duration:</span>{" "}
                {formData.employment_duration}
              </div>
              <div>
                <span className="font-medium">Amount:</span> $
                {formData.requested_amount}
              </div>
              <div>
                <span className="font-medium">Term:</span> {formData.duration}{" "}
                months
              </div>
              <div>
                <span className="font-medium">Purpose:</span> {formData.purpose}
              </div>
              <div>
                <span className="font-medium">Credit history:</span>{" "}
                {formData.credit_history}
              </div>
              <div>
                <span className="font-medium">Existing debts:</span> ${formData.existing_debts}
              </div>
              <div>
                <span className="font-medium">Motivation:</span>{" "}
                {formData.motivation}
              </div>
            </div>
          </div>
        )}

        {step === 6 && <SuccessComponent applicationData={applicationData} />}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 mt-8">
          {step === 6 ? null : (
            <span
              onClick={prev}
              className={`rounded-md px-4 py-2 border text-indigo-700 border-indigo-200 bg-white hover:bg-indigo-50 button-hover-effect ${
                step === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
              disabled={step === 1}
            >
              Previous
            </span>
          )}
          {step < totalSteps - 1 ? (
            <span
              onClick={next}
              className="rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 button-hover-effect"
            >
              Next
            </span>
          ) : step === 5 ? (
            <button
              type="submit"
              className="rounded-md px-4 py-2 bg-green-600 text-white hover:bg-green-700 button-hover-effect"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

const SuccessComponent = ({ applicationData }) => {
  const handleDownloadPDF = () => {
    // Create a simple text representation for download
    const content = `
LOAN APPLICATION SUMMARY
========================

Reference Number: ${applicationData?._id || 'N/A'}
Date: ${new Date(applicationData?.createdAt).toLocaleDateString('tr-TR') || 'N/A'}

DECISION: ${applicationData?.decision?.toUpperCase() || 'PENDING'}
Confidence: ${applicationData?.confidence || 'N/A'}%

${applicationData?.reason ? `Reason: ${applicationData.reason}` : ''}

${applicationData?.positive_factors?.length > 0 ? `
Positive Factors:
${applicationData.positive_factors.map(f => `- ${f}`).join('\n')}
` : ''}

${applicationData?.risk_factors?.length > 0 ? `
Risk Factors:
${applicationData.risk_factors.map(f => `- ${f}`).join('\n')}
` : ''}

LOAN DETAILS
============
Requested Amount: $${applicationData?.requested_amount || 'N/A'}
Duration: ${applicationData?.duration || 'N/A'} months
Category: ${applicationData?.category || 'N/A'}
Purpose: ${applicationData?.purpose || 'N/A'}

APPLICANT INFORMATION
=====================
Monthly Income: $${applicationData?.monthly_income || 'N/A'}
Employment Type: ${applicationData?.employment_type || 'N/A'}
Employment Duration: ${applicationData?.employment_duration || 'N/A'} months
Credit History: ${applicationData?.credit_history || 'N/A'}
Existing Debts: $${applicationData?.existing_debts || 'N/A'}

Generated by LoanAI System
Istanbul Nişantaşı University
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan-application-${applicationData?._id || 'summary'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getDecisionColor = () => {
    if (!applicationData?.decision) return 'text-gray-600';
    const decision = applicationData.decision.toLowerCase();
    if (decision === 'approved') return 'text-green-600';
    if (decision === 'rejected') return 'text-red-600';
    return 'text-yellow-600';
  };

  const getDecisionBgColor = () => {
    if (!applicationData?.decision) return 'bg-gray-100';
    const decision = applicationData.decision.toLowerCase();
    if (decision === 'approved') return 'bg-green-50';
    if (decision === 'rejected') return 'bg-red-50';
    return 'bg-yellow-50';
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col items-center justify-center gap-2">
        <LaptopMinimalCheck className="text-green-500 w-[100px] h-[100px]" />
        <h1 className="text-2xl font-bold text-center">
          Application Submitted Successfully
        </h1>
      </div>

      {/* Application Reference */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-3">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Application Reference Number</p>
          <p className="text-xl font-mono font-bold text-purple-600 break-all">
            {applicationData?._id || 'Processing...'}
          </p>
        </div>
        <div className="text-center text-sm text-gray-500">
          Submitted on {applicationData?.createdAt ? new Date(applicationData.createdAt).toLocaleDateString('tr-TR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : 'N/A'}
        </div>
      </div>

      {/* Decision Status */}
      {applicationData?.decision && (
        <div className={`${getDecisionBgColor()} border-2 ${applicationData.decision.toLowerCase() === 'approved' ? 'border-green-300' : applicationData.decision.toLowerCase() === 'rejected' ? 'border-red-300' : 'border-yellow-300'} rounded-lg p-6 space-y-3`}>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Decision Status</p>
            <p className={`text-3xl font-bold ${getDecisionColor()}`}>
              {applicationData.decision.toUpperCase()}
            </p>
            {applicationData.confidence && (
              <p className="text-sm text-gray-600 mt-2">
                Confidence: {applicationData.confidence}%
              </p>
            )}
          </div>
          
          {applicationData.reason && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Reason:</p>
              <p className="text-sm text-gray-600">{applicationData.reason}</p>
            </div>
          )}

          {applicationData.positive_factors && applicationData.positive_factors.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-green-700 mb-2">✓ Positive Factors:</p>
              <ul className="list-disc list-inside space-y-1">
                {applicationData.positive_factors.map((factor, idx) => (
                  <li key={idx} className="text-sm text-gray-600">{factor}</li>
                ))}
              </ul>
            </div>
          )}

          {applicationData.risk_factors && applicationData.risk_factors.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-red-700 mb-2">⚠ Risk Factors:</p>
              <ul className="list-disc list-inside space-y-1">
                {applicationData.risk_factors.map((factor, idx) => (
                  <li key={idx} className="text-sm text-gray-600">{factor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <p className="text-center text-gray-600">
        Your application has been submitted successfully. You will receive an
        email with updates on the status of your application.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Summary
        </button>
        
        <a
          href="/"
          className="flex-1 bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </a>
      </div>

      {/* Save Reference Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <p className="text-sm text-yellow-800 text-center">
          <strong>Important:</strong> Please save your reference number for tracking your application status.
        </p>
      </div>
    </div>
  );
};

export default ApplyPage;
