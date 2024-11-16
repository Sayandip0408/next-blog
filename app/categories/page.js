'use client'
import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'

const page = () => {
    return (
        <ProtectedRoute>
            <Navbar />
            <main>
                page
            </main>
        </ProtectedRoute>
    )
}

export default page