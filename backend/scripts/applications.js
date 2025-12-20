import connectDB from "../db/connect-db.js";
import Application from "../models/applications.js";
import Client from "../models/clients.js";
import mongoose from "mongoose";

const createApplications = async () => {
  try {
    console.log("🚀 Starting application registration script...");

    await connectDB();
    await Application.deleteMany({});

    // Get all client IDs from the database
    console.log("📋 Fetching client IDs from database...");
    const clients = await Client.find({});
    const clientIds = clients.map((client) => client._id);
    
    if (clientIds.length === 0) {
      throw new Error("No clients found in database. Please run the users registration script first.");
    }
    
    console.log(`Found ${clientIds.length} clients in database`);
    
    // Show date range for applications
    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
    console.log(`📅 Applications will be distributed from ${twoWeeksAgo.toDateString()} to ${now.toDateString()}`);

    // Backup hardcoded client IDs (commented out)
    // const clientIds = [
    //   "68a30395efdbe599daa726a4",
    //   "68a30395efdbe599daa726a5",
    //   "68a30395efdbe599daa726a6",
    //   "68a30395efdbe599daa726a7",
    //   "68a30395efdbe599daa726a8",
    //   "68a30395efdbe599daa726a9",
    //   "68a30395efdbe599daa726aa",
    //   "68a30395efdbe599daa726ab",
    //   "68a30395efdbe599daa726ac",
    //   "68a30395efdbe599daa726ad",
    //   "68a30395efdbe599daa726ae",
    //   "68a30395efdbe599daa726af",
    //   "68a30395efdbe599daa726b0",
    //   "68a30395efdbe599daa726b1",
    //   "68a30395efdbe599daa726b2",
    //   "68a30395efdbe599daa726b3",
    //   "68a30395efdbe599daa726b4",
    //   "68a30395efdbe599daa726b5",
    //   "68a30395efdbe599daa726b6",
    //   "68a30395efdbe599daa726b7",
    //   "68a30395efdbe599daa726b8",
    //   "68a30395efdbe599daa726b9",
    //   "68a30395efdbe599daa726ba",
    //   "68a30395efdbe599daa726bb",
    //   "68a30395efdbe599daa726bc",
    //   "68a30395efdbe599daa726bd",
    //   "68a30395efdbe599daa726be",
    //   "68a30395efdbe599daa726bf",
    //   "68a30395efdbe599daa726c0",
    //   "68a30395efdbe599daa726c1",
    //   "68a30395efdbe599daa726c2",
    //   "68a30395efdbe599daa726c3",
    //   "68a30395efdbe599daa726c4",
    //   "68a30395efdbe599daa726c5",
    //   "68a30395efdbe599daa726c6",
    //   "68a30395efdbe599daa726c7",
    //   "68a30395efdbe599daa726c8",
    //   "68a30395efdbe599daa726c9",
    //   "68a30395efdbe599daa726ca",
    //   "68a30395efdbe599daa726cb",
    //   "68a30395efdbe599daa726cc",
    //   "68a30395efdbe599daa726cd",
    //   "68a30395efdbe599daa726ce",
    //   "68a30395efdbe599daa726cf",
    //   "68a30395efdbe599daa726d0",
    //   "68a30395efdbe599daa726d1",
    //   "68a30395efdbe599daa726d2",
    //   "68a30395efdbe599daa726d3",
    //   "68a30395efdbe599daa726d4",
    //   "68a30395efdbe599daa726d5",
    // ];

    // Categories
    const categories = [
      "Smartphones",
      "TVs & Audio",
      "Laptops",
      "Home Appliances",
      "Gaming",
      "Other",
    ];

    // Employment types
    const employmentTypes = [
      "Full-time",
      "Part-time",
      "Self-employed",
      "Unemployed",
      "Student",
    ];

    // Credit histories
    const creditHistories = ["Excellent", "Good", "Fair", "Poor", "No credit"];

    // Positive factors
    const positiveFactors = [
      "Stable income",
      "Good credit history",
      "Low existing debt",
      "Long employment duration",
      "Reasonable request amount",
      "Clear purpose",
    ];

    // Risk factors
    const riskFactors = [
      "High debt-to-income ratio",
      "Short employment history",
      "Unstable employment",
      "Large requested amount",
      "Vague purpose",
      "Poor credit history",
    ];

    // Decisions
    const decisions = [
      "Approved",
      "Needs Manual Review",
      "Rejected",
      "Pending",
    ];

    // Helper functions
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate random date within the last 2 weeks
    function getRandomDateInLastTwoWeeks() {
      const now = new Date();
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000); // 14 days ago
      const randomTime =
        twoWeeksAgo.getTime() +
        Math.random() * (now.getTime() - twoWeeksAgo.getTime());
      return new Date(randomTime);
    }

    function getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomElements(array, count) {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    function generateRequestedAmount(category) {
      const baseAmounts = {
        Smartphones: { min: 200, max: 1500 },
        "TVs & Audio": { min: 300, max: 5000 },
        Laptops: { min: 500, max: 3000 },
        "Home Appliances": { min: 200, max: 4000 },
        Gaming: { min: 300, max: 2500 },
        Other: { min: 100, max: 2000 },
      };
      const range = baseAmounts[category];
      return getRandomInt(range.min, range.max);
    }

    function generatePurpose(category) {
      const purposes = {
        Smartphones: ["Upgrade device", "Replace broken phone", "Gift"],
        "TVs & Audio": [
          "Home theater setup",
          "Upgrade living room",
          "New sound system",
        ],
        Laptops: ["Work computer", "School needs", "Gaming setup"],
        "Home Appliances": [
          "Kitchen renovation",
          "New washing machine",
          "Smart home devices",
        ],
        Gaming: ["Gaming console", "Gaming PC", "VR setup"],
        Other: ["General electronics", "Tech accessories", "Miscellaneous"],
      };
      return getRandomElement(purposes[category]);
    }

    // Generate 50 applications
    const applications = [];

    for (let i = 0; i < 50; i++) {
      const clientId = clientIds[i % clientIds.length];
      const category = getRandomElement(categories);
      const monthlyIncome = getRandomInt(500, 10000);
      const requestedAmount = generateRequestedAmount(category);
      const duration = getRandomInt(3, 36);
      const numPositiveFactors = getRandomInt(1, 3);
      const numRiskFactors = Math.random() > 0.3 ? getRandomInt(1, 2) : 0;
      
      // Generate random timestamp within last 2 weeks
      const randomDate = getRandomDateInLastTwoWeeks();

      const application = {
        clientId,
        monthly_income: monthlyIncome,
        employment_type: getRandomElement(employmentTypes),
        category,
        employment_duration: `${getRandomInt(1, 10)} years`,
        requested_amount: requestedAmount,
        duration,
        purpose: generatePurpose(category),
        credit_history: getRandomElement(creditHistories),
        existing_debts: getRandomElement(["None", "Low", "Moderate", "High"]),
        motivation: `I need this ${category.toLowerCase()} because ${
          [
            "it will help me with work",
            "my current one is broken",
            "I've been saving for this",
            "it's a gift for someone special",
          ][getRandomInt(0, 3)]
        }`,
        confidence: getRandomInt(10, 100) / 100,
        decision: getRandomElement(decisions),
        positive_factors: getRandomElements(
          positiveFactors,
          numPositiveFactors
        ),
        reason: [
          "Meets all criteria",
          "Income too low",
          "High risk profile",
          "Needs further verification",
        ][getRandomInt(0, 3)],
        risk_factors: getRandomElements(riskFactors, numRiskFactors),
        is_scammer: Math.random() < 0.1,
        createdAt: randomDate,
        updatedAt: randomDate,
      };

      applications.push(application);
    }

    const savedApplications = await Application.insertMany(applications);
    console.log(
      `${savedApplications.length} applications created successfully ✅`
    );
    console.log("First few applications created:");
    console.log(JSON.stringify(savedApplications.slice(0, 3), null, 2));

    // Close database connection
    await mongoose.connection.close();
    console.log("🔐 Database connection closed.");
  } catch (error) {
    console.error("Error creating applications:", error);
    process.exit(1);
  }
};

// Run the script
createApplications();
