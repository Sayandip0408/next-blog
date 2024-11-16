'use client';

import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
    const { accessToken } = useAuth();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !accessToken) {
            router.push('/log-in');
        }
    }, [accessToken, isMounted, router]);

    if (!isMounted || !accessToken) {
        return <p>Loading...</p>;
    }

    return children;
}
