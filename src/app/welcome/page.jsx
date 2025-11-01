"use client"

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// ...existing code...

export default function Home() {

  const [postData, setPostData] = useState([]);

  const { data: session, status } = useSession();
  const router = useRouter();

  // client-side redirect when unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/posts", {
        method: "GET",
        cache: "no-store",
      })
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      // support both { posts: [...] } and [...] shapes
      setPostData(data.posts ?? data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // fetch only when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      getPosts();
    }
  }, [status]);

  return (
    <main>
      <Container>
        <Navbar session={session} />
          <div className="container mx-auto my-3">
          <button className=" bg-green-500 p-3 text-white rounded">
            <Link href="/create">Create Post</Link>
          </button>
          <div className="grid grid-cols-4 auto-rows-fr mt-3 gap-5 items-stretch">
          
            {postData && postData.length > 0 ? (
              postData.map(val => {
                const id = val._id ?? val.id;
                return (
                  <div key={id} className="shadow-xl p-10 rounded-xl h-full flex flex-col justify-between">
                    <div className="mb-4">
                      <h4>{val.title}</h4>

                      {/* use <img> to avoid next/image height requirement for external URLs */}
                      {val.img && (
                        <div className="w-full h-48 bg-gray-100 overflow-hidden rounded my-3 flex items-center justify-center">
                          <img src={val.img} alt={val.title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <p>{val.content}</p>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        className="bg-yellow-500 text-white border py-2 px-3 rounded-md text-lg "
                        href={`/edit/${id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg ml-2"
                        href={`/delete/${id}`}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="bg-gray-300 p-3 my-3">
                No posts available. Please create a new post.
              </p>
            )}

          </div>
        </div>
      </Container>
    </main>

  );
}
// ...existing code...