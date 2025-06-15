const API_BASE = import.meta.env.VITE_API_BASE;
export async function generateAnimationFromPrompt(prompt) {
  const response = await fetch(`${API_BASE}/api/generate-animation`, {
    method: 'POST',
    credentials:'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate animation');
  }

  const data = await response.json();
  let cleanCode = data.code;
  if (cleanCode.startsWith('```javascript') || cleanCode.startsWith('```js')) {
    cleanCode = cleanCode.replace(/```(javascript|js)?\n/, '').replace(/```$/, '');
  }
  try {
    new Function(cleanCode);
  } catch (error) {
    console.error('Syntax error in generated code:', error);
    throw new Error(`Generated code has syntax errors: ${error.message}`);
  }

  return cleanCode;
}
export function safelyExecuteP5Code(codeString, targetElementId) {
  try {
    const scriptElement = document.createElement('script');
    const wrappedCode = `
      (function() {
        new p5(function(p) {
          // Define setup and draw in p5 instance mode
          ${codeString}
          
          // Ensure setup and draw are defined
          if (typeof setup === 'function') {
            p.setup = setup;
          } else {
            p.setup = function() {
              p.createCanvas(400, 400);
            };
          }
          
          if (typeof draw === 'function') {
            p.draw = draw;
          } else {
            p.draw = function() {
              p.background(220);
            };
          }
        }, '${targetElementId}');
      })();
    `;
    
    scriptElement.textContent = wrappedCode;
    document.body.appendChild(scriptElement);
    
    return true;
  } catch (error) {
    console.error('Error executing p5 code:', error);
    return false;
  }
}
