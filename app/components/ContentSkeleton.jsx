import React from 'react'
import Navbar from './Navbar'

const ContentSkeleton = () => {
    return (
        <main className='p-2 relative h-[100vh w-full]'>
            <Navbar />
            <div className='pt-16 pb-10 h-fit w-full max-w-[900px] mx-auto animate-pulse'>
                <div className='h-6 w-1/3 bg-gray-300 mb-4'></div>
                <div className='h-10 w-2/3 bg-gray-300 mb-6'></div>
                <div className='h-40 w-full bg-gray-300 mb-6'></div>
                <div className='flex gap-2 items-center mb-6'>
                    <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
                    <div className='h-6 w-1/4 bg-gray-300'></div>
                </div>
                <div className='h-4 w-full bg-gray-300 mb-2'></div>
                <div className='h-4 w-5/6 bg-gray-300 mb-2'></div>
                <div className='h-4 w-4/6 bg-gray-300'></div>
            </div>
        </main>
    )
}

export default ContentSkeleton