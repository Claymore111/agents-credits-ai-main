import React, { useState, useEffect } from "react";
import {
  Download,
  Filter,
  RotateCcw,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  GraduationCap,
  Calendar,
  Mail,
  MoreVertical,
  Eye,
  Edit,
  Plus,
  ArrowUpDown,
  DollarSign,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../components/ui/drawer.jsx";
import ApplicantDetails from "../components/applicant-details.jsx";
import axios from "axios";

export default function Applicants() {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [applicants, setApplicants] = useState([]);

  const [filteredItems, setFilteredItems] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 5,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const query = new URLSearchParams();
        if (filteredItems.search) {
          query.append("search", filteredItems.search);
        }
        if (filteredItems.status) {
          query.append("status", filteredItems.status);
        }
        if (filteredItems.startDate) {
          query.append("startDate", filteredItems.startDate);
        }
        if (filteredItems.endDate) {
          query.append("endDate", filteredItems.endDate);
        }
        query.append("limit", pagination.limit);
        query.append("page", pagination.page);
        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/api/applications?${query.toString()}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setApplicants(data.applications);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [
    pagination.page,
    filteredItems.search,
    filteredItems.status,
    pagination.limit,
    filteredItems.startDate,
    filteredItems.endDate,
  ]);



  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Education Level",
      "Study Domain",
      "Registration Date",
    ];
    const rows = applicants.map((applicant) => [
      `${applicant.firstName} ${applicant.lastName}`,
      applicant.email,
      applicant.status,
      applicant.confidence,
      new Date(applicant.createdAt).toLocaleDateString(),
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      const formattedRow = row.map((field) => `"${field}"`).join(",");
      csvContent += formattedRow + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "applicants_list.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getBadgeStatusColor = (type) => {
    const status = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
      "Needs Manual Review": "bg-orange-100 text-orange-800",
    };
    return status[type] || "bg-gray-100 text-gray-800";
  };

  const getBadgeConfidenceColor = (confidence) => {
    if (confidence >= 0 && confidence <= 40) {
      return "bg-red-100 text-red-800";
    } else if (confidence > 40 && confidence <= 70) {
      return "bg-yellow-100 text-yellow-800";
    } else if (confidence > 70 && confidence <= 100) {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log("search");
    
    // Update the input immediately for visual feedback
    setFilteredItems({ ...filteredItems, search: searchValue });
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout for the actual search/API call
    const newTimeout = setTimeout(() => {
      // This will trigger the useEffect for API call
      console.log("Executing search for:", searchValue);
    }, 500);
    setSearchTimeout(newTimeout);
  };

  return (
    <>
      <Drawer
        open={showSidePanel}
        onOpenChange={setShowSidePanel}
        direction="right"
      >
        <DrawerContent className="bg-white p-4 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Applicants Details</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription>
            <ApplicantDetails applicantId={selectedApplicantId} />
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
      <div className="px-2 mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Applicants Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track applicants across all programs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-2 text-sm py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="search"
              className="text-md text-gray-900 font-semibold"
            >
              Search
            </label>
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applicants by name or email..."
                className="w-full pl-8 pr-5 text-sm py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filteredItems.search}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="text-md text-gray-900 font-semibold"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="w-full p-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filteredItems.status}
              onChange={(e) =>
                setFilteredItems({ ...filteredItems, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Needs Manual Review">Needs Manual Review</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="startDate"
              className="text-md text-gray-900 font-semibold"
            >
              Start Date
            </label>
            <input
              value={filteredItems.startDate}
              placeholder="Start Date"
              onChange={(e) =>
                setFilteredItems({ ...filteredItems, startDate: e.target.value })
              }
              type="date"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="endDate"
              className="text-md text-gray-900 font-semibold"
            >
              End Date
            </label>
            <input
              value={filteredItems.endDate}
              placeholder="End Date"
              onChange={(e) =>
                setFilteredItems({ ...filteredItems, endDate: e.target.value })
              }
              type="date"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("firstName")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                    >
                      Applicant
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("email")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                    >
                      Email
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("requested_amount")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                    >
                      Requested Amount
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("niveau")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                    >
                      Status
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                    >
                      Created At
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="h-32">
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="text-red-500 text-sm">{error}</div>
                    </td>
                  </tr>
                ) : applicants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="text-gray-500 text-sm">
                        No applicants found
                      </div>
                    </td>
                  </tr>
                ) : (
                  applicants.map((applicant) => (
                    <tr
                      key={applicant.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer hover:bg-blue-50 z-10"
                      onClick={() => {
                        setShowSidePanel(!showSidePanel);
                        setSelectedApplicantId(applicant._id);
                      }}
                    >
                      <td className="px-6 py-4 cursor-pointer whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                            {getInitials(
                              applicant.clientId?.firstName,
                              applicant.clientId?.lastName
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 ">
                              {applicant.clientId?.firstName}{" "}
                              {applicant.clientId?.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 cursor-pointer">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {applicant.clientId?.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 cursor-pointer">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {applicant.requested_amount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 cursor-pointer">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium line-clamp-1 text-ellipsis ${getBadgeStatusColor(
                            applicant.decision
                          )}`}
                        >
                          <span className="line-clamp-1 text-ellipsis">
                            {applicant.decision}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 cursor-pointer">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeConfidenceColor(
                            Math.round(applicant.confidence * 100)
                          )}`}
                        >
                          {Math.round(applicant.confidence * 100)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 cursor-pointer">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {formatDate(applicant.createdAt)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              Showing{" "}
              {selectedApplicants.length > 0
                ? `${selectedApplicants.length} selected of `
                : ""}
              {applicants.length} applicant{applicants.length !== 1 ? "s" : ""}
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={pagination.page === 1}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-1">
                {Array.from(
                  { length: Math.min(pagination.totalPages, 5) },
                  (_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() =>
                          setPagination((prev) => ({ ...prev, page }))
                        }
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pagination.page === page
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
