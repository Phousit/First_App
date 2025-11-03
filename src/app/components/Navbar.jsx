"use client"

import React from 'react'
import Link from 'next/link'
import POS from '../../../public/pos.jpg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

function Navbar({ session }) {
  return (
    <nav className='flex justify-between items-center shadow-md p-5'>
        <div>
            <Link href="/">
                <Image src={POS} width={100} height={100} alt='nextjs logo' /> 
            </Link>
        </div>
        <ul className='flex space-x-4'>
            {!session ? (
                <>
                    <li><Link href="/login">Login</Link></li>
                    <li ><Link href="/register" >Register</Link></li>
                </>
            ) : (
                <>
                   
                    <li><a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-pointer'>Logout</a></li>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar
