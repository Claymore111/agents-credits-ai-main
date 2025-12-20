import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  monthly_income: {
    type: Number,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Personal Loan",
      "Home Renovation",
      "Education",
      "Medical",
      "Business",
      "Vehicle",
      "Wedding",
      "Debt Consolidation",
      "Electronics",
      "Other"
    ],
    required: true,
  },
  employment_duration: {
    type: String,
    required: true,
  },
  requested_amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  credit_history: {
    type: String,
    required: true,
  },
  existing_debts: {
    type: String,
    required: true,
  },
  motivation: {
    type: String,
    required: true,
  },

  confidence: {
    type: Number,
    default: 0,
  },
  decision: {
    type: String,
    enum: ["Approved", "Needs Manual Review", "Rejected", "Pending"],
    default: "Pending",
  },
  positive_factors: {
    type: [String],
    default: [],
  },
  reason: {
    type: String,
    default: "",
  },
  risk_factors: {
    type: [String],
    default: [],
  },
  is_scammer: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
