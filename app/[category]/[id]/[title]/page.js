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
import ContentSkeleton from '@/app/components/ContentSkeleton';
import Skeleton from '@/app/components/Skeleton';

const Blog = () => {
    const pathName = usePathname();
    const [categoryVal, blogId, blogTitle] = pathName.slice(1).split('/');
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [randomBlogs, setRandomBlogs] = useState([]);
    const [popularBlogs, setPopularBlogs] = useState([]);

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

    const sanitizeTitle = (title) => {
        return title
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/get-random-blogs?size=4');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const objResponse = await response.json();
                setRandomBlogs(objResponse.data);
            } catch (err) {
                console.error(err);
                setError('Unable to load blogs');
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/get-random-blogs?size=2');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const objResponse = await response.json();
                setPopularBlogs(objResponse.data);
            } catch (err) {
                console.error(err);
                setError('Unable to load blogs');
            }
        };

        fetchBlogs();
    }, []);

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
        return <ContentSkeleton />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ProtectedRoute>
            <main className='p-2 relative'>
                <Navbar />
                <div className='pt-16 pb-10 h-fit w-full max-w-[900px] mx-auto border-b-2 border-b-yellow-500'>
                    <div className='h-fit w-full flex items-center gap-1 text-gray-600 font-medium border-b-2 border-yellow-500 pb-2'>
                        <Link href='/' className='text-yellow-500'><AiFillHome /></Link>
                        <FaAngleRight className='' />
                        <Link href={`/categories/${sanitizeCategoryName(categoryVal)}`} className='text-sm underline decoration-yellow-500 line-clamp-1'>{categoryVal}</Link>
                        <FaAngleRight className='' />
                        <p className='line-clamp-1 text-sm underline decoration-yellow-500'>{blogTitle}</p>
                    </div>
                    <div className='h-fit w-full flex flex-col gap-2 md:gap-5 py-2 md:py-5'>
                        <h1 className='text-4xl font-bold text-gray-950'>{blogData.title}</h1>
                        <h3 className='text-gray-700 font-medium'>{blogData.synopsis}</h3>
                        <p className='text-gray-500 text-sm'>Published: {formatDate(blogData.createdAt)}</p>
                        <div className='h-fit w-full flex items-center gap-2'>
                            <Image src={blogData.profilePhoto} alt='profile photo' height={100} width={100} className='h-10 w-10 bg-gray-400 rounded-full' />
                            <h5 className='text-sm font-semibold text-gray-700'>{blogData.author}</h5>
                        </div>
                        <Image src={blogData.img_url} height={500} width={1000} alt='blog img' className='' />
                        <Content content={blogData.content} />
                    </div>
                </div>
                <section className='h-fit w-full rounded-lg grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='md:col-span-2 p-2 rounded-lg'>
                        <h3 className='font-semibold capitalize lg:text-lg'>~ must read</h3>
                        <div className='h-fit w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {
                                randomBlogs.length > 0 ? randomBlogs.map((blog) => (
                                    <Link key={blog._id} href={`/${sanitizeTitle(blog.category)}/${blog._id}/${sanitizeTitle(blog.title)}`} className='rounded-lg w-full h-24 lg:h-28 grid grid-cols-4 hover:bg-gray-100'>
                                        <Image src={blog.img_url} alt='blog_img' height={200} width={200} className='h-full rounded-l-lg col-span-1' />
                                        <div className='border rounded-r-lg col-span-3 h-full w-full flex flex-col justify-between px-1'>
                                            <h3 className='line-clamp-1 font-semibold'>{blog.title}</h3>
                                            <p className='line-clamp-1 text-sm font-medium'>{blog.synopsis}</p>
                                            <p className='line-clamp-1 text-sm font-medium text-gray-500'>{blog.author}</p>
                                            <p className='line-clamp-1 text-sm font-medium text-gray-500'>{formatDate(blog.createdAt)}</p>
                                        </div>
                                    </Link>
                                )) :
                                    [...Array(3)].map((_, index) => (
                                        <Skeleton key={index} className='rounded-lg w-full h-24 lg:h-28 grid grid-cols-4 hover:bg-gray-100' />
                                    ))
                            }
                        </div>
                    </div>
                    <div className='lg:col-span-1 p-2 rounded-lg'>
                        <h3 className='font-semibold capitalize lg:text-lg'>~ Most popular</h3>
                        <div className='h-fit w-full grid grid-cols-1 gap-5'>
                            {
                                popularBlogs.length > 0 ? popularBlogs.map((blog) => (
                                    <Link key={blog._id} href={`/${sanitizeTitle(blog.category)}/${blog._id}/${sanitizeTitle(blog.title)}`} className='rounded-lg w-full h-24 lg:h-28 grid grid-cols-4 hover:bg-gray-100'>
                                        <Image src={blog.img_url} alt='blog_img' height={200} width={200} className='h-full rounded-l-lg col-span-1' />
                                        <div className='border rounded-r-lg col-span-3 h-full w-full flex flex-col justify-between px-1'>
                                            <h3 className='line-clamp-1 font-semibold'>{blog.title}</h3>
                                            <p className='line-clamp-1 text-sm font-medium'>{blog.synopsis}</p>
                                            <p className='line-clamp-1 text-sm font-medium text-gray-500'>{blog.author}</p>
                                            <p className='line-clamp-1 text-sm font-medium text-gray-500'>{formatDate(blog.createdAt)}</p>
                                        </div>
                                    </Link>
                                )) :
                                    [...Array(3)].map((_, index) => (
                                        <Skeleton key={index} className='rounded-lg w-full h-24 lg:h-28 grid grid-cols-4 hover:bg-gray-100' />
                                    ))
                            }
                        </div>
                    </div>
                </section>
            </main>
        </ProtectedRoute>
    )
}

export default Blog