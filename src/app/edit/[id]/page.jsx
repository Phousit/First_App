"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function EditePostPage({ params }) {
  const { id } = params;


  const [postData, setPostData] = useState("");
  
  //new data of post
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const router = useRouter();

  const getPostsById = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "GET",
        cache: "no-store",
      })
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      console.log("Post data:", data);
      setPostData(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    getPostsById(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle,newImg,newContent,})
      })
        if (!res.ok) {
            throw new Error("Failed to update post");
            
        }
        router.refresh();
        router.push("/welcome");
    } catch (error) {
      console.error("Error updating post:", error);
    }
}
  

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Edit Post</h3>
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
          
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2"
          placeholder={postData?.post?.title}
        />
        <input
          type="text"
         
          onChange={(e) => setNewImg(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2"
          placeholder={postData?.post?.img}
        />
        <textarea
          
          onChange={(e) => setNewContent(e.target.value)}
          cols="30"
          rows="10"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded-lg text-lg my-2"
          placeholder={postData?.post?.content}
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditePostPage;
