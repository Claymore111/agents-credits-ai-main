import Application from "../models/applications.js";




export const getStats = async (req, res) => {
  try {
    // Get all applications
    const applications = await Application.find({}).populate('clientId', 'firstName lastName email');

    // Total applications count
    const totalApplications = applications.length;

    // Status distribution
    const statusDistribution = applications.reduce((acc, app) => {
      acc[app.decision] = (acc[app.decision] || 0) + 1;
      return acc;
    }, {});

    const statusStats = Object.entries(statusDistribution).map(([status, count]) => ({
      name: status,
      value: count,
      percentage: ((count / totalApplications) * 100).toFixed(1)
    }));

    // Category distribution with amounts
    const categoryStats = applications.reduce((acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = { count: 0, totalAmount: 0 };
      }
      acc[app.category].count += 1;
      acc[app.category].totalAmount += app.requested_amount;
      return acc;
    }, {});

    const categoryDistribution = Object.entries(categoryStats).map(([category, data]) => ({
      name: category,
      value: data.count,
      amount: data.totalAmount,
      fill: getCategoryColor(category)
    }));

    // Daily applications for the last 14 days
    const now = new Date();
    const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
    
    const dailyStats = {};
    
    // Initialize last 14 days
    for (let i = 0; i <= 14; i++) {
      const date = new Date(fourteenDaysAgo.getTime() + (i * 24 * 60 * 60 * 1000));
      const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      dailyStats[dateStr] = {
        date: dateStr,
        Approved: 0,
        "Needs Manual Review": 0,
        Rejected: 0,
        Pending: 0,
        total: 0
      };
    }

    // Count applications by day and status
    applications.forEach(app => {
      const appDate = new Date(app.createdAt);
      if (appDate >= fourteenDaysAgo) {
        const dateStr = appDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        if (dailyStats[dateStr]) {
          dailyStats[dateStr][app.decision] += 1;
          dailyStats[dateStr].total += 1;
        }
      }
    });

    const dailyApplications = Object.values(dailyStats);

    // Card stats
    const cards = [
      {
        title: "Total Applications",
        value: totalApplications,
        color: "blue",
      },
      {
        title: "Approved",
        value: statusDistribution.Approved || 0,
        color: "green",
      },
      {
        title: "Pending",
        value: statusDistribution.Pending || 0,
        color: "purple",
      },
      {
        title: "Rejected",
        value: statusDistribution.Rejected || 0,
        color: "red",
      },
    ];

    // Average confidence score
    const avgConfidence = applications.reduce((sum, app) => sum + app.confidence, 0) / totalApplications;

    // Total requested amount
    const totalRequestedAmount = applications.reduce((sum, app) => sum + app.requested_amount, 0);

    // Scammer detection stats
    const scammerCount = applications.filter(app => app.is_scammer).length;

    const stats = {
      totalApplications,
      statusDistribution: statusStats,
      productCategories: categoryDistribution,
      dailyApplications,
      cards,
      analytics: {
        averageConfidence: avgConfidence.toFixed(1),
        totalRequestedAmount,
        scammerDetected: scammerCount,
        scammerPercentage: ((scammerCount / totalApplications) * 100).toFixed(1)
      },
      recentApplications: applications
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
        .map(app => ({
          id: app._id,
          clientName: `${app.clientId?.firstName || ''} ${app.clientId?.lastName || ''}`.trim(),
          category: app.category,
          requestedAmount: app.requested_amount,
          decision: app.decision,
          confidence: app.confidence,
          createdAt: app.createdAt
        }))
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

// Helper function to assign colors to categories
function getCategoryColor(category) {
  const colors = {
    "Smartphones": "#6366F1",
    "TVs & Audio": "#8B5CF6", 
    "Laptops": "#EC4899",
    "Home Appliances": "#06B6D4",
    "Gaming": "#10B981",
    "Other": "#F59E0B"
  };
  return colors[category] || "#6B7280";
}