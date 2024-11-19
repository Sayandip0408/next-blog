'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext';
import { IoIosClose, IoIosPerson, IoIosLogIn } from "react-icons/io";
import { MdSpaceDashboard, MdCategory, MdPolicy } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiAddBoxFill } from "react-icons/ri";
import { PiAddressBookTabsFill } from "react-icons/pi";
import { usePathname } from 'next/navigation';
import { FaLaptopCode } from "react-icons/fa6";
import { BsInfoSquareFill } from "react-icons/bs";

const Navbar = () => {
    const { accessToken, logout } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [navbarBg, setNavbarBg] = useState(false);
    const pathname = usePathname();


    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setNavbarBg(true);
            } else {
                setNavbarBg(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <nav className={`w-[calc(100vw-16px)] h-16 flex items-center justify-between gap-5 fixed top-0 left-2 z-50 px-5 lg:px-20 ${navbarBg ? 'bg-white' : pathname === '/' ? 'bg-transparent' : 'bg-white'}`}>
            <span className='h-full flex items-center gap-5'>
                <Link href='/' className='h-full flex items-center'>
                    <h1 className={`text-xl md:text-2xl font-medium pacifico mb-1 ${navbarBg ? 'text-gray-950' : pathname === '/' ? 'text-white' : 'text-gray-950'}`}>Inkling</h1>
                </Link>
                <ul className='h-full w-fit hidden lg:flex items-center justify-center gap-5 text-sm xl:text-base'>
                    <li className={`${navbarBg ? 'text-gray-950' : pathname === '/' ? 'text-white' : 'text-gray-950'} hover:underline underline-offset-2 cursor-pointer`}>
                        <Link href='/'>Feed</Link>
                    </li>
                    <li className={`${navbarBg ? 'text-gray-950' : pathname === '/' ? 'text-white' : 'text-gray-950'} hover:underline underline-offset-2 cursor-pointer`}>
                        <Link href='/categories'>Categories</Link>
                    </li>
                    <li className={`${navbarBg ? 'text-gray-950' : pathname === '/' ? 'text-white' : 'text-gray-950'} hover:underline underline-offset-2 cursor-pointer`}>
                        <Link href='/new-blog'>New Blog</Link>
                    </li>
                    <li className={`${navbarBg ? 'text-gray-950' : pathname === '/' ? 'text-white' : 'text-gray-950'} hover:underline underline-offset-2 cursor-pointer`}>
                        <a href='https://sayandip-adhikary.vercel.app/' target='_blank'>Developer</a>
                    </li>
                    <li className={`${navbarBg ? 'text-gray-950' : pathname === '/' ? 'text-white' : 'text-gray-950'} hover:underline underline-offset-2 cursor-pointer`}>
                        <Link href='/about-inkling'>About Inkling</Link>
                    </li>
                    <li className={`${navbarBg ? 'text-gray-950' : pathname === '/' ? 'text-white' : 'text-gray-950'} hover:underline underline-offset-2 cursor-pointer`}>
                        <Link href='/terms-and-conditions'>Terms & Conditions</Link>
                    </li>
                </ul>
            </span>
            <div className='h-full w-fit flex items-center gap-5'>
                {
                    accessToken ? (
                        <div className={`h-8 w-20 rounded-lg ${navbarBg ? 'bg-gray-950 text-white hover:bg-gray-800' : pathname === '/' ? 'bg-white text-gray-950 hover:bg-gray-100' : 'bg-gray-950 text-white hover:bg-gray-800'} relative hidden lg:block`}>
                            <Link
                                href='/profile'
                                className='h-full w-full rounded-lg text-sm font-medium flex items-center justify-center'
                            >
                                Profile
                            </Link>
                        </div>
                    ) : (
                        <div className='hidden lg:flex items-center justify-center gap-5'>
                            <Link href='/log-in' className={`h-8 w-20 ${navbarBg ? 'bg-gray-950 text-white hover:bg-gray-800' : pathname === '/' ? 'bg-white text-gray-950 hover:bg-gray-100' : 'bg-gray-950 text-white hover:bg-gray-800'} rounded-lg flex items-center justify-center text-xs font-medium`}>
                                Log In
                            </Link>
                        </div>
                    )
                }

                <button onClick={toggleSidebar} className={`text-2xl lg:hidden ${navbarBg ? 'text-gray-900' : pathname === '/' ? 'text-gray-100' : 'text-gray-950'} rounded-full p-1 transition-all duration-200`}>
                    <HiMenuAlt3 />
                </button>

            </div>
            <aside className={`fixed top-0 right-0 h-full bg-white text-white z-10 w-64 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
                <button onClick={toggleSidebar} className='absolute top-4 right-5 text-gray-950 text-3xl p-1'>
                    <IoIosClose />
                </button>
                <ul className='w-full h-fit flex flex-col gap-5 mt-20 px-5'>
                    <li className='text-base text-gray-950'><Link href="/" className='flex gap-2 items-center'><MdSpaceDashboard className='text-lg' />Feed</Link></li>
                    <li className='text-base text-gray-950'><Link href="/categories" className='flex gap-2 items-center'><MdCategory className='text-lg' />Categories</Link></li>
                    {
                        accessToken ?
                            <>
                                <li className='text-base text-gray-950'><Link href="/profile" className='flex gap-2 items-center'><IoIosPerson className='text-lg' />Profile</Link></li>
                                <li className='text-base text-gray-950'><Link href="/new-blog" className='flex gap-2 items-center'><RiAddBoxFill className='text-lg' />New Blog</Link></li>
                            </>
                            : <>
                                <li className='text-base text-gray-950'><Link href="/log-in" className='flex gap-2 items-center'><IoIosLogIn className='text-lg' />Log In</Link></li>
                                <li className='text-base text-gray-950'><Link href="/sign-up" className='flex gap-2 items-center'><PiAddressBookTabsFill className='text-lg' />Sign Up</Link></li>
                            </>
                    }
                    <li className='text-base text-gray-950'><a href='https://sayandip-adhikary.vercel.app/' target='_blank' className='flex gap-2 items-center'><FaLaptopCode className='text-lg' />Developer</a></li>
                    <li className='text-base text-gray-950'><Link href="/about-inkling" className='flex gap-2 items-center'><BsInfoSquareFill className='text-lg' />About Inkling</Link></li>
                    <li className='text-base text-gray-950'><Link href="/terms-and-conditions" className='flex gap-2 items-center'><MdPolicy className='text-lg' />Terms & Conditions</Link></li>
                </ul>
                {
                    accessToken && <button onClick={logout} className='mt-10 h-10 w-[85%] mx-auto bg-gray-950 block rounded-lg text-gray-100 text-sm font-medium'>Log Out</button>
                }
                <p className='text-gray-500 text-xs font-medium text-center absolute bottom-8 w-full'>Developed by <br></br><a href='https://sayandip-adhikary.vercel.app/' target='_blank' className='text-gray-700 pacifico underline text-base'>SayanDip Adhikary</a></p>
            </aside>
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={toggleSidebar}></div>
            )}
        </nav>
    )
}

export default Navbar