import React from 'react'
import Skeleton from './Skeleton'

const ProfileSkeleton = () => {
    return (
        <div className="h-fit w-full md:w-[70vw] lg:w-[60vw] max-w-[900px] mx-auto my-[72px] bg-gray-200 py-4 px-4 rounded-lg">
            <Skeleton className="h-40 w-40 rounded-full" />
            <Skeleton className="h-8 w-[30vw] rounded-lg mt-5" />
            <Skeleton className="h-8 w-[5vw] rounded-lg mt-5" />
            <Skeleton className="h-8 w-[50vw] rounded-lg mt-5" />
            <Skeleton className="h-8 w-[45vw] rounded-lg mt-5" />
            <Skeleton className="h-8 w-[10vw] rounded-lg mt-5" />

            <Skeleton className="h-8 w-[10vw] rounded-lg mt-10 mx-auto" />

            <div className='h-fit w-full grid grid-cols-1 gap-5 mt-5'>
            {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className='h-32 md:h-56 w-full rounded-lg' />
                ))}
            </div>
        </div>
    )
}

export default ProfileSkeleton