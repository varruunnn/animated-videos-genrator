import React, { useState, useEffect } from 'react';
import { Play, Code, Download, Sparkles, ArrowRight, Github, Star } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react"
import { href, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description: "Transform natural language prompts into dynamic p5.js animations using advanced AI"
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Live Preview",
      description: "See your animations come to life instantly with real-time code execution"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code Output",
      description: "Get well-structured, readable p5.js code that you can understand and modify"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Ready",
      description: "Download your animations as standalone HTML files or as video ready to share or deploy"
    }
  ];

  const examples = [
    "Bouncing balls that change color when they collide",
    "Spiral galaxy with rotating stars and nebula effects",
    "Interactive particle system that follows the mouse",
    "Geometric patterns morphing with sine wave mathematics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Analytics />
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{
            left: mousePosition.x * 0.01 + '%',
            top: mousePosition.y * 0.01 + '%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AnimateAI
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#examples" className="hover:text-purple-300 transition-colors">Examples</a>
          <a href="#features" className="hover:text-purple-300 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-purple-300 transition-colors">How It Works</a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm text-gray-300">
            <a className='cursor-pointer' href="https://github.com/varruunnn/animated-videos-genrator">
              <Github className="w-4 h-4" />
            </a>
          </div>
          <Link
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            to={user ? '/generate-video' : '/signup'}>
            {user ? 'Generate Video' : 'Sign Up'}


            <span>Try It Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Design Your{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Perfect
              </span>
              <br />
              p5.js Animation
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform natural language into stunning interactive animations.
              No coding experience required – just describe your vision and watch it come to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href={localStorage.getItem('token') ? '/genrate-video' : '/signup'}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-2xl"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="examples" className="relative z-10 px-6 lg:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                      See AI Magic in
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Action</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                      Watch real examples created by our AI. From simple prompts to stunning animations.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {examples.map((example, index) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] group"
                      >
                        {/* Prompt Header */}
                        <div className="p-6 pb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm text-purple-300 font-medium mb-1">Prompt</p>
                              <p className="text-white font-medium leading-relaxed">"{example}"</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-6 pb-6">
                          <div className="relative bg-black/30 rounded-xl overflow-hidden aspect-video border border-gray-700/50">
                            <video
                              className="w-full h-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                              poster={`/api/placeholder/400/225`}
                            >
                              <source src={`./example${index + 1}.mp4`} type="video/mp4" />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-3 animate-pulse"></div>
                                  <p className="text-gray-300 text-sm">Animation Preview</p>
                                  <p className="text-gray-500 text-xs mt-1">Video loading...</p>
                                </div>
                              </div>
                            </video>

                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Creative Minds</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to bring your animation ideas to life, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 hover:bg-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="how-it-works" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Creating stunning animations has never been easier. Just three simple steps.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { step: "01", title: "Describe", desc: "Type your animation idea in plain English" },
              { step: "02", title: "Generate", desc: "AI transforms your words into p5.js code" },
              { step: "03", title: "Download", desc: "Export your animation as a standalone file" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Create Something
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Amazing?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already using AI to bring their animation ideas to life.
            </p>
            <a
              href={localStorage.getItem('token') ? '/genrate-video' : '/signup'}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span>Start Creating Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
