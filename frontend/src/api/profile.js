const API_BASE = import.meta.env.VITE_API_BASE;

export const getProfile = async () => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
};

export const updateName = async (name) => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    throw new Error("Failed to update name");
  }
  return res.json();
};

export const updatePassword = async (currentPassword, newPassword) => {
  const res = await fetch(`${API_BASE}/api/profile/password`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update password");
  }
};
