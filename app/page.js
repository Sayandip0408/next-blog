'use client'
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useAuth } from './context/authContext';

const Home = () => {
  const { accessToken } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <main className='p-2 relative'>
      <Navbar />
      <div className='pt-[72px] h-[800px] bg-gray-600 rounded-lg'>
        <p>This is Home Page</p>
        {accessToken ? (
          <p>You are logged in</p>
        ) : (
          <p>You are not logged in</p>
        )}
      </div>
    </main>
  )
}

export default Home




















// 'use client';

// import { CldUploadWidget } from 'next-cloudinary';
// import { useState } from 'react';

// export default function Home() {
//   const [imgUrl, setImgUrl] = useState('');

//   const handleUpload = (result) => {
//     if (result.event === 'success') {
//       setImgUrl(result.info.secure_url);
//     }
//   };

//   return (
//     <main className="p-2">
//       <CldUploadWidget uploadPreset="inkling" onSuccess={handleUpload}>
//         {({ open }) => {
//           return (
//             <button onClick={() => open()}>
//               Upload an Image
//             </button>
//           );
//         }}
//       </CldUploadWidget>
//       {imgUrl && (
//         <div>
//           <p>Uploaded Image URL:</p>
//           <a href={imgUrl} target="_blank" rel="noopener noreferrer">
//             {imgUrl}
//           </a>
//         </div>
//       )}
//     </main>
//   );
// }
