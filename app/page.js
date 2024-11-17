'use client'
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Navbar from './components/Navbar';
import Image from 'next/image';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

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
              <div
                key={blog._id}
                className="rounded-lg h-[300px] md:h-[80vh] w-full relative">
                <Image src={blog.img_url} height={1500} width={1500} alt={blog.img_title} className='h-full w-full rounded-lg absolute top-0 left-0' />
                {/* <h3 className="text-xl font-semibold">{blog.title}</h3> */}
                {/* <p className="text-gray-600 mt-2">
                  {blog.content?.length > 100
                    ? `${blog.content.substring(0, 100)}...`
                    : blog.content}
                </p> */}
                {/* <p className="text-sm text-gray-400">{blog.category}</p> */}
              </div>
            ))}
          </Slider>
        ) : (
          <div className='rounded-lg h-[300px] md:h-[80vh] w-full flex items-center justify-center'>
            <p>No blogs available</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
