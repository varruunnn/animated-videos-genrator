import React, { useState, useRef } from 'react';
import { Link, useNavigate ,Navigate } from 'react-router-dom';
import { generateAnimationFromPrompt } from '../api/generateAnimation.js';
import AnimationDisplay from './AnimationDisplay.jsx';
import { Code, Download, Play, Copy, Edit3, Sparkles, ArrowRight, User } from 'lucide-react';

function MainPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        const stream = canvas.captureStream(30);
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
    "Bouncing balls that change color when they collide",
    "A particle system that reacts to mouse movement",
    "A colorful mandala that slowly rotates",
    "Spiral galaxy with rotating stars and nebula effects",
    "Geometric patterns morphing with sine wave mathematics"
  ];

  const useExamplePrompt = (example) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
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
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span 
          onClick={()=>{
            navigate('/')
          }}
          className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AnimateAI
          </span>
        </div>

        <Link to="/profile" className="group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
        </Link>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">AI-Powered Animation Studio</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Transform Ideas into{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Stunning Animations
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Describe your vision and watch AI bring it to life with beautiful p5.js animations
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-lg font-semibold text-gray-200 mb-4">
              Describe your animation:
            </label>
            <textarea
              id="prompt"
              className="w-full px-6 py-4 bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 text-lg resize-none"
              rows="4"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Example: Create a mesmerizing spiral of colorful particles that dance around the center, leaving glowing trails as they move..."
            />
          </div>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Try these examples:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {samplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => useExamplePrompt(example)}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-purple-400/50 rounded-full px-4 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={generateAnimation}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl flex items-center space-x-2 mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                  <span>Creating Magic...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Generate Animation</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-400/30 backdrop-blur-sm text-red-300 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {generatedCode && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Animation Preview */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-black/20 px-6 py-4 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-lg">Animation Preview</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative group">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-40 bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 py-2 z-10 hidden group-hover:block shadow-2xl">
                      <button
                        onClick={downloadSketch}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors"
                      >
                        Download HTML
                      </button>
                      <button
                        onClick={() => captureFrames('video')}
                        disabled={isExporting}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/10 disabled:text-gray-500 transition-colors"
                      >
                        Export Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 relative">
                <div className="bg-black/30 rounded-xl overflow-hidden">
                  <AnimationDisplay
                    code={generatedCode}
                    ref={animationRef}
                  />
                </div>
                {isExporting && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center">
                      <div className="w-8 h-8 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-purple-300 font-medium">Recording animation...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Code Display */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-black/20 px-6 py-4 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-lg">Generated Code</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedCode)}
                    className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-black/30 rounded-xl p-4 font-mono text-sm text-gray-300 overflow-auto max-h-96">
                  <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!generatedCode && !isLoading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-200 mb-4">Ready to Create Magic?</h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
              Enter a detailed description above to generate your first AI-powered animation
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                <div className="text-sm text-gray-400">Unlimited possibilities</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">⚡</div>
                <div className="text-sm text-gray-400">Instant generation</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">🎨</div>
                <div className="text-sm text-gray-400">Creative freedom</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;