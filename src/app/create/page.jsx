"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !img || !content) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, img, content }),
      });

      if (res.ok) {
        router.push("/welcome");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <main>
      <Navbar session={session} />
      <div className="container mx-auto py-10">
        <h3 className="text-3xl font-bold">Create Post</h3>
        <hr className="my-3" />
        <Link
          href="/welcome"
          className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
        >
          Go Back
        </Link>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2"
            placeholder="Post title"
          />
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2"
            placeholder="Post img URL"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            cols="30"
            rows="10"
            className="w-[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2"
            placeholder="Enter your content"
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
          >
            Create Post
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreatePostPage;
