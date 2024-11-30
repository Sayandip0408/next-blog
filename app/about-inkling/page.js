'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'

const AboutInkling = () => {
    const router = useRouter()

    return (
        <main className='p-2 relative'>
            <Navbar />

            <div className="relative bg-gray-900 text-white">
                <div className="relative h-96 bg-[url('/blog_hero.jpg')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center p-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Welcome to <span className="text-orange-500">Our Blog</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-6">
                            Dive into insightful articles on web development, technology trends, and personal growth.
                        </p>
                        <a
                            href="/categories"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
                        >
                            Explore Articles
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-white py-12">
                <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="text-3xl font-bold">150+</p>
                        <p className="text-gray-600">Articles Published</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">25+</p>
                        <p className="text-gray-600">Contributors</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-gray-600">Categories Covered</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">50K+</p>
                        <p className="text-gray-600">Monthly Readers</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 py-12 px-6">
                <div className="max-w-screen-xl mx-auto text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-4">About Our Blog</h2>
                    <p className="text-gray-600 mb-6">
                        Welcome to our blog, where we share insights, stories, and resources to inspire and inform. Our mission is to create a space for learning, growth, and exploration, covering topics such as web development, technology trends, personal growth, and more.
                    </p>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
                    onClick={()=>router.push('/categories')}
                    >
                        Read Our Story
                    </button>
                </div>
            </div>

            <section className="bg-indigo-700 text-white py-12 px-6">
                <div className="max-w-screen-md mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
                    <p className="text-lg text-gray-300 mb-6">
                        If you have any questions about these terms, feel free to reach out to us via our
                        <a href="/contact-us" className="text-yellow-400 hover:underline ml-1">
                            Contact Page.
                        </a>
                    </p>
                    <a
                        href="/"
                        className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 px-6 py-3 rounded-lg font-medium shadow-lg transition"
                    >
                        Return to Blog
                    </a>
                </div>
            </section>
        </main>
    )
}

export default AboutInkling