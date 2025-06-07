// src/components/SupervisorNavbar.jsx
// ENHANCED MODERN NAVBAR FOR SUPERVISOR SYSTEM
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import NotificationBadge from "./NotificationBadge";

const SupervisorNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl border-b-4 border-purple-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Left Side - Enhanced Brand & Dashboard Link */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                <span className="text-2xl font-bold">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Futsal Control Center
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-xs text-purple-200 font-medium">Supervisor System</p>
                  <div className="w-1 h-1 bg-purple-300 rounded-full"></div>
                  <p className="text-xs text-purple-300">
                    {currentTime.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Dashboard Quick Access */}
            <div className="hidden md:flex items-center space-x-2 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
              <button
                onClick={() => navigate('/staff')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-white/20 to-white/10 text-white font-medium text-sm hover:from-white/30 hover:to-white/20 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <span className="text-lg">🎯</span>
                <span>Control Dashboard</span>
              </button>
            </div>
          </div>

          {/* Right Side - Enhanced User Menu & Notifications */}
          <div className="flex items-center space-x-6">
            {/* Enhanced Notifications */}
            <div className="relative">
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
                <NotificationBadge />
              </div>
            </div>

            {/* Enhanced System Status Indicator */}
            <div className="hidden md:flex items-center space-x-3 bg-green-500/20 px-4 py-2 rounded-xl backdrop-blur-sm border border-green-400/30">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              <div>
                <span className="text-xs text-green-200 font-medium">System Status</span>
                <p className="text-xs text-green-100">All Systems Operational</p>
              </div>
            </div>

            {/* Enhanced User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-4 bg-white/10 hover:bg-white/20 rounded-xl px-5 py-3 transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/30">
                  <span className="text-lg font-bold">👤</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-white">{user?.name || "Supervisor"}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-purple-200 font-medium">System Administrator</span>
                    <div className="w-1 h-1 bg-purple-300 rounded-full"></div>
                    <span className="text-xs text-green-300 font-medium">Online</span>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 text-purple-200 ${showUserMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Enhanced User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 backdrop-blur-sm">
                  {/* User Info Header */}
                  <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-lg font-bold text-white">👤</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-full">
                            Supervisor Sistem
                          </span>
                          <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                            Online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-3">
                    <button
                      onClick={() => {
                        navigate('/staff');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-purple-50 flex items-center space-x-3 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span>🎯</span>
                      </div>
                      <div>
                        <p className="font-medium">Control Dashboard</p>
                        <p className="text-xs text-gray-500">Akses dashboard utama</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        // Navigate to profile settings if available
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span>⚙️</span>
                      </div>
                      <div>
                        <p className="font-medium">Pengaturan Profil</p>
                        <p className="text-xs text-gray-500">Kelola akun dan preferensi</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        // Navigate to system settings
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 flex items-center space-x-3 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span>🔧</span>
                      </div>
                      <div>
                        <p className="font-medium">System Settings</p>
                        <p className="text-xs text-gray-500">Konfigurasi sistem</p>
                      </div>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <span>🚪</span>
                      </div>
                      <div>
                        <p className="font-medium">Logout</p>
                        <p className="text-xs text-red-500">Keluar dari sistem</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border Gradient */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>
    </nav>
  );
};

export default SupervisorNavbar;
