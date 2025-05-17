const API_BASE = 'https://animated-videos-genrator-production.up.railway.app';

export const getProfile = async (token) => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json();
};


export const updateName = async (token, name) => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  if (!res.ok) {
    throw new Error('Failed to update name'); 
  }
  return res.json();
};

export const updatePassword = async (token, currentPassword, newPassword) => {
  const res = await fetch(`${API_BASE}/api/profile/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  if (!res.ok) {
    const errorData = await res.json(); 
    throw new Error(errorData.error || 'Failed to update password'); 
  }
};