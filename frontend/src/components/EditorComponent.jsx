import React, { useState, useRef, useEffect } from 'react';

const EditorComponent = ({ code }) => {
  const preRef = useRef(null);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.innerHTML = highlightSyntax(code);
    }
  }, [code]);
  const highlightSyntax = (code) => {
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escapedCode
      .replace(/\b(function|let|const|var|if|else|for|while|return|new|this)\b/g, '<span style="color: #569CD6;">$1</span>')
      .replace(/(["'])(.*?)\1/g, '<span style="color: #CE9178;">$1$2$1</span>')
      .replace(/\b(\d+)\b/g, '<span style="color: #B5CEA8;">$1</span>')
      .replace(/(\/\/.*)/g, '<span style="color: #6A9955;">$1</span>')
      .replace(/(\w+)(\s*\()/g, '<span style="color: #DCDCAA;">$1</span>$2');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
      });
  };

  return (
    <div className="relative">
      <button 
        id="copyBtn"
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-800 text-white text-xs px-2 py-1 rounded"
      >
        Copy
      </button>
      <div className="overflow-auto max-h-96 bg-gray-900 text-white p-4 rounded">
        <pre ref={preRef} className="text-sm font-mono whitespace-pre-wrap"></pre>
      </div>
    </div>
  );
};

export default EditorComponent;