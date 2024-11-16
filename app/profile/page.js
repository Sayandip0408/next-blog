'use client'
import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/authContext'

const Profile = () => {
    const { logout } = useAuth();

    return (
        <ProtectedRoute>
            <main className='p-2 relative'>
                <Navbar />
                <div className='py-[72px]'>
                    <button onClick={logout}>Log Out</button>
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default Profile