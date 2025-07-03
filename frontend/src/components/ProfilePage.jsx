import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateName, updatePassword } from "../api/profile.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfilePage() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useAuth();
  const [showTokenPurchase, setShowTokenPurchase] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const nav = useNavigate();


  useEffect(() => {
    if (user == null) {
      nav('/login')
    }
  }, [user, nav]);

  const tokenPackages = [
    { id: 1, tokens: 10, price: 50, popular: false, discount: null },
    { id: 2, tokens: 20, price: 100, popular: true, discount: null },
    { id: 3, tokens: 50, price: 150, popular: false, discount: "70% OFF" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
        setName(profileData.name || "")
      } catch {
        setMsg('Failed to load profile');
      }
    })();
  }, []);

  const handleSaveName = async () => {
    setMsg("");
    setIsLoading(true);
    try {
      const updatedProfile = await updateName(name);
      setProfile(updatedProfile);      
      setName(updatedProfile.name || "");
      setMsgType("success");
      setMsg("Name updated successfully");
      window.location.reload();
    } catch (error) {
      setMsgType("error");
      setMsg("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setMsg("");
    if (!currentPwd || !newPwd) {
      setMsg("Please fill in all password fields");
      return;
    }
    setIsLoading(true);
    try {
      await updatePassword(currentPwd, newPwd);
      setMsgType("success");
      setMsg("Password changed successfully");
      setCurrentPwd("");
      setNewPwd("");
    } catch (error) {
      setMsgType("error");
      setMsg(error.message || "Password change failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout()
  };

  const handleBuyTokens = () => {
    setShowTokenPurchase(true);
    setActiveSection("tokens");
  };

  const handlePurchasePackage = (packageData) => {
    setSelectedPackage(packageData);
    setMsg(
      `Initiating purchase of ${packageData.tokens} tokens for ₹${packageData.price}`
    );
  };

  const handleClosePurchase = () => {
    setShowTokenPurchase(false);
    setSelectedPackage(null);
    setActiveSection("profile");
  };

  if (!profile) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white font-sans flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 shadow-2xl animate-slideInUp">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-3xl font-bold">A</span>
            </div>
          </div>
          <p className="text-xl text-center">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center py-6 px-8 md:px-16">
        <div className="flex items-center space-x-4 group">
          <div className="relative">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-2xl font-bold">A</span>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Animated Video Generator
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {showTokenPurchase && (
            <button
              onClick={handleClosePurchase}
              className="group relative bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gray-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="group relative bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Logout
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 animate-slideInUp">
              <div className="flex flex-col items-center mb-8">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center mb-4 p-1 shadow-2xl">
                  <img
                    src={
                      profile.avatar ||
                      "https://api.dicebear.com/6.x/initials/svg?seed=" +
                      (profile.name || profile.email)
                    }
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://api.dicebear.com/6.x/initials/svg?seed=" +
                        (profile.name || profile.email);
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  {profile.name || "profile"}
                </h2>
                <p className="text-blue-300 text-lg">{profile.email}</p>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                <button
                  onClick={() => {
                    setActiveSection("profile");
                    setShowTokenPurchase(false);
                  }}
                  className={`group relative text-left px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] font-semibold ${activeSection === "profile"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 hover:text-white border border-gray-600/50 hover:border-blue-500"
                    }`}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile Details
                  </span>
                </button>
                <button
                  onClick={() => {
                    setActiveSection("security");
                    setShowTokenPurchase(false);
                  }}
                  className={`group relative text-left px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] font-semibold ${activeSection === "security"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 hover:text-white border border-gray-600/50 hover:border-blue-500"
                    }`}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Security
                  </span>
                </button>
                <button
                  onClick={handleBuyTokens}
                  className={`group relative text-left px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] font-semibold ${activeSection === "tokens"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                    : "bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 hover:text-white border border-gray-600/50 hover:border-green-500"
                    }`}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    Buy Tokens
                  </span>
                </button>
              </div>

              <div className="pt-6 border-t border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 font-semibold">
                    Available Tokens
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {profile.tokens}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="h-3 w-full bg-gray-800/50 rounded-full border border-gray-600/50">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full transition-all duration-500 shadow-lg"
                      style={{
                        width: `${Math.min(100, (profile.tokens / 100) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            {activeSection === "tokens" && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 animate-slideInUp">
                <div className="text-center mb-10">
                  <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                    Buy Tokens
                  </h3>
                  <p className="text-gray-400 text-lg">
                    Choose the perfect token package for your needs
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {tokenPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative group ${pkg.popular ? "transform scale-105" : ""
                        }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-0 right-0 flex justify-center">
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-1 rounded-full text-sm animate-pulse">
                            MOST POPULAR
                          </span>
                        </div>
                      )}
                      {pkg.discount && (
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 rounded-full text-xs transform rotate-12 animate-bounce">
                          {pkg.discount}
                        </div>
                      )}
                      <div
                        className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border transition-all duration-300 p-8 h-full flex flex-col justify-between group-hover:shadow-2xl ${pkg.popular
                          ? "border-yellow-500/50 shadow-yellow-500/20"
                          : "border-white/20 hover:border-blue-500/50 hover:shadow-blue-500/20"
                          }`}
                      >
                        <div className="text-center mb-6">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${pkg.popular
                              ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                              : "bg-gradient-to-br from-blue-500 to-cyan-500"
                              }`}
                          >
                            <svg
                              className="w-8 h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2">
                            {pkg.tokens} Tokens
                          </h4>
                          <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                            ₹{pkg.price}
                          </div>
                          <p className="text-gray-400">
                            ₹{(pkg.price / pkg.tokens).toFixed(1)} per token
                          </p>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-gray-300">
                            <svg
                              className="w-5 h-5 text-green-400 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Generate {pkg.tokens} videos
                          </div>
                          <div className="flex items-center text-gray-300">
                            <svg
                              className="w-5 h-5 text-green-400 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            High quality output
                          </div>
                          <div className="flex items-center text-gray-300">
                            <svg
                              className="w-5 h-5 text-green-400 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            No expiry
                          </div>
                          {pkg.discount && (
                            <div className="flex items-center text-yellow-400 font-semibold">
                              <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                />
                              </svg>
                              Best Value Deal
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handlePurchasePackage(pkg)}
                          className={`group relative w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl overflow-hidden ${pkg.popular
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black hover:shadow-yellow-500/25"
                            : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white hover:shadow-blue-500/25"
                            }`}
                        >
                          <span className="relative z-10 flex items-center justify-center text-lg">
                            Purchase Now
                            <svg
                              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${pkg.popular
                              ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                              : "bg-gradient-to-r from-cyan-600 to-purple-600"
                              }`}
                          ></div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Secure Payment
                    </h4>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Your payment is processed securely through our encrypted
                    payment gateway. We accept all major payment methods
                    including UPI, credit cards, and digital wallets.
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-sm text-gray-400">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      SSL Encrypted
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Instant Delivery
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      24/7 Support
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "profile" && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 animate-slideInUp">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  Profile Details
                </h3>
                {msg && (
                  <p
                    className={`mb-4 ${msgType === "success" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {msg}
                  </p>
                )}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <button
                  onClick={handleSaveName}
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                    }`}
                >
                  {isLoading ? "Saving..." : "Save Name"}
                </button>
              </div>
            )}

            {activeSection === "security" && (
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 animate-slideInUp">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  Security Settings
                </h3>
                {msg && <p className="text-red-400 mb-4">{msg}</p>}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    className="w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                    }`}
                >
                  {isLoading ? "Changing..." : "Change Password"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
