'use client'
import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/authContext'
import ProfileSkeleton from '../components/ProfileSkeleton'
import Skeleton from '../components/Skeleton'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'

const Profile = () => {
    const { logout } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState("");

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

        const apiUrl = `/api/get-profile?userId=${userId}`;

        const fetchProfileData = async () => {
            try {
                const response = await fetch(apiUrl);
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
                    <h2 className='text-xl lg:text-2xl font-semibold'>{profileData.firstName} {profileData.lastName}</h2>
                    <p className='uppercase mt-5 text-xs text-gray-500'>gender:</p>
                    <p className='capitalize font-medium text-sm'>{profileData.gender}</p>
                    <p className='uppercase mt-5 text-xs text-gray-500'>about:</p>
                    <h3 className='font-medium text-sm lg:text-base'>{profileData.about}</h3>
                    <p className='uppercase mt-5 text-xs text-gray-500'>address:</p>
                    <h3 className='font-medium text-sm text-gray-500'>{profileData.address}</h3>
                    <p className='mt-5 text-sm text-gray-500'>joined on : {formatDate(profileData.createdAt)}</p>

                    <div className='mx-auto bg-yellow-500 w-fit p-3 rounded-lg mt-10'>
                        <h4 className='font-medium'>Your Blogs</h4>
                    </div>

                    <div className='h-fit w-full grid grid-cols-2 gap-5 mt-5'>
                        {[...Array(4)].map((_, index) => (
                            <Skeleton key={index} className='h-32 md:h-56 w-full rounded-lg' />
                        ))}
                    </div>
                    <button onClick={logout} className='bg-red-500 hover:bg-red-600 p-2 w-full font-semibold text-white rounded-md mt-10'>Log Out</button>
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default Profile