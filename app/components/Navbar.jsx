'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext';
import { FaShop, FaUsersViewfinder } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { IoIosClose, IoMdPerson, IoIosLogOut, IoIosPerson } from "react-icons/io";
import { MdSpaceDashboard, MdCategory, MdProductionQuantityLimits, MdPostAdd } from "react-icons/md";
import { GiPlatform } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiAddBoxFill } from "react-icons/ri";

const Navbar = () => {
    const { accessToken, logout } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <nav className='w-[calc(100vw-16px)] h-16 border-b flex items-center justify-between gap-5 absolute top-2 left-2  px-5'>
            <Link href='/'>
                <h1 className='text-xl font-medium pacifico'>Inkling</h1>
            </Link>
            <div className='h-full w-fit flex items-center gap-5'>
                {
                    accessToken ? (
                        <div className='h-10 w-10 rounded-full bg-pink-400 relative hidden lg:block'>
                            <button
                                onClick={toggleDropdown}
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                                className='h-full w-full rounded-full text-xs'
                            >
                                User
                            </button>
                            {dropdownOpen && (
                                <div
                                    onMouseEnter={() => setDropdownOpen(true)}
                                    onMouseLeave={() => setDropdownOpen(false)}
                                    className="absolute right-0 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                                >
                                    <ul className="py-2">
                                        <li>
                                            <button onClick={logout} className="flex items-center w-full h-12 px-2 text-gray-700 text-sm font-medium hover:bg-gray-100 gap-1">
                                                <IoIosLogOut className='text-lg' />
                                                Logout
                                            </button>
                                        </li>
                                        <li>
                                            <Link href='/profile' className="flex items-center w-full h-12 px-2 text-gray-700 text-sm font-medium hover:bg-gray-100 gap-1">
                                                <IoIosPerson className='text-lg' />
                                                Profile
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href='/log-in'>
                                Log In
                            </Link>
                            <Link href='/sign-up'>
                                Sign Up
                            </Link>
                        </>
                    )
                }

                <button onClick={toggleSidebar} className='text-2xl lg:hidden text-gray-900 active:bg-gray-400 rounded-full p-1 transition-all duration-200'>
                    <HiMenuAlt3 />
                </button>

            </div>
            <aside className={`fixed top-0 right-0 h-full bg-white text-white z-10 w-64 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
                <button onClick={toggleSidebar} className='absolute top-5 right-5 text-gray-950 text-3xl p-1'>
                    <IoIosClose />
                </button>
                <ul className='w-full h-fit flex flex-col gap-5 mt-20 px-5'>
                    <li className='text-base text-gray-950'><Link href="/" className='flex gap-2 items-center'><MdSpaceDashboard className='mb-1 text-lg' />Feed</Link></li>
                    <li className='text-base text-gray-950'><Link href="/categories" className='flex gap-2 items-center'><MdCategory className='mb-1 text-lg' />Categories</Link></li>
                    <li className='text-base text-gray-950'><Link href="/profile" className='flex gap-2 items-center'><IoIosPerson className='mb-1 text-lg' />Profile</Link></li>
                    <li className='text-base text-gray-950'><Link href="/new-blog" className='flex gap-2 items-center'><RiAddBoxFill className='mb-1 text-lg' />New Blog</Link></li>

                </ul>
                <button onClick={logout} className='mt-10 h-10 w-[85%] mx-auto bg-gray-950 block rounded-lg text-gray-100 text-sm font-medium'>Log Out</button>
                <p className='text-gray-500 text-xs font-medium text-center absolute bottom-8 w-full'>Developed by <br></br><a href='https://sayandip-adhikary.vercel.app/' target='_blank' className='text-gray-700 pacifico underline text-base'>SayanDip Adhikary</a></p>
            </aside>
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={toggleSidebar}></div>
            )}
        </nav>
    )
}

export default Navbar