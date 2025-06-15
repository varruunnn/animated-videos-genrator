import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, signupUser, fetchMe, logoutUser } from '../api/auth.js';

const AuthContext = createContext({
    user: null,
    login: async () => { },
    logout: async () => { },
    loading: true,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const me = await fetchMe();
            setUser(me);
            setLoading(false);
        })();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        await loginUser(email, password);
        const me = await fetchMe();
        setUser(me);
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        await logoutUser();
        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
