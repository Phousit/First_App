"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSession } from "next-auth/react";
function CreatePostPage() {

    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

     const { data: session } = useSession();
        if (!session) redirect("/login");
        console.log(session)

  return (
    <main>
       <Navbar session={session} />
    <div className='container mx-auto py-10'>
        <h3 className='text-3xl font-bold'>Create Post</h3>
        <hr className='my-3'/>
        <Link href="/welcome" className=' bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go Back</Link>

        <form action="">
            <input type="text" className='w[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2' placeholder='Post title'/>
            <input type="text" className='w[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2' placeholder='Post img URL'/>
            <textarea name="" id="" cols="30" row="10" className='w[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2' placeholder='Enter your content'></textarea>
            <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Create Post</button>
        </form>

    

    </div>
    </main>
  )
}

export default CreatePostPage