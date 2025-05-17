import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateName, updatePassword } from '../api/profile.js';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [msg, setMsg] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const nav = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    nav('/login');
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token);
        setUser(profileData);
        setName(profileData.name || '');
      } catch (error) {
        setMsg('Failed to load profile');
      }
    };
    fetchProfile();
  }, [token, nav]);

  const handleSaveName = async () => {
    setMsg('');
    try {
      const updatedUser = await updateName(token, name);
      setUser(updatedUser.user);
      setMsg('Name updated successfully');
    } catch (error) {
      setMsg('Update failed');
    }
  };

  const handleChangePassword = async () => {
    setMsg('');
    if (!currentPwd || !newPwd) {
      setMsg('Please fill in all password fields');
      return;
    }
    try {
      await updatePassword(token, currentPwd, newPwd);
      setMsg('Password changed successfully');
      setCurrentPwd('');
      setNewPwd('');
    } catch (error) {
      setMsg(error.message || 'Password change failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    nav('/login');
  };

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black min-h-screen text-white font-sans flex items-center justify-center">
        <div className="p-8 rounded-xl bg-purple-900 bg-opacity-50 border border-purple-700 shadow-lg">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center animate-pulse">
              <span className="text-xl font-bold">A</span>
            </div>
          </div>
          <p className="text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black min-h-screen text-white font-sans">
      <nav className="flex justify-between items-center py-6 px-8 md:px-16">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-xl font-bold">A</span>
          </div>
          <span className="text-xl font-bold">Animated Video Generator</span>
        </div>
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLogout}
            className="hover:text-purple-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl border border-purple-700 bg-opacity-40 mb-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4 p-1">
                  <img
                    src={user.avatar || "https://api.dicebear.com/6.x/initials/svg?seed=" + (user.name || user.email)}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://api.dicebear.com/6.x/initials/svg?seed=" + (user.name || user.email);
                    }}
                  />
                </div>
                <h2 className="text-xl font-bold">{user.name || 'User'}</h2>
                <p className="text-purple-300">{user.email}</p>
              </div>
              
              <div className="flex flex-col gap-2 mb-4">
                <button 
                  onClick={() => setActiveSection('profile')}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === 'profile' 
                      ? 'bg-purple-600 text-white' 
                      : 'hover:bg-purple-800 text-gray-300'
                  }`}
                >
                  Profile Details
                </button>
                <button 
                  onClick={() => setActiveSection('security')}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === 'security' 
                      ? 'bg-purple-600 text-white' 
                      : 'hover:bg-purple-800 text-gray-300'
                  }`}
                >
                  Security
                </button>
              </div>
              
              <div className="mt-auto pt-4 border-t border-purple-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Available Tokens</span>
                  <span className="text-lg font-bold text-purple-300">{user.tokens}</span>
                </div>
                <div className="mt-2">
                  <div className="h-2 w-full bg-purple-900 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" 
                      style={{ width: `${Math.min(100, (user.tokens / 100) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Buy More Tokens
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            {activeSection === 'profile' && (
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl border border-purple-700 bg-opacity-40">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  Profile Details
                </h3>
                <div className="mb-6">
                  <label className="block text-purple-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-indigo-900 bg-opacity-50 border border-purple-700 px-4 py-3 rounded-lg text-white"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-purple-300 mb-2">Email</label>
                  <input
                    type="text"
                    className="w-full bg-indigo-900 bg-opacity-50 border border-purple-700 px-4 py-3 rounded-lg text-white"
                    value={user.email}
                    disabled
                  />
                  <p className="mt-1 text-xs text-purple-400">Email cannot be changed</p>
                </div>
                <button
                  onClick={handleSaveName}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl border border-purple-700 bg-opacity-40">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  Security Settings
                </h3>
                <div className="mb-6">
                  <label className="block text-purple-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full bg-indigo-900 bg-opacity-50 border border-purple-700 px-4 py-3 rounded-lg text-white"
                    value={currentPwd}
                    onChange={e => setCurrentPwd(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-purple-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-indigo-900 bg-opacity-50 border border-purple-700 px-4 py-3 rounded-lg text-white"
                    value={newPwd}
                    onChange={e => setNewPwd(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Update Password
                </button>
              </div>
            )}

            {msg && (
              <div className={`mt-4 p-4 rounded-lg ${msg.includes('failed') ? 'bg-red-900 bg-opacity-50 border border-red-700' : 'bg-green-900 bg-opacity-50 border border-green-700'}`}>
                {msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}