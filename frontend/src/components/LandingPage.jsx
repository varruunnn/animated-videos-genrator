import React, { useState, useRef } from 'react';

const LandingPage = () => {

  const features = [
    {
      title: "AI-Powered Animation Generation",
      description: "Transform your ideas into beautiful P5.js animations with a simple text prompt",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Interactive Preview",
      description: "See your animations in real-time before downloading",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Downloadable HTML",
      description: "Save your animations as standalone HTML files for easy sharing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )
    },
    {
      title: "Code Access",
      description: "View and modify the generated P5.js code to customize your animations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Video Export",
      description: "Download your animations as video files for presentations or social media",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Example Library",
      description: "Get inspired with our collection of animation examples",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="relative bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              P5.js Animation Generator
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              Create stunning animations with AI in seconds. Just describe what you want to see, and we'll generate the P5.js code instantly.
            </p>
            <div className="mt-10 flex space-x-4">
              <a href="#features" className="inline-block bg-white py-3 px-6 rounded-md font-medium text-blue-600 hover:bg-blue-50 transition duration-300 shadow-md">
                Explore Features
              </a>
              <a href="/generate-video" className="inline-block bg-blue-900 py-3 px-6 rounded-md font-medium text-white hover:bg-blue-800 transition duration-300 shadow-md">
                Start Creating
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="w-full h-full bg-pattern-dots"></div>
        </div>
      </header>
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything You Need to Create Stunning Animations</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tool makes it easy to create beautiful P5.js animations without writing a single line of code.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;