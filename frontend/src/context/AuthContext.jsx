import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);

    const login = (jwt) => {
        localStorage.setItem('token', jwt);
        setToken(jwt);
    }
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    }
    return (
        <AuthContext.Provider value={{ token, login, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext);
}