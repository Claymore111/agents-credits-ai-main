import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Brain,
  Clock,
  Target,
} from "lucide-react";
import axios from "axios";
export default function ApplicantDetails({ applicantId }) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/applications/${applicantId}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setApplication(data.application);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching application:", error);
      }
    };
    fetchApplication();
  }, [applicantId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No application data available</p>
      </div>
    );
  }

  const getDecisionColor = (decision) => {
    switch (decision?.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "needs manual review":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getDecisionIcon = (decision) => {
    switch (decision?.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {application.clientId?.firstName} {application.clientId?.lastName}
            </h1>
            <p className="text-gray-500 mt-1">
              Application ID: {application._id}
            </p>
          </div>
          <div
            className={`flex items-center gap-2 ${getDecisionColor(
              application.decision
            )}`}
          >
            {getDecisionIcon(application.decision)}
            <span className="text-xl font-semibold">
              {application.decision}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-sm">
         
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Email:</span>
              </div>

              <p className="font-medium text-gray-900">
                {application.clientId?.email}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Phone:</span>
              </div>

              <p className="font-medium text-gray-900">
                {application.clientId?.phone}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Location:</span>
              </div>

              <p className="font-medium text-gray-900">
                {application.clientId?.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">CIN:</span>
              <p className="font-medium text-gray-900">
                {application.clientId?.cin}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Zip Code:</span>
              <p className="font-medium text-gray-900">
                {application.clientId?.zipCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Loan Application
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm mb-6">
          <div>
            <span className="text-gray-500">Monthly Income:</span>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(application.monthly_income)}
            </p>
          </div>

          <div>
            <span className="text-gray-500">Requested Amount:</span>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(application.requested_amount)}
            </p>
          </div>

          <div>
            <span className="text-gray-500">Duration:</span>
            <p className="text-lg font-bold text-gray-900">
              {application.duration} months
            </p>
          </div>

          <div>
            <span className="text-gray-500">Employment:</span>
            <p className="font-medium text-gray-900">
              {application.employment_type}
            </p>
            <p className="text-xs text-gray-500">
              {application.employment_duration}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <span className="text-gray-500 font-medium">Purpose:</span>
            <p className="text-gray-900 mt-1">{application.purpose}</p>
          </div>

          <div>
            <span className="text-gray-500 font-medium">Existing Debts:</span>
            <p className="text-gray-900 mt-1">{application.existing_debts}</p>
          </div>
        </div>
      </div>

      {/* Credit & Motivation */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              Credit History
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {application.credit_history}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              Motivation
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {application.motivation}
            </p>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI Decision Analysis
        </h2>

        {/* Key Metrics */}
        <div className="flex items-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(application.confidence * 100) || 0}%
            </div>
            <p className="text-xs text-gray-500">Confidence</p>
          </div>

          <div className="text-center">
            <div
              className={`text-2xl font-bold ${getDecisionColor(
                application.decision
              )}`}
            >
              {application.decision}
            </div>
            <p className="text-xs text-gray-500">Decision</p>
          </div>

          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                application.is_scammer ? "text-red-600" : "text-green-600"
              }`}
            >
              {application.is_scammer ? "RISK" : "SAFE"}
            </div>
            <p className="text-xs text-gray-500">Fraud Check</p>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Reasoning:</h4>
          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded">
            {application.reason}
          </p>
        </div>

        {/* Factors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Positive Factors
            </h4>
            <div className="space-y-2">
              {application.positive_factors?.map((factor, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Risk Factors
            </h4>
            <div className="space-y-2">
              {application.risk_factors?.map((factor, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
        <div className="flex gap-8 text-sm">
          <div>
            <span className="text-gray-500">Created:</span>
            <p className="font-medium text-gray-900">
              {formatDate(application.createdAt)}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Updated:</span>
            <p className="font-medium text-gray-900">
              {formatDate(application.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
