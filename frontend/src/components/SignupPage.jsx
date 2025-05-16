import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signupUser } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await signupUser(email, password);
      login(token);
      navigate('/genrate-video');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black min-h-screen text-white font-sans flex flex-col items-center justify-center px-4">
      <div className="flex items-center space-x-2 mb-12">
        <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
          <span className="text-2xl font-bold">A</span>
        </div>
        <span className="text-2xl font-bold">Animato</span>
      </div>
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl border border-purple-500 p-8 shadow-2xl">
        <h2 className="text-center text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                className="bg-gray-800 text-white w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                type="email"
                placeholder="your@email.com"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                className="bg-gray-800 text-white w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                type="password"
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required 
              />
            </div>
            <p className="text-sm text-gray-400 mt-1">At least 8 characters with numbers and symbols</p>
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                className="bg-gray-800 text-white w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                type="password"
                placeholder="••••••••"
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
          </div>
          
          {error && <div className="bg-red-900/60 border border-red-500 text-white px-4 py-2 rounded-lg">{error}</div>}
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}