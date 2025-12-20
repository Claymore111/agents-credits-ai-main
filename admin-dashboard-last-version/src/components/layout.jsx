import { useState } from "react";
import { ChevronDown, Search, Bell, Users, Home, HelpCircle, LogOut, Menu, X, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth-slice";

function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentAdmin);
  console.log(user);
  const location = useLocation();
  const pathname = location.pathname;
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
    {
      id: "applicants",
      label: "Applicants",
      icon: Users,
      path: "/applicants",
      badge: "12",
    },
  ];

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 antialiased">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-out shadow-sm`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div
            className={`flex items-center space-x-3 ${
              isCollapsed ? "hidden" : "flex"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm">
                ElectroPay
              </h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4 text-gray-600" />
            ) : (
              <X className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link to={item.path} key={item.id}>
                <button
                  key={item.id}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isCollapsed ? "mx-auto" : "mr-3"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full font-medium bg-blue-100 text-blue-700">
                          New
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* Help Section */}
        {!isCollapsed && (
          <div className="px-3 py-4 border-t border-gray-100">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <HelpCircle className="w-4 h-4 mr-3" />
              Help & Support
            </button>
          </div>
        )}

        {/* User Profile */}
        <div className="p-3 border-t border-gray-100">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium">
                  {user.firstName.charAt(0)}
                </div>
                {!isCollapsed && (
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* User Dropdown */}
            {showUserMenu && !isCollapsed && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                <button
                  type="button"
                  onClick={(e) => handleLogout(e)}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {navigationItems.find((item) => item.id === activeItem)?.label}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-500">Live</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const LayoutContent = () => {
  return (
    <div className="p-6">
      {/* Content based on active item
      <div className="max-w-7xl mx-auto">
        {activeItem === "dashboard" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {currentUser.firstName}
              </h2>
              <p className="text-gray-600">
                Here's what's happening with your ElectroPay admin portal today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">1,248</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 text-sm font-medium">
                    +12%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    from last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">$45,231</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 text-sm font-medium">
                    +8%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    from last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Active Sessions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">892</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 text-sm font-medium">
                    +5%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    from last hour
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">98.2%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-green-600 text-sm font-medium">
                    +0.1%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    from yesterday
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      action: "New student registration",
                      user: "Alice Johnson",
                      time: "2 minutes ago",
                      type: "success",
                    },
                    {
                      action: "Payment processed",
                      user: "Bob Smith",
                      time: "5 minutes ago",
                      type: "info",
                    },
                    {
                      action: "Account verification completed",
                      user: "Carol Davis",
                      time: "12 minutes ago",
                      type: "success",
                    },
                    {
                      action: "Login attempt failed",
                      user: "Dave Wilson",
                      time: "18 minutes ago",
                      type: "warning",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "success"
                            ? "bg-green-400"
                            : activity.type === "warning"
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeItem === "students" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Students Management
              </h2>
              <p className="text-gray-600">
                Manage student accounts and view their activity.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Students Content
              </h3>
              <p className="text-gray-600">
                This would contain the students management interface.
              </p>
            </div>
          </div>
        )}

        {activeItem !== "dashboard" && activeItem !== "students" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                {activeItem}
              </h2>
              <p className="text-gray-600">
                This is the {activeItem} section of your admin portal.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                {React.createElement(
                  navigationItems.find((item) => item.id === activeItem)
                    ?.icon || Home,
                  {
                    className: "w-6 h-6 text-gray-400",
                  }
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                {activeItem} Content
              </h3>
              <p className="text-gray-600">
                This section is ready for your {activeItem} content
                implementation.
              </p>
            </div>
          </div>
        )}
      </div>
       */}
    </div>
  );
};

export default Layout;
