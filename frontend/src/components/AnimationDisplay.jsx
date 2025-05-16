import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const AnimationDisplay = forwardRef(({ code }, ref) => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const iframeRef = useRef(null);
  const p5InstanceRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getP5Instance: () => {
      if (iframeRef.current) {
        return iframeRef.current.contentWindow.p5Instance;
      }
      return null;
    }
  }));

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
            // Modify the code to store the p5 instance globally
            let p5Instance = null;
            ${code.replace(
              /new p5\((.*?)\);/g, 
              'p5Instance = new p5($1); window.p5Instance = p5Instance;'
            )}
            
            // If p5Instance is still null, it means the code doesn't explicitly create a new p5 instance
            // In this case, p5.js will create one automatically when it sees setup/draw functions
            if (!p5Instance && (window.setup || window.draw)) {
              // Create a global p5 instance
              p5Instance = new p5();
              window.p5Instance = p5Instance;
            }
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
});

export default AnimationDisplay;