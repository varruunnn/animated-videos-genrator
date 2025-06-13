import React from 'react';
import { Analytics } from '@vercel/analytics/react';

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen text-white font-sans overflow-hidden">
      <Analytics />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <nav className="relative z-10 flex justify-between items-center py-6 px-8 md:px-16 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-2xl">
        <div className="flex items-center space-x-4 group">
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
              <span className="text-xl font-bold">A</span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Animated Video Generator
          </span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="/login" className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg group">
            Login
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/signup" className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </nav>
      
      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-16 pt-20 md:pt-32 text-center">
        <div className="mb-8 animate-fadeIn">
          <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            <span className="mr-2 text-yellow-300 animate-pulse">✨</span>
            AI-Powered Animation Platform
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-12 leading-tight">
          <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-gray-100 bg-clip-text text-transparent animate-slideInUp">
            Transform Text Into
          </span>
          <br />
          <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-slideInUp" style={{animationDelay: '0.2s'}}>
            Stunning Animations
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mb-16 leading-relaxed animate-slideInUp" style={{animationDelay: '0.4s'}}>
          Leverage cutting-edge AI to transform your creative ideas into breathtaking p5.js animations instantly. 
          <span className="text-blue-300 font-semibold"> Professional-grade results</span> with zero coding experience required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-24 animate-slideInUp" style={{animationDelay: '0.6s'}}>
          <a href="/signup" className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 overflow-hidden">
            <span className="relative z-10 flex items-center">
              Start Creating Free
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="group border-2 border-gray-500 hover:border-blue-400 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <span className="flex items-center">
              Explore Features
              <svg className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto mb-32 animate-slideInUp" style={{animationDelay: '0.8s'}}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 rounded-3xl z-10"></div>
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
            <div className="w-full max-w-5xl mx-auto h-80 md:h-[600px] bg-gradient-to-br from-gray-900 via-blue-900/20 to-black rounded-2xl flex items-center justify-center shadow-inner border border-gray-600/50 overflow-hidden">
              <video
                src="/bouncing-balls-preview.webm"
                alt="Bouncing Balls Preview"
                autoPlay
                muted
                loop
                className="rounded-xl object-cover max-h-full shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="absolute z-20 -bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 via-blue-800 to-gray-800 backdrop-blur-sm border border-blue-400/30 px-10 py-4 rounded-full text-sm font-medium shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            <span className="text-blue-200">"Bouncing balls that change color when they collide"</span>
          </div>
        </div>
        
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl mb-32">
          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:-translate-y-4 shadow-2xl hover:shadow-blue-500/20 animate-slideInUp" style={{animationDelay: '1s'}}>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-3xl">✍️</span>
            </div>
            <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-blue-100 transition-colors duration-300">Natural Language Input</h3>
            <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Simply describe your animation concept in plain English and watch our advanced AI interpret and create exactly what you envision with stunning precision.</p>
          </div>
          
          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:-translate-y-4 shadow-2xl hover:shadow-cyan-500/20 animate-slideInUp" style={{animationDelay: '1.2s'}}>
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-cyan-100 transition-colors duration-300">Lightning Fast Processing</h3>
            <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Enterprise-grade AI infrastructure powered by cutting-edge technology delivers professional-quality animations in seconds, not hours.</p>
          </div>
          
          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:-translate-y-4 shadow-2xl hover:shadow-purple-500/20 animate-slideInUp" style={{animationDelay: '1.4s'}}>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-3xl">💾</span>
            </div>
            <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-purple-100 transition-colors duration-300">Seamless Export</h3>
            <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Download in multiple high-quality formats or share directly to your favorite platforms with intelligent one-click integration.</p>
          </div>
        </div>
        
        <div className="w-full max-w-5xl mx-auto bg-gradient-to-r from-white/10 via-blue-500/10 to-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-16 text-center shadow-2xl mb-20 hover:shadow-blue-500/20 transition-all duration-500 animate-slideInUp" style={{animationDelay: '1.6s'}}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-gray-300 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who are already using AI to bring their wildest ideas to life. 
            <span className="text-blue-300 font-semibold"> Start your creative journey today.</span>
          </p>
          <a href="/signup" className="group inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-16 py-5 rounded-xl text-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 overflow-hidden">
            <span className="relative z-10 flex items-center">
              Get Started Today
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}