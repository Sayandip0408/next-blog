'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const NewBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [bannerImg, setBannerImg] = useState('');
    const [bannerTitle, setBannerTitle] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userFullName, setUserFullName] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserId(localStorage.getItem('userId'));
            setUserFullName(localStorage.getItem('userFullName'));
        }
    }, []);


    const config = {
        placeholder: 'Start Typing...'
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
            body: JSON.stringify({ userId, author: userFullName, title, content, img_url: bannerImg, img_title: bannerTitle, category }),
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

    return (
        <ProtectedRoute>
            <main className='p-2 relative'>
                <Navbar />
                <div className='py-[72px]'>
                    <form className='w-full max-w-[1000px] h-fit flex flex-col gap-5 mx-auto' onSubmit={handleSubmit}>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Title:</label>
                            <input type='text' placeholder='Give a title to your blog' required value={title} onChange={(e) => setTitle(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm lg:text-base font-medium' />
                        </div>
                        <div>
                            <h3 className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Content:</h3>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                // config={config}
                                onChange={(newContent) => setContent(newContent)}
                            />
                        </div>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Category:</label>
                            <input type='text' placeholder='Choose a category' required value={category} onChange={(e) => setCategory(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm lg:text-base font-medium' />
                        </div>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Banner Image:</label>
                            <input type='text' placeholder='URL of your banner image' required value={bannerImg} onChange={(e) => setBannerImg(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm lg:text-base font-medium' />
                        </div>
                        <div className='w-full h-fit flex flex-col'>
                            <label className='uppercase text-xs lg:text-sm font-medium text-gray-700'>Banner Title:</label>
                            <input type='text' placeholder='Banner title' value={bannerTitle} onChange={(e) => setBannerTitle(e.target.value)} className='border-b border-b-gray-300 focus:outline-none focus:border-b-gray-600 h-10 transition duration-200 text-sm lg:text-base font-medium' />
                        </div>
                        {
                            isLoading ? <button className='h-10 w-96 bg-gray-700 text-gray-100 block mx-auto'>POSTING ...</button> :
                                <button type='submit' className='h-10 w-96 bg-gray-950 hover:bg-gray-900 text-gray-100 block mx-auto'>POST</button>
                        }
                    </form>
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default NewBlog