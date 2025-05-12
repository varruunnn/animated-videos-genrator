export async function generateAnimationFromPrompt(prompt) {
  const response = await fetch('http://localhost:3001/api/generate-animation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate animation');
  }

  const data = await response.json();
  let cleanCode = data.code;
  if (cleanCode.startsWith('```javascript') || cleanCode.startsWith('```js')) {
    cleanCode = cleanCode.replace(/```(javascript|js)?\n/, '').replace(/```$/, '');
  }

  return cleanCode;
}
