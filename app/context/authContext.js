'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
    const [refreshToken, setRefreshToken] = useState(Cookies.get('refreshToken'));
    const [accessTokenExpiresAt, setAccessTokenExpiresAt] = useState(Cookies.get('accessTokenExpiresAt'));
    const router = useRouter();

    const login = async (newAccessToken, newRefreshToken, expiresInMinutes = 15) => {
        const expirationTime = new Date(new Date().getTime() + expiresInMinutes * 60000);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setAccessTokenExpiresAt(expirationTime);

        Cookies.set('accessToken', newAccessToken, { expires: expiresInMinutes / (24 * 60) });
        Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
        Cookies.set('accessTokenExpiresAt', expirationTime);

        router.push('/');
    };

    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`/api/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
    
            const data = await response.json();
            const newAccessToken = data.accessToken;
            const newExpirationTime = new Date(new Date().getTime() + 15 * 60000);
    
            setAccessToken(newAccessToken);
            setAccessTokenExpiresAt(newExpirationTime);
    
            Cookies.set('accessToken', newAccessToken, { expires: 0.0104 });
            Cookies.set('accessTokenExpiresAt', newExpirationTime);
        } catch (err) {
            logout();
        }
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setAccessTokenExpiresAt(null);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('accessTokenExpiresAt');
        router.push('/log-in');
    };

    useEffect(() => {
        if (accessToken && accessTokenExpiresAt) {
            const timeUntilExpiration = new Date(accessTokenExpiresAt) - new Date();

            const timeoutId = setTimeout(() => {
                refreshAccessToken();
            }, timeUntilExpiration - 60000);

            return () => clearTimeout(timeoutId);
        }
    }, [accessToken, accessTokenExpiresAt]);

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
