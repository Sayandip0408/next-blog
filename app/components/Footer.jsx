import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='h-fit w-full bg-gray-950 px-2 py-10 lg:p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            <div className='flex flex-col items-center justify-center gap-5'>
                <Link href='/' className='text-gray-100 hover:underline font-medium'>Feed</Link>
                <Link href='/about-inkling' className='text-gray-100 hover:underline font-medium'>About Inkling</Link>
                <Link href='/new-blog' className='text-gray-100 hover:underline font-medium'>New Blog</Link>
                <Link href='/categories' className='text-gray-100 hover:underline font-medium'>Categories</Link>
                <Link href='/terms-and-conditions' className='text-gray-100 hover:underline font-medium'>Terms and Conditions</Link>
            </div>
            <div className='flex flex-col items-center justify-center gap-5'>
                <a href='https://sayandip-adhikary.vercel.app/' className='text-gray-100 hover:underline font-medium'>Developer</a>
                <a href='https://github.com/Sayandip0408' className='text-gray-100 hover:underline font-medium'>GitHub</a>
                <a href='https://www.instagram.com/sayan.dip7/' className='text-gray-100 hover:underline font-medium'>Instagram</a>
                <a href='https://www.facebook.com/sayandip.adhikary.96' className='text-gray-100 hover:underline font-medium'>Facebook</a>
                <a href='mailto:adhikarysayandip@gmail.com' className='text-gray-100 hover:underline font-medium'>E-Mail</a>
            </div>
            <div className='flex flex-col items-center justify-center gap-5 bg-gray-900 rounded-lg p-5 lg:p-0 md:col-span-2 lg:col-span-1'>
                <h1 className='pacifico text-gray-100 text-3xl'>Inkling</h1>
                <p className='text-gray-300 text-center text-sm'>A Blogging Website Developed By SayanDip Adhikary</p>
            </div>
        </footer>
    )
}

export default Footer