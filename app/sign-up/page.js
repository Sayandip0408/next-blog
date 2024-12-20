'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [about, setAbout] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
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


    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, firstName, lastName, gender, address, about, profilePhoto }),
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
        <main className='p-2 h-[100vh] w-full flex flex-col items-center justify-center gap-3 relative'>
            <Navbar />
            <h1 className='font-medium text-xl lg:font-bold z-10'>Create Your Account</h1>
            <form className='w-full md:w-[450px] h-fit p-5 flex flex-col gap-5' onSubmit={handleSignup}>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>first name</label>
                    <input type='text' placeholder='First Name' required value={firstName} onChange={(e) => setFirstName(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                </div>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>last name</label>
                    <input type='text' placeholder='Last Name' required value={lastName} onChange={(e) => setLastName(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                </div>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>email address</label>
                    <input type='email' placeholder='name@example.com' required value={email} onChange={(e) => setEmail(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                    {
                        !validEmail ? <p className='text-red-600 text-xs lowercase mt-2'>invalid email type</p> : <></>
                    }
                </div>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>password</label>
                    <input type='password' placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                </div>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm bg-white'>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>about yourself</label>
                    <input type='text' placeholder='Hobbies or Profession' required value={about} onChange={(e) => setAbout(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                </div>
                <div className='w-full h-fit flex flex-col'>
                    <label className='uppercase text-xs font-medium text-gray-500'>address</label>
                    <input type='text' placeholder='45, ABC Street, XYZ, PQR - 719841' required value={address} onChange={(e) => setAddress(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm' />
                </div>
                <div className='w-full h-fit flex flex-col gap-5'>
                    <label className='uppercase text-xs font-medium text-gray-500'>profile photo</label>
                    <div className='flex flex-col md:flex-row md:items-center gap-5'>
                        <CldUploadWidget uploadPreset="inkling" onSuccess={(result) => {
                            if (result && result.info) {
                                setProfilePhoto(result.info.secure_url);
                            }
                        }}>
                            {({ open }) => (
                                <button
                                    onClick={() => open()}
                                    className='bg-blue-500 text-white hover:bg-blue-600 h-10 w-full md:w-56'>
                                    Upload Profile Photo
                                </button>
                            )}
                        </CldUploadWidget>
                        {profilePhoto !== '' && (
                            <div className='flex items-center gap-3'>
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    className='w-12 h-12 rounded-full object-cover border'
                                />
                                <p className='text-sm line-clamp-1'>
                                    <span className='uppercase font-medium'>url: </span>
                                    {profilePhoto}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {
                    isLoading ?
                        <button className={`w-full h-12 bg-gray-200 text-gray-500 uppercase text-sm cursor-wait`}>
                            Verifying
                        </button> :
                        <button type='submit' className={`w-full h-12 ${email === '' || password === '' || firstName === '' || lastName === '' || address === '' || about === '' || profilePhoto === '' || gender === '' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-gray-200'} uppercase text-sm`}>
                            Continue
                        </button>
                }
                {
                    error ? <p className='text-red-600 text-xs lowercase text-center font-medium'>internal server error</p> : <></>
                }
            </form>
            <p>Already have an account? <Link href='/log-in' className='font-medium underline'>Log in</Link></p>
            {/* <p className='text-gray-700 text-sm font-medium pacifico'>Inkling <Link href='/' className='text-gray-500 underline'>Terms & Conditions</Link></p> */}
            <p className='text-gray-500 text-sm font-medium'>Developed by <a href='https://sayandip-adhikary.vercel.app/' target='_blank' className='text-gray-700 pacifico underline'>SayanDip Adhikary</a></p>
        </main>
    )
}

export default SignUp