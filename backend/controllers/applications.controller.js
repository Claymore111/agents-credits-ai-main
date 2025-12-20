import Application from "../models/applications.js";
import Client from "../models/clients.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export const createApplication = async (req, res) => {
  try {
    const {
      monthly_income,
      employment_type,
      employment_duration,
      requested_amount,
      duration,
      purpose,
      credit_history,
      existing_debts,
      motivation,
      category,
    } = req.body;
    const { id: userId } = req.user;
    const application = await Application.create({
      clientId: userId,
      monthly_income,
      employment_type,
      employment_duration,
      requested_amount,
      duration,
      purpose,
      credit_history,
      existing_debts,
      motivation,
      category,
    });

    const response = await axios.post(
      `${process.env.AGENTS_API_URL}/api/evaluate-credit`,
      {
        monthly_income: application.monthly_income,
        employment_type: application.employment_type,
        employment_duration: application.employment_duration,
        requested_amount: application.requested_amount,
        duration: application.duration,
        purpose: application.purpose,
        credit_history: application.credit_history,
        existing_debts: application.existing_debts,
        motivation: application.motivation,
        category: application.category,
      }
    );

    const data = response.data;
    const updatedApplication = await Application.findByIdAndUpdate(
      application._id,
      {
        $set: {
          confidence: data.confidence,
          decision: data.decision,
          positive_factors: data.positive_factors || [],
          reason: data.reason || "",
          risk_factors: data.risk_factors || [],
          is_scammer: Boolean(data.user_verification),
        },
      },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      message: "Application created successfully",
      updatedApplication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getClientApplications = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const search = req.query.search || null;
    const status = req.query.status || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const query = {};
    let applicantsIds = [];

    if (search) {
      applicantsIds = await Client.find({
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }).select("_id");
      
      console.log(`Search term: "${search}"`);
      console.log(`Found ${applicantsIds.length} clients matching search term`);
      
      // If no clients found with the search term, return empty results
      if (applicantsIds.length === 0) {
        return res.status(200).json({
          message: "No applications found for the search term",
          applications: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: page > 1,
          },
        });
      }
      
      query.clientId = { $in: applicantsIds.map((applicant) => applicant._id) };
    }

    if (status) {
      query.decision = status;
    }

    if (startDate && !endDate ) {
      query.createdAt = { $gte: new Date(startDate) };
    }

    if (endDate && !startDate) {
      query.createdAt = { $lte: new Date(endDate) };
    }

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const totalApplications = await Application.countDocuments(query);
    const applications = await Application.find({
      ...query,
    })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 })
      .populate("clientId");
      

    const totalPages = Math.ceil(totalApplications / limit);

    const pagination = {
      page,
      limit,
      total: totalApplications,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
      pagination,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId).populate("clientId");
    res.status(200).json({ application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};