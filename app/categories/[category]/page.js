'use client'
import Navbar from '@/app/components/Navbar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import SingleCategorySkeleton from '@/app/components/SingleCategorySkeleton';

const Category = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pathName = usePathname();
    const [category, categoryName] = pathName.slice(1).split('/');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
                setBlogs(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [categoryName]);

    if (loading) {
        return <SingleCategorySkeleton />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedBlogs = blogs.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <ProtectedRoute>
            <main className='px-2 pb-2 pt-20 relative min-h-[80vh]'>
                <Navbar />
                <div className='h-fit w-full max-w-[900px] mx-auto flex items-center gap-1 text-gray-600 font-medium border-b-2 border-yellow-500 pb-2'>
                    <Link href='/' className='text-yellow-500'><AiFillHome /></Link>
                    <FaAngleRight />
                    <Link href='/categories' className='text-sm underline decoration-yellow-500'>Categories</Link>
                    <FaAngleRight />
                    <p className='text-sm underline decoration-yellow-500'>{categoryName}</p>
                </div>
                <div className='h-fit w-full max-w-[900px] mx-auto p-2 grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {displayedBlogs.length > 0 ? displayedBlogs.map((blog) => (
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
                    )) : (
                        <div className='h-32 w-full bg-gray-700 flex flex-col gap-5 items-center justify-center rounded-lg col-span-1 md:col-span-2'>
                            <p className='text-white capitalize'>No Blogs Available in this category ☹️</p>
                            <Link href='/new-blog' className='h-10 w-44 bg-white text-gray-700 flex items-center justify-center rounded-lg hover:bg-gray-100'>Write a new blog</Link>
                        </div>
                    )}
                </div>
                {/* Pagination Controls */}
                <div className='flex justify-between items-center mt-5 max-w-[900px] mx-auto'>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-sm bg-gray-200 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
                    >
                        Previous
                    </button>
                    <p className='text-sm'>Page {currentPage} of {totalPages}</p>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-sm bg-gray-200 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
                    >
                        Next
                    </button>
                </div>
            </main>
        </ProtectedRoute>
    );
};

export default Category;
