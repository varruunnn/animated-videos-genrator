import React, { useState, useRef, useEffect } from 'react';

const AnimationDisplay = ({ code }) => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!code || !containerRef.current) return;
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = 'none';
    iframeRef.current = iframe;
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(iframe);
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>P5.js Animation</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
          </style>
        </head>
        <body>
          <script>
            ${code}
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
    return () => {
      if (iframeRef.current && containerRef.current) {
        containerRef.current.removeChild(iframeRef.current);
        iframeRef.current = null;
      }
    };
  }, [code]);

  return <div ref={containerRef} className="w-full h-96"></div>;
};

export default AnimationDisplay;