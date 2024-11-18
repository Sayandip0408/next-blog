'use client'
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Navbar from './components/Navbar';
import Image from 'next/image';
import HeroSkeleton from './components/HeroSkeleton';
import Link from 'next/link';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    }

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const sanitizeTitle = (title) => {
    return title
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/get-limited-blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const objResponse = await response.json();
        setBlogs(objResponse.data);
      } catch (err) {
        console.error(err);
        setError('Unable to load blogs');
      }
    };

    fetchBlogs();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "ease-in-out",
    fadeSpeed: 800,
  };

  return (
    <main className='p-2 relative'>
      <Navbar />
      <div className='h-[fit] w-full rounded-lg'>
        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : blogs.length > 0 ? (
          <Slider {...settings} className='w-full h-full mx-auto rounded-lg'>
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/${blog.category}/${blog._id}/${sanitizeTitle(blog.title)}`}>
                <div
                  key={blog._id}
                  className="rounded-lg h-[300px] md:h-[80vh] w-full relative">
                  <Image src={blog.img_url} height={1500} width={1500} alt={blog.img_title} className='h-full w-full rounded-lg absolute top-0 left-0 brightness-50' />
                  <div className='absolute bottom-0 w-full h-fit bg-transparent p-5 lg:p-20'>
                    <p className="text-sm md:text-base text-white bg-[#ffffff63] backdrop-blur px-4 py-2 rounded-full capitalize w-fit h-fit">{blog.category}</p>
                    <div className='w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 mt-2 lg:mt-8'>
                      <div className='lg:col-span-2'>
                        <h3 className="text-lg md:text-2xl lg:text-4xl font-semibold text-white line-clamp-1 lg:mb-8">{blog.title}</h3>
                        <p className="text-sm md:text-base text-white line-clamp-2">{blog.synopsis}</p>
                      </div>
                      <div>
                        <p className="text-sm md:text-base text-white line-clamp-2 font-medium text-right">{blog.author}</p>
                        <p className="text-sm md:text-base text-white line-clamp-2 text-right">{formatDate(blog.createdAt)}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        ) : (
          <HeroSkeleton />
        )}
      </div>
    </main>
  );
};

export default Home;
