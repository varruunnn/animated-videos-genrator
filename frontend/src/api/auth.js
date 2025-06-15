//const API_BASE = 'https://animated-videos-genrator.onrender.com';
const API_BASE = import.meta.env.VITE_API_BASE;

export async function signupUser(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Signup failed");
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Login failed");
  return res.json();
}

export async function fetchMe() {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function logoutUser() {
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
