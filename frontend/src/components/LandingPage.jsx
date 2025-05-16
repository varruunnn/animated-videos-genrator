import React from 'react';

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black min-h-screen text-white font-sans">
      <nav className="flex justify-between items-center py-6 px-8 md:px-16">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-xl font-bold">A</span>
          </div>
          <span className="text-xl font-bold">Animated Video Genrator</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/login" className="hover:text-purple-300 transition-colors">Login</a>
          <a href="/signup" className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Sign Up Free
          </a>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center px-6 md:px-16 pt-16 md:pt-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Turn Text Into Stunning Animations
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Our AI transforms your words into beautiful p5.js animations in seconds. No coding required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a href="/signup" className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-full text-base font-medium transition-colors">
            Get Started For Free
          </a>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-purple-500 cursor-pointer hover:bg-purple-900 px-8 py-3 rounded-full text-base font-medium transition-colors"
          >
            See Features
          </button>
        </div>
        <div className="relative w-full max-w-5xl mx-auto mb-16">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-30 rounded-xl"></div>
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 border border-purple-700 rounded-xl p-1 bg-opacity-40">
            <div className="w-[50%] relative left-[50%] translate-x-[-50%] h-64 md:h-96 bg-black bg-opacity-60 rounded-lg flex items-center justify-center">
              <video
                src="/bouncing-balls-preview.webm"
                alt="Bouncing Balls Preview"
                autoPlay
                muted
                loop
                className="rounded-md object-cover max-h-full"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full text-sm">
            "Bouncing balls that change color when they collide"
          </div>
        </div>
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-20">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl border border-purple-700 bg-opacity-40">
            <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">✍️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Simple Text Prompts</h3>
            <p className="text-gray-300">Describe your vision in words and watch it come to life in seconds</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl border border-purple-700 bg-opacity-40">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Generation</h3>
            <p className="text-gray-300">Advanced AI creates beautiful animations without any wait time</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl border border-purple-700 bg-opacity-40">
            <div className="bg-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">💾</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Export</h3>
            <p className="text-gray-300">Download and share your creations anywhere with one click</p>
          </div>
        </div>
      </div>
    </div>
  );
}