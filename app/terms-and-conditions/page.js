import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const Terms = () => {
    return (
        <main className="bg-gray-50 text-gray-800 min-h-screen p-2 relative pt-16">
            <Navbar />

            <section className="bg-indigo-700 text-white py-16 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Learn about the policies that guide the content, usage, and interactions on Inkling.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-3xl font-bold mb-6">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 mb-4">
                        By accessing and using Inkling, you agree to comply with and be bound by these Terms
                        and Conditions. If you do not agree to these terms, please refrain from using the site.
                    </p>

                    <h2 className="text-3xl font-bold mb-6">2. Content Ownership</h2>
                    <p className="text-gray-700 mb-4">
                        All blog posts, articles, and images on this website are owned by the blog’s creators
                        unless explicitly stated otherwise. You are not allowed to reproduce, distribute, or
                        use our content without prior permission.
                    </p>

                    <h2 className="text-3xl font-bold mb-6">3. User Contributions</h2>
                    <p className="text-gray-700 mb-4">
                        Users are welcome to share comments and feedback. However, any content deemed harmful,
                        inappropriate, or unrelated may be removed at our discretion. By submitting comments,
                        you grant us the right to use them in blog discussions or promotional material.
                    </p>

                    <h2 className="text-3xl font-bold mb-6">4. Accuracy of Information</h2>
                    <p className="text-gray-700 mb-4">
                        While we strive to provide accurate and up-to-date information, we do not guarantee the
                        accuracy or completeness of any content on the blog. Always cross-check information
                        before acting upon it.
                    </p>

                    <h2 className="text-3xl font-bold mb-6">5. Third-Party Links</h2>
                    <p className="text-gray-700 mb-4">
                        Inkling may include links to external websites for additional resources. We are not
                        responsible for the content or privacy policies of these external sites.
                    </p>

                    <h2 className="text-3xl font-bold mb-6">6. Amendments</h2>
                    <p className="text-gray-700 mb-4">
                        These Terms and Conditions may be updated from time to time. Changes will be posted on
                        this page with the updated date.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700 underline">Future Plans with this Project : Inkling</h2>
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-3xl font-bold mb-6">1. Will implement mail verification</h2>
                    <p className="text-gray-700 mb-4">
                        We will soon implement email verification to enhance account security and ensure the validity of user accounts. Please check your inbox for a verification link upon signing up or updating your email address.
                    </p>

                    <h2 className="text-3xl font-bold mb-6">2. Will add functionalities like edit and delete blogs</h2>
                    <p className="text-gray-700 mb-4">
                        We are planning to introduce features that will allow users to edit and delete their own blog posts. This will give you greater control over your content and help you keep your posts up-to-date and accurate.
                    </p>

                    <h2 className="text-3xl font-bold mb-6">3. Bug fixing</h2>
                    <p className="text-gray-700 mb-4">
                        We are actively working to resolve any bugs or technical issues that may affect the functionality of the site. Our goal is to provide a smooth and seamless experience for all users, and we appreciate your patience as we address these concerns.
                    </p>
                </div>
            </section>

            <section className="bg-indigo-700 text-white py-12 px-6">
                <div className="max-w-screen-md mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
                    <p className="text-lg text-gray-300 mb-6">
                        If you have any questions about these terms, feel free to reach out to us via our
                        <Link href="/contact-us" className="text-yellow-400 hover:underline ml-1">
                            Contact Page.
                        </Link>
                    </p>
                    <Link
                        href="/"
                        className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 px-6 py-3 rounded-lg font-medium shadow-lg transition"
                    >
                        Return to Blog
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Terms;
