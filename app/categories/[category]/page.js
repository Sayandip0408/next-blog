'use client'
import Navbar from '@/app/components/Navbar'
import ProtectedRoute from '@/app/components/ProtectedRoute'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import CategorySkeleton from '@/app/components/CategorySkeleton';
import SingleCategorySkeleton from '@/app/components/SingleCategorySkeleton';

const Category = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pathName = usePathname();
    const [category, categoryName] = pathName.slice(1).split('/');

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

    const sanitizeTitle = (title) => {
        return title
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    };

    useEffect(() => {
        const apiUrl = `/api/get-blogs-by-category?categoryVal=${categoryName}`;

        const fetchBlogData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data.data);

                setBlogs(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, []);

    if (loading) {
        return <SingleCategorySkeleton />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ProtectedRoute>
            <main className='px-2 pb-2 pt-20 relative min-h-[80vh]'>
                <Navbar />
                <div className='h-fit w-full max-w-[900px] mx-auto flex items-center gap-1 text-gray-600 font-medium border-b-2 border-yellow-500 pb-2'>
                    <Link href='/' className='text-yellow-500'><AiFillHome /></Link>
                    <FaAngleRight className='' />
                    <Link href='/categories' className='text-sm underline decoration-yellow-500'>Categories</Link>
                    <FaAngleRight className='' />
                    <p className='text-sm underline decoration-yellow-500'>{categoryName}</p>
                </div>
                <div className='h-fit w-full max-w-[900px] mx-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {
                        blogs.map((blog) => (
                            <Link href={`/${categoryName}/${blog._id}/${sanitizeTitle(blog.title)}`} key={blog._id}>
                                <div className='h-fit w-full grid grid-cols-5 gap-2 hover:bg-gray-200 p-2'>
                                    <Image src={blog.img_url} height={500} width={500} alt={`${blog.img_title}`} className='h-full' />
                                    <div className='col-span-4 border-b p-2 flex flex-col gap-2'>
                                        <h3 className='line-clamp-1 text-xl font-semibold'>{blog.title}</h3>
                                        <p className='line-clamp-1 text-sm text-gray-600'>{blog.synopsis}</p>
                                        <p className='text-xs text-gray-800 font-semibold'>{blog.author} <span className='font-normal text-gray-400'>{formatDate(blog.createdAt)}</span></p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default Category