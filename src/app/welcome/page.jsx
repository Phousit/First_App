"use client"

import Image from "next/image";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NextLogo from '../../../public/next.svg'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {

  const [postData, setPostData] = useState([]);

    const { data: session } = useSession();
    if (!session) redirect("/login");
    console.log(session)

  return (
    <main>
      <Container>
        <Navbar session={session} />
          <div className="container mx-auto my-3">
          <button className=" bg-green-500 p-3 text-white rounded">
            <Link href="/create">Create Post</Link>
          </button>
          <div className="grid grid-cols-4 mt-3 gap-5">
            <div className="shadow-xl my-10 p-10 rounded-xl">
              <h4>Post Title</h4>
              <img src="img.jpg" alt="" />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
                sit quaerat numquam beatae voluptate quisquam animi voluptas{" "}
              </p>
              <div className="mt-5">
                <Link
                  className="bg-yellow-500 text-white border py-2 px-3 rounded-md text-lg "
                  href="/edit"
                >
                  Edit
                </Link>
                <Link
                  className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg "
                  href="/delete"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
    
  );
}
