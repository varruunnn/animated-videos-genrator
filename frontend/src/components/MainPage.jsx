import React, { useState } from 'react';
import { generateAnimationFromPrompt } from '../api/generateAnimation.js';
import EditorComponent from './EditorComponent';
import AnimationDisplay from './AnimationDisplay.jsx';
import LoadingSpinner from './LoadingSpinner';

function MainPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">P5.js Animation Generator</h1>
          <p className="text-lg text-gray-600">Generate creative animations with AI using natural language</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-gray-700 font-medium mb-2">
              Describe the animation you want to create:
            </label>
            <textarea
              id="prompt"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Example: 2 boxes saying server and client with an arrow going between them"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-gray-700">Examples:</span>
            {samplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => useExamplePrompt(example)}
                className="text-sm bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-gray-800"
              >
                {example}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={generateAnimation}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate Animation'}
            </button>
          </div>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>

        {isLoading && (
          <div className="flex justify-center my-12">
            <LoadingSpinner />
          </div>
        )}

        {generatedCode && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                <h2 className="font-medium">Animation Preview</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadSketch}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download HTML
                  </button>
                </div>
              </div>
              <div className="p-4">
                <AnimationDisplay
                  code={generatedCode}
                />
              </div>
            </div>  
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-2">
                <h2 className="font-medium">Generated Code</h2>
              </div>
              <div className="p-4">
                <EditorComponent code={generatedCode} readOnly={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;