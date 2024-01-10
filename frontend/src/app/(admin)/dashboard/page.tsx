"use client";

import axios from "axios";
import React, { useEffect } from "react";
import ReviewPostCard from "@/components/cards/reviewPostCard";
import { PostResponse } from "@/app/(user)/posts/page";

const DashboardPage = () => {
    const [posts, setPosts] = React.useState<PostResponse[]>([]);
    const [publishedCount, setPublishedCount] = React.useState<number>(0);

    React.useEffect(() => {
        console.log("auth token : ", localStorage.getItem("auth_token"))
        axios
            .get("http://localhost:5002/v1/posts/all", {
                headers: {
                    Authorization: localStorage.getItem("auth_token"),
                },
            })
            .then((response) => {
                console.log(response.data.data);
                setPosts(response.data.data);
            });
    }, []);

    useEffect(() => {
        const count = posts.filter((post) => post.published).length;
        setPublishedCount(count);
    }, [posts]);

    return (
        <>
            <div className="mt-32 grid grid-cols-3 gap-12 mb-32">
                <div className="space-y-12">
                    {/* Heading */}
                    <h1 className="text-6xl uppercase leading-tight font-bold">
                        Review Posts
                    </h1>

                    <p className="uppercase tracking-wider text-xl font-light">
                        Welcome back Admin, Here is the summary of all posts
                        available.
                    </p>

                    {/* Context paragraph */}
                    <div className="stats shadow">
                        <div className="stat text-center">
                            <div className="stat-title">Published</div>
                            <div className="stat-value text-primary">
                                {publishedCount}
                            </div>
                            <div className="stat-desc">
                                Out of {posts.length}
                            </div>
                        </div>
                        <div className="stat text-center">
                            <div className="stat-title">Drafts</div>
                            <div className="stat-value text-accent">
                                {posts.length - publishedCount}
                            </div>
                            <div className="stat-desc">
                                Out of {posts.length}
                            </div>
                        </div>
                    </div>
                </div>

                {posts.map((post) => (
                    <ReviewPostCard
                        key={post.post_id}
                        image={post.image}
                        category={post.category}
                        url={post.url}
                        shortDescription={post.short_description}
                        longDescription={post.long_description}
                        setPosts={setPosts}
                        postId={post.post_id}
                    />
                ))}
            </div>
        </>
    );
};

export default DashboardPage;
