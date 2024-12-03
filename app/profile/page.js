'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/authContext'
import ProfileSkeleton from '../components/ProfileSkeleton'
import Skeleton from '../components/Skeleton'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import Link from 'next/link'

const Profile = () => {
    const { logout } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for the current page
    const blogsPerPage = 5; // Blogs per page

    // Calculate pagination details
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

    const sanitizeTitle = (title) => {
        return title.replace(/[^a-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return "Today";
        }

        if (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        ) {
            return "Yesterday";
        }

        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();

        const suffix =
            day === 1 || day === 21 || day === 31
                ? "st"
                : day === 2 || day === 22
                    ? "nd"
                    : day === 3 || day === 23
                        ? "rd"
                        : "th";

        return `${day}${suffix} ${month}, ${year}`;
    }

    const handleImgUpload = async (result) => {
        if (result && result.info) {
            const profilePhotoUrl = result.info.secure_url;

            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error("User ID is not available");
                    return;
                }

                const response = await fetch(`/api/update-profile-photo?userId=${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ profilePhoto: profilePhotoUrl }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Failed to update profile photo:", errorData.error);
                    return;
                }

                const data = await response.json();
                console.log("Profile photo updated successfully:", data);
                setProfilePhoto(profilePhotoUrl);
            } catch (error) {
                console.error("An error occurred while updating the profile photo:", error.message);
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        const apiUrl1 = `/api/get-blogs-by-userId?userId=${userId}`;
        const apiUrl2 = `/api/get-profile?userId=${userId}`;

        const fetchBlogData = async () => {
            try {
                const response = await fetch(apiUrl1);
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

        const fetchProfileData = async () => {
            try {
                const response = await fetch(apiUrl2);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProfileData(data.data);
                setProfilePhoto(data.data.profilePhoto);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
        fetchProfileData();

    }, [userId]);

    if (loading) {
        return (
            <ProfileSkeleton />
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <ProtectedRoute>
            <main className='p-2 relative'>
                <Navbar />
                <div className="h-fit w-full md:w-[70vw] lg:w-[60vw] max-w-[900px] mx-auto bg-gray-100 py-4 px-4 rounded-xl my-[72px]">
                    <div className="relative group w-40 h-40">
                        <Image
                            src={profilePhoto}
                            alt="profile photo"
                            height={200}
                            width={200}
                            className="h-40 w-40 rounded-full object-cover transition-all duration-300 group-hover:brightness-75 border-2 border-yellow-500"
                        />
                        <CldUploadWidget uploadPreset="inkling" onSuccess={handleImgUpload}>
                            {({ open }) => {
                                return (
                                    <button
                                        className="absolute bottom-2 right-2 bg-yellow-500 text-white p-2 rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none border-2 border-yellow-800"
                                        onClick={() => open()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.25 2.25 0 113.182 3.182L7.5 20.25H3.75v-3.75L16.732 3.732z"
                                            />
                                        </svg>
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </div>

                    <p className='uppercase mt-5 text-xs text-gray-500'>name:</p>
                    <h2 className='text-xl lg:text-2xl font-semibold'>{profileData ? `${profileData.firstName} ${profileData.lastName}` : ''}</h2>
                    <p className='uppercase mt-5 text-xs text-gray-500'>gender:</p>
                    <p className='capitalize font-medium text-sm'>{profileData ? `${profileData.gender}` : ''}</p>
                    <p className='uppercase mt-5 text-xs text-gray-500'>about:</p>
                    <h3 className='font-medium text-sm lg:text-base'>{profileData ? `${profileData.about}` : ''}</h3>
                    <p className='uppercase mt-5 text-xs text-gray-500'>address:</p>
                    <h3 className='font-medium text-sm text-gray-500'>{profileData ? `${profileData.address}` : ''}</h3>
                    <p className='mt-5 text-sm text-gray-500'>joined on : {profileData ? `${formatDate(profileData.createdAt)}` : ''}</p>

                    <button onClick={logout} className='bg-red-500 hover:bg-red-600 p-2 w-40 font-semibold text-white rounded-md mt-10'>Log Out</button>
                    <div className='w-full h-full p-2 rounded-lg mt-5'>
                        <h3 className='font-semibold capitalize lg:text-lg text-center text-yellow-700 mb-2 border-b-2 border-b-yellow-700'>~ Your blogs ~</h3>
                        <div className='h-fit w-full grid grid-cols-1 gap-5'>
                            {currentBlogs.length > 0 ? (
                                currentBlogs.map((blog) => (
                                    <Link
                                        key={blog._id}
                                        href={`/${sanitizeTitle(blog.category)}/${blog._id}/${sanitizeTitle(blog.title)}`}
                                        className='rounded-lg w-full h-24 lg:h-28 grid grid-cols-4 hover:bg-gray-200'
                                    >
                                        <Image
                                            src={blog.img_url}
                                            alt='blog_img'
                                            height={200}
                                            width={200}
                                            className='h-24 lg:h-28 rounded-l-lg col-span-1'
                                        />
                                        <div className='border-t border-b border-r rounded-r-lg col-span-3 h-full w-full flex flex-col justify-between px-1'>
                                            <h3 className='line-clamp-1 font-semibold'>{blog.title}</h3>
                                            <p className='line-clamp-1 text-sm font-medium'>{blog.synopsis}</p>
                                            <p className='line-clamp-1 text-sm font-medium text-gray-500'>{blog.author}</p>
                                            <p className='line-clamp-1 text-sm font-medium text-gray-500'>{formatDate(blog.createdAt)}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className='h-32 w-full bg-gray-700 flex flex-col gap-5 items-center justify-center rounded-lg'>
                                    <p className='text-white'>No Blogs Available ☹️</p>
                                    <Link href='/new-blog' className='h-10 w-44 bg-white text-gray-700 flex items-center justify-center rounded-lg hover:bg-gray-100'>Write a new blog</Link>
                                </div>
                            )}
                        </div>
                        {/* Pagination Buttons */}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 text-sm font-medium bg-gray-300 rounded-md hover:bg-gray-400 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                Previous
                            </button>
                            <span className="text-sm font-medium">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 text-sm font-medium bg-gray-300 rounded-md hover:bg-gray-400 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default Profile