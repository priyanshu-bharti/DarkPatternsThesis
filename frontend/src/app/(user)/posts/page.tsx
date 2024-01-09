"use client";
import PostCard from "@/components/cards/postCard";
import Link from "next/link";
import React from "react";
import axios from "axios";

export interface PostResponse {
    post_id: string;
    image: string;
    url: string;
    category: string;
    short_description: string;
    long_description: string;
    published: boolean;
}

const PostsPage = () => {
    const [posts, setPosts] = React.useState<PostResponse[]>([]);
    React.useEffect(() => {
        async function fetchPosts() {
            const response = await axios.get("http://localhost:5002/v1/posts");
            const postData = response.data.data as PostResponse[];
            setPosts(postData);
        }

        fetchPosts();
    }, []);

    return (
        <>
            <div className="container mx-auto my-16 px-4 sm:px-16 sm:my-32 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12">
                <div className="space-y-12">
                    {/* Heading */}
                    <h1 className="text-5xl uppercase leading-tight font-bold">
                        Dark Patterns submitted by our users.
                    </h1>

                    {/* Context paragraph */}
                    <p className="uppercase tracking-wider text-xl font-light pb-12">
                        This is the place where the posts submitted by the users{" "}
                        <Link href="/submit" className="font-bold underline">
                            using this link
                        </Link>{" "}
                        for submission, ends up for exhibition.
                    </p>
                </div>
                {posts.map((post) => {
                    return (
                        <PostCard
                            key={post.url}
                            image={post.image}
                            category={post.category}
                            url={post.url}
                            shortDescription={post.short_description}
                            longDescription={post.long_description}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default PostsPage;
