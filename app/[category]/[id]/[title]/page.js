'use client'
import Navbar from '@/app/components/Navbar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import Image from 'next/image';
import Content from '@/app/components/Content';

const Blog = () => {
    const pathName = usePathname();
    const [categoryVal, blogId, blogTitle] = pathName.slice(1).split('/');
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return 'Today';
        }

        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const sanitizeCategoryName = (name) => {
        return name
            .trim()
            .replace(/\s+/g, '-');
    };

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
            <main className='p-2 relative'>
                <Navbar />
                <div className='pt-16 pb-10 h-fit w-full max-w-[900px] mx-auto'>
                    <div className='h-fit w-full flex items-center gap-1 text-gray-600 font-medium border-b-2 border-yellow-500 pb-2'>
                        <Link href='/' className='text-yellow-500'><AiFillHome /></Link>
                        <FaAngleRight className='' />
                        <Link href={`/categories/${sanitizeCategoryName(categoryVal)}`} className='text-sm underline decoration-yellow-500'>{categoryVal}</Link>
                        <FaAngleRight className='' />
                        <p className='line-clamp-1 text-sm underline decoration-yellow-500'>{blogTitle}</p>
                    </div>
                    <div className='h-fit w-full flex flex-col gap-2 md:gap-5 py-2 md:py-5'>
                        <h1 className='text-4xl font-bold text-gray-950'>{blogData.title}</h1>
                        <h3 className='text-gray-700 font-medium'>{blogData.synopsis}</h3>
                        <p className='text-gray-500 text-sm'>Published: {formatDate(blogData.createdAt)}</p>
                        <div className='h-fit w-full flex items-center gap-2'>
                            <div className='h-10 w-10 bg-gray-400 rounded-full'></div>
                            <h5 className='text-sm font-semibold text-gray-700'>{blogData.author}</h5>
                        </div>
                        <Image src={blogData.img_url} height={500} width={1000} alt='blog img' className='' />
                        <Content content={blogData.content} />
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default Blog