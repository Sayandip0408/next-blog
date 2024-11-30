"use client";
import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import ContactGetInTouch from "../components/ContactGetInTouch";
import Navbar from "../components/Navbar";

const ContactUs = () => {
    return (
        <main className="p-2 relative">
            <Navbar />
            <div className="bg-[url('/contact.jpg')] bg-no-repeat bg-cover bg-center h-52 md:h-64 lg:h-96 w-full flex flex-col items-center justify-end lg:justify-center gap-2 lg:gap-5 p-5 relative">
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 text-center">
                    <h2 className="capitalize text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white">
                        Get in Touch
                    </h2>
                    <p className="text-sm md:text-lg lg:text-xl text-gray-200 max-w-xl mx-auto">
                        Have feedback, questions, or collaboration ideas? We&apos;d love to hear from you.
                    </p>
                </div>
            </div>

            <ContactGetInTouch />
        </main>
    );
};

export default ContactUs;
