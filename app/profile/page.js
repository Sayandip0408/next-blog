import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'

const page = () => {
    return (
        <ProtectedRoute>
            <Navbar />
            <main>profile</main>
        </ProtectedRoute>
    )
}

export default page