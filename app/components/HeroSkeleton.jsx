import React from 'react'
import Skeleton from './Skeleton'

const HeroSkeleton = () => {
    return (
        <div className="p-4 shadow-md rounded-lg h-[300px] md:h-[80vh] w-full bg-gray-200">
            <Skeleton className="w-16 h-16 rounded-full mx-auto" />

        </div>
    )
}

export default HeroSkeleton
