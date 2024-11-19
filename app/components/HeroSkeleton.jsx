import React from 'react'
import Skeleton from './Skeleton'

const HeroSkeleton = () => {
    return (
        <div className="p-4 shadow-md rounded-lg h-[300px] md:h-[80vh] w-full bg-gray-200 relative">
            {/* <Skeleton className="w-16 h-16 rounded-full mx-auto" /> */}
            <div className='absolute bottom-0 w-full h-fit bg-transparent p-5 lg:p-20'>
                <Skeleton className="h-8 lg:h-10 w-32 rounded-full" />
                <div className='w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 mt-2 lg:mt-8'>
                    <div className='lg:col-span-2 w-full flex flex-col gap-2 lg:gap-8'>
                        <Skeleton className='h-8 lg:h-10 w-full rounded-full' />
                        <Skeleton className='h-5 lg:h-8 w-full rounded-full' />
                        <Skeleton className='h-5 lg:h-8 w-full rounded-full' />
                    </div>
                    <div className='w-full flex flex-col items-end gap-2'>
                        <Skeleton className='h-5 lg:h-8 w-44 rounded-full' />
                        <Skeleton className='h-5 lg:h-8 w-44 rounded-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSkeleton
