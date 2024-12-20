'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const NewBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [category, setCategory] = useState('');
    const [bannerImg, setBannerImg] = useState('');
    const [bannerTitle, setBannerTitle] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userFullName, setUserFullName] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9 ]*$/.test(value)) {
            setTitle(value);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserId(localStorage.getItem('userId'));
            setUserFullName(localStorage.getItem('userFullName'));
        }
    }, []);

    const handleImgUpload = (result) => {
        if (result && result.info) {
            setBannerImg(result.info.secure_url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (content === '' || !content) {
            alert('Content is essential');
            setIsLoading(false);
            return;
        }

        const response = await fetch('/api/post-blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, author: userFullName, title, content, img_url: bannerImg, img_title: bannerTitle, category, synopsis }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(errorText);
            setError(true);
            setIsLoading(false);
            return;
        }

        setError(false);
        setIsLoading(false);
        router.push('/');
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ProtectedRoute>
            <main className='p-2 relative'>
                <Navbar />
                <div className='py-[72px]'>
                    <h2 className='text-center font-semibold text-lg my-3 capitalize bg-red-400 text-red-950 p-1'>Upload the banner image first then start filling other fields</h2>
                    <form className='w-full max-w-[1000px] h-fit flex flex-col gap-5 mx-auto md:px-5' onSubmit={handleSubmit}>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Title: <span className='lowercase text-gray-500 font-normal'>(special characters are not allowed)</span></label>
                            <input type='text' placeholder='Give a title to your blog' required value={title} onChange={handleInputChange} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm lg:text-base font-medium' />
                        </div>
                        <div>
                            <h3 className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Content: <span className='lowercase text-gray-500 font-normal'>(do not add images in content)</span></h3>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                onChange={(newContent) => setContent(newContent)}
                            />
                        </div>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Synopsis:</label>
                            <input type='text' placeholder='Wite a short line about this blog' required value={synopsis} onChange={(e) => setSynopsis(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm lg:text-base font-medium' />
                        </div>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs font-medium text-gray-500'>category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm bg-white'>
                                <option value="" disabled>Select Category</option>
                                <option value="Jobs and Careers">Jobs and Careers</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="IT and Tech">IT and Tech</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Travel">Travel</option>
                                <option value="Education">Education</option>
                                <option value="News">News</option>
                                <option value="Movies and Shows">Movies and Shows</option>
                                <option value="Foods">Foods</option>
                            </select>
                        </div>
                        <div className='p-2 w-full h-fit flex flex-col md:flex-row md:items-center gap-5'>
                            <CldUploadWidget uploadPreset="inkling" onSuccess={handleImgUpload}>
                                {({ open }) => {
                                    return (
                                        <button onClick={() => open()} className='bg-yellow-500 text-black hover:bg-yellow-600 hover:text-white h-10 w-full md:w-56'>
                                            Upload a Banner
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>
                            {
                                bannerImg !== '' ? <p className='text-sm line-clamp-1'><span className='uppercase font-medium'>url: </span>{bannerImg}</p> : <></>
                            }
                        </div>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Banner Title:</label>
                            <input type='text' placeholder='Banner title' value={bannerTitle} onChange={(e) => setBannerTitle(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm lg:text-base font-medium' />
                        </div>
                        {
                            isLoading ? <button className='h-10 w-96 bg-gray-700 text-gray-100 block mx-auto'>POSTING ...</button> :
                                <button type='submit' className='h-10 w-full bg-gray-950 hover:bg-gray-900 text-gray-100 block mx-auto'>POST</button>
                        }
                    </form>
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default NewBlog