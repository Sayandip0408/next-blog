'use client'
import Navbar from '@/app/components/Navbar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Blog = () => {
    const pathName = usePathname();
    const [categoryVal, blogId, blogTitle] = pathName.slice(1).split('/');
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `/api/get-single-blog?categoryVal=${categoryVal}&blogId=${blogId}&blogTitle=${blogTitle}`;

        const fetchBlogData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBlogData(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [categoryVal, blogId, blogTitle]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ProtectedRoute>
            <Navbar />
            <main>
                Blog
            </main>
        </ProtectedRoute>
    )
}

export default Blog