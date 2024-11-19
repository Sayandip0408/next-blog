'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { login, accessToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (accessToken) {
            router.push('/');
        }
    }, [accessToken, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(errorText);
            setError(true);
            setIsLoading(false);
            return;
        }

        try {
            const data = await response.json();
            setError(false);
            login(data.accessToken, data.refreshToken, data.userId, data.userFullName);
            setIsLoading(false);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            setError(true);
            setIsLoading(false);
        }
    }

    return (
        <main className='p-2 h-[100vh] w-full flex flex-col items-center justify-center gap-5 relative'>
            <Navbar />
            <h1 className='font-medium text-xl lg:font-bold'>Log Into Inkling</h1>
            <form className='w-full md:w-[450px] h-fit p-5 flex flex-col gap-5' onSubmit={handleLogin}>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>email address</label>
                    <input type='email' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                    {
                        !validEmail ? <p className='text-red-600 text-xs lowercase mt-2'>invalid email type</p> : <></>
                    }
                </div>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>password</label>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                </div>
                {
                    isLoading ?
                        <button className={`w-full h-12 bg-gray-200 text-gray-500 uppercase text-sm`}>
                            Verifying
                        </button> :
                        <button type='submit' className={`w-full h-12 ${email === '' || password === '' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-gray-200'} uppercase text-sm`}>
                            Log In
                        </button>
                }
                {
                    error ? <p className='text-red-600 text-xs lowercase mt-2 text-center font-medium'>Wrong email or password</p> : <></>
                }
            </form>
            <p className='text-gray-700 text-sm font-medium pacifico'>Inkling <Link href='/' className='text-gray-500 underline'>Terms & Conditions</Link></p>
            <p className='text-gray-500 text-sm font-medium'>Developed by <a href='https://sayandip-adhikary.vercel.app/' target='_blank' className='text-gray-700 pacifico underline'>SayanDip Adhikary</a></p>
        </main>
    )
}

export default Login