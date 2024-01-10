"use client";

import { PostResponse } from "@/app/(user)/posts/page";
import axios from "axios";
import Link from "next/link";
import React from "react";

function handlePostDelete(
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>,
    id: string,
    token: string
) {
    axios
        .delete(`http://localhost:5002/v1/posts/${id}`, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => {
            console.log(res);

            axios
                .get("http://localhost:5002/v1/posts/all", {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    console.log(response.data.data);
                    setPosts(response.data.data);
                });
        });
}

function handlePublish(
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>,
    post: PostResponse,
    token: string
) {
    axios
        .put(`http://localhost:5002/v1/posts/publish/${post.post_id}`, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => {
            console.log(res);

            axios
                .get("http://localhost:5002/v1/posts/all", {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    console.log(response.data.data);
                    setPosts(response.data.data);
                });
        });
}

interface Props {
    post: PostResponse;
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>;
}

const ReviewPostCard = ({ post, setPosts }: Props) => {
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        setToken(localStorage.getItem("auth_token") ?? "");
    });

    return (
        <div className="card bg-base-300 border border-gray-800">
            <figure>
                <img src={`data:image/png;base64, ${post.image}`} alt="Shoes" />
            </figure>
            <div className="card-body gap-6">
                <h2 className="card-title">{post.short_description}</h2>
                <div className="card-actions">
                    <Link
                        href={post.url}
                        className="badge badge-accent uppercase font-bold px-4 py-3"
                    >
                        {post.url}
                    </Link>
                    <div className="badge badge-primary uppercase font-bold px-4 py-3">
                        {post.category}
                    </div>
                </div>
                <p>{post.long_description}</p>
                <div className="card-actions">
                    <button
                        className="btn btn-success flex-1"
                        onClick={() => {
                            handlePublish(setPosts, post, token);
                            alert("Post published!");
                        }}
                    >
                        Publish
                        <i className="ri-check-line"></i>
                    </button>
                    <button
                        className="btn btn-error flex-1"
                        onClick={() => {
                            handlePostDelete(setPosts, post.post_id, token);
                        }}
                    >
                        Delete
                        <i className="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPostCard;
