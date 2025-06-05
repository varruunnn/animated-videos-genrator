import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { generateAnimationFromPrompt } from '../api/generateAnimation.js';
import AnimationDisplay from './AnimationDisplay.jsx';


function MainPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const animationRef = useRef(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const generateAnimation = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const cleanCode = await generateAnimationFromPrompt(prompt);
      setGeneratedCode(cleanCode);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to generate animation');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSketch = () => {
    if (!generatedCode) return;
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>P5.js Animation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
    </style>
</head>
<body>
    <script>
${generatedCode}
    </script>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'p5js-animation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const captureFrames = async (format) => {
    if (!generatedCode) {
      setError('No animation code generated yet');
      return;
    }

    if (!animationRef.current) {
      setError('Animation reference is not available');
      return;
    }

    setIsExporting(true);
    setError('');

    try {
      const p5Instance = animationRef.current.getP5Instance();
      if (!p5Instance) {
        throw new Error('P5 instance not available. Please try regenerating the animation.');
      }
      if (format === 'gif') {
        await loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/ccapture.js/1.1.0/CCapture.all.min.js');
        const capturer = new window.CCapture({
          format: 'gif',
          workersPath: 'https://cdn.jsdelivr.net/gh/spite/ccapture.js/src/', 
          framerate: 30,
          quality: 90,
          verbose: true
        });
        const originalDraw = p5Instance.draw;
        let frameCount = 0;
        const totalFrames = 90; 
        p5Instance.draw = function () {
          if (frameCount === 0) {
            capturer.start();
          }
          if (originalDraw) originalDraw();

          if (frameCount < totalFrames) {
            capturer.capture(p5Instance.canvas);
            frameCount++;
          } else if (frameCount === totalFrames) {
            capturer.stop();
            capturer.save((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'p5js-animation.gif';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              p5Instance.draw = originalDraw;
              setIsExporting(false);
            });
            frameCount++;
          }
        };
      } else if (format === 'video') {
        const canvas = p5Instance.canvas;
        const stream = canvas.captureStream(30); // 30 FPS
        const mimeTypes = [
          'video/webm;codecs=vp9',
          'video/webm;codecs=vp8',
          'video/webm'
        ];
        const supportedType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) || 'video/webm';
        const recorder = new MediaRecorder(stream, { mimeType: supportedType });

        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: supportedType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'p5js-animation.webm';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setIsExporting(false);
        };

        recorder.start();
        setTimeout(() => recorder.stop(), 5000);
      }
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export animation: ' + (err.message || 'Unknown error'));
      setIsExporting(false);
    }
  };
  const loadExternalScript = (url) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const samplePrompts = [
    "2 boxes saying server and client with an arrow going between them",
    "A particle system that reacts to mouse movement",
    "A colorful mandala that slowly rotates",
    "Bouncing balls that change color when they collide",
    "A simple weather visualization with rain and sunshine"
  ];

  const useExamplePrompt = (example) => {
    setPrompt(example);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen text-white font-sans overflow-hidden">
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
          <button className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg group">
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg group">
            Tutorials
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg group">
            Settings
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </button>
          <Link to="/profile" className="group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110 overflow-hidden">
              <img className='rounded-xl w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2uLl8zBoK0_iM5pNwJAC8hQ2f68YKtlgc7Q&s" alt="Profile" />
            </div>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-6 md:px-16">
        <div className="text-center mb-16 animate-slideInUp">
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              <span className="mr-2 text-yellow-300 animate-pulse">✨</span>
              AI-Powered Animation Studio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Create Stunning
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Animations
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Transform your creative ideas into breathtaking p5.js animations instantly with our advanced AI technology.
          </p>
        </div>
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 mb-16 group animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <label htmlFor="prompt" className="block text-gray-200 font-semibold text-lg mb-4">
                Describe your dream animation:
              </label>
              <textarea
                id="prompt"
                className="w-full px-6 py-4 bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 text-lg resize-none shadow-inner"
                rows="4"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Example: Cosmic particles flowing through space, connecting to form brilliant constellations that pulse with rainbow colors..."
              />
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-300 flex items-center">
                  <span className="mr-2">💡</span>
                  Quick inspirations:
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {samplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => useExamplePrompt(example)}
                    className="group relative bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-400/30 hover:border-blue-400/50 rounded-full px-5 py-2 text-gray-200 hover:text-white transition-all duration-300 text-sm font-medium backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                  >
                    <span className="relative z-10">{example}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={generateAnimation}
                disabled={isLoading}
                className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {isLoading ? (
                    <>
                      <div className="mr-3 h-6 w-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                      Creating Magic...
                    </>
                  ) : (
                    <>
                      Generate Animation
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {error && (
              <div className="mt-6 bg-gradient-to-r from-red-900/40 to-pink-900/40 border border-red-400/50 backdrop-blur-sm text-white rounded-2xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>


        {generatedCode && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-indigo-900/80 rounded-xl border border-purple-700/50 overflow-hidden shadow-lg">
              <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center border-b border-purple-700/50">
                <h2 className="font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Animation Preview
                </h2>
                <div className="flex space-x-2">
                  <div className="relative group">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-1 w-32 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                      <button
                        onClick={downloadSketch}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                      >
                        HTML
                      </button>
                      <button
                        onClick={() => captureFrames('video')}
                        disabled={isExporting}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 disabled:text-gray-500"
                      >
                        Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 relative">
                <AnimationDisplay
                  code={generatedCode}
                  ref={animationRef}
                />
                {isExporting && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg z-10">
                    <div className="text-center">
                      <div className="mb-3 h-8 w-8 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin mx-auto"></div>
                      <p className="text-purple-300">Recording animation...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-indigo-900/80 rounded-xl border border-purple-700/50 overflow-hidden shadow-lg">
              <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center border-b border-purple-700/50">
                <h2 className="font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Generated Code
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                    }}
                    className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-1 rounded-full transition-colors"
                  >
                    Copy
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-1 rounded-full transition-colors">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-1">
                <div className="bg-gray-900 font-mono text-gray-300 text-sm p-4 rounded-lg w-full h-64 md:h-80 overflow-auto">
                  <pre>{generatedCode}</pre>
                </div>
              </div>
            </div>
          </div>
        )}
        {!generatedCode && !isLoading && (
          <div className="flex flex-col items-center justify-center mt-12 mb-20">
            <div className="bg-purple-600/20 rounded-full p-6 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Let's create something amazing</h3>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Enter a prompt above to generate your first animation. Be as descriptive as possible for the best results.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl">
              <div className="bg-purple-900/30 border border-purple-700/30 p-3 rounded-lg text-center">
                <span className="block text-purple-400 text-lg font-bold mb-1">100+</span>
                <span className="text-sm text-gray-400">Animation types</span>
              </div>
              <div className="bg-purple-900/30 border border-purple-700/30 p-3 rounded-lg text-center">
                <span className="block text-purple-400 text-lg font-bold mb-1">10sec</span>
                <span className="text-sm text-gray-400">Average generation</span>
              </div>
              <div className="bg-purple-900/30 border border-purple-700/30 p-3 rounded-lg text-center">
                <span className="block text-purple-400 text-lg font-bold mb-1">1-click</span>
                <span className="text-sm text-gray-400">Export options</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;