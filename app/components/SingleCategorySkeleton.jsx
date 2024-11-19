import React from 'react'
import Skeleton from './Skeleton'

const SingleCategorySkeleton = () => {
    return (
        <div className="h-[100vh] w-full max-w-[900px] mx-auto mt-5 bg-gray-200 pt-16 px-2 rounded-lg">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-2 w-full rounded-full mt-2" />
            <div className='h-fit w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                {[...Array(9)].map((_, index) => (
                    <Skeleton key={index} className='h-32 md:h-40 w-full rounded-lg' />
                ))}
            </div>
        </div>
    )
}

export default SingleCategorySkeleton