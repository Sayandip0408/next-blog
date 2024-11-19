'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import { FaAngleRight } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

const Category = () => {
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sanitizeCategoryName = (name) => {
        return name
            .trim()
            .replace(/\s+/g, '-');
    };

    useEffect(() => {
        const apiUrl = '/api/get-categories';

        const fetchBlogData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCategoryData(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ProtectedRoute>
            <main className='px-2 pb-2 pt-20 relative'>
                <Navbar />
                <div className='h-fit w-full max-w-[900px] mx-auto flex items-center gap-1 text-gray-600 font-medium border-b-2 border-yellow-500 pb-2'>
                    <Link href='/' className='text-yellow-500'><AiFillHome /></Link>
                    <FaAngleRight className='' />
                    <p className='text-sm underline decoration-yellow-500'>Categories</p>
                </div>
                <div className='h-fit w-full md:w-[70vw] lg:w-[60vw] max-w-[900px] mx-auto grid grid-cols-2 gap-5 mt-5'>
                    {
                        categoryData.map((category) => (
                            <Link href={`/categories/${sanitizeCategoryName(category.categoryName)}`} key={category._id} className='rounded-lg h-32 md:h-56 relative hover:brightness-75'>
                                <div className='h-full w-full flex items-center justify-center p-2'>
                                    <h2 className='text-white font-medium text-lg md:text-2xl text-center z-10'>{category.categoryName}</h2>
                                </div>
                                <Image src={category.imgUrl} height={500} width={700} alt={category._id} className='rounded-lg brightness-[0.4] h-full w-full absolute top-0 left-0 z-0' />
                            </Link>
                        ))
                    }
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default Category