'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const ContactGetInTouch = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sendingData, setSendingData] = useState(false);

    const isValidTenDigitNumber = (input) => {
        return /^\d{10}$/.test(input);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSendingData(true);

        if (!isValidTenDigitNumber(phone)) {
            toast.error('Enter a valid phone number!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            setSendingData(false);
            return;
        }

        const formData = { name, email, phone, subject, message };

        try {
            const response = await fetch('/api/send-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Message sent successfully! We will get back to you soon.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                setName('');
                setEmail('');
                setPhone('');
                setSubject('');
                setMessage('');
            } else {
                toast.error('Failed to send message!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('There was an error sending your message!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } finally {
            setSendingData(false);
        }
    };

    return (
        <div className="bg-[#F8F8F8] p-8 lg:p-16 flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-1/2">
                <h4 className='capitalize'>Contact Now</h4>
                <h3 className="text-3xl font-semibold text-[#333333] mb-6">
                    Get in Touch <span>with Us</span>
                </h3>
                <p className="text-gray-600 mb-8 ">
                    If you have questions or need assistance, reach out to our
                    dedicated support team. We&apos;re here to help!
                </p>
                <div className="flex items-center gap-4">
                    <a href="https://www.facebook.com/sayandip.adhikary.96" target="_blank" className="bg-gray-300 p-2 rounded-full hover:bg-blue-500 text-gray-800 hover:text-white transition duration-300">
                        <FaFacebook className="" />
                    </a>
                    <a href="https://www.instagram.com/sayan.dip7/" target="_blank" className="bg-gray-300 p-2 rounded-full hover:bg-pink-500 text-gray-800 hover:text-white transition duration-300">
                        <FaInstagram className="" />
                    </a>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='w-full max-w-[1200px] lg:w-[900px] xl:w-[1200px] h-fit py-3 flex flex-col gap-2 getInTouchInputGrid mx-auto'>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <input type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} spellCheck="true" required className='w-full h-10 md:h-12 rounded-md text-sm md:text-base placeholder:text-sm font-medium md:placeholder:text-sm text-[#4F341D] p-2 bg-[#EEEEEE] focus:outline-none border-2 border-[#dfdfdf79] focus:border-yellow-500 getInTouchInputs' />
                <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} spellCheck="true" required className='w-full h-10 md:h-12 rounded-md text-sm md:text-base placeholder:text-sm font-medium md:placeholder:text-sm text-[#4F341D] p-2 bg-[#EEEEEE] focus:outline-none border-2 border-[#dfdfdf79] focus:border-yellow-500 getInTouchInputs' />
                <input type='text' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} spellCheck="true" required className='w-full h-10 md:h-12 rounded-md text-sm md:text-base placeholder:text-sm font-medium md:placeholder:text-sm text-[#4F341D] p-2 bg-[#EEEEEE] focus:outline-none border-2 border-[#dfdfdf79] focus:border-yellow-500 getInTouchInputs' />
                <input type='text' placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} spellCheck="true" required className='w-full h-10 md:h-12 rounded-md text-sm md:text-base placeholder:text-sm font-medium md:placeholder:text-sm text-[#4F341D] p-2 bg-[#EEEEEE] focus:outline-none border-2 border-[#dfdfdf79] focus:border-yellow-500 getInTouchInputs' />
                <textarea type='text' placeholder='Write Message' value={message} onChange={(e) => setMessage(e.target.value)} rows="5" spellCheck="true" required className='rounded-md text-sm md:text-base placeholder:text-sm font-medium md:placeholder:text-sm text-[#4F341D] p-2 bg-[#EEEEEE] focus:outline-none border-2 border-[#dfdfdf79] focus:border-yellow-500 getInTouchInputs col-span-2' />
                {
                    sendingData ?
                        <button className='h-10 w-24 text-xs bg-yellow-400 hover:bg-yellow-500 rounded-md shadow-md flex items-center justify-center cursor-wait' onClick={() => { }}>
                            <Loader />
                        </button>
                        :
                        <button type='submit' className='uppercase font-bold bg-yellow-400 hover:bg-yellow-500 text-[#4F341D] h-10 w-24 text-xs rounded-md shadow-md'>submit</button>
                }
            </form>
        </div>
    );
};

export default ContactGetInTouch;
