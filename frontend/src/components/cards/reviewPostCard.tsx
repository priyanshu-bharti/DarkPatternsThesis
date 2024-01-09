import { PostResponse } from "@/app/(user)/posts/page";
import axios from "axios";
import Link from "next/link";
import React from "react";

interface Props {
    postId: string;
    image: string;
    shortDescription: string;
    longDescription: string;
    url: string;
    category: string;
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>;
}

function handlePostDelete(
    setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>,
    id: string
) {
    axios
        .delete(`http://localhost:5002/v1/posts/${id}`, {
            headers: {
                Authorization: localStorage.getItem("auth_token"),
            },
        })
        .then((res) => {
            console.log(res);

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
        });
}

const ReviewPostCard = ({
    image,
    category,
    longDescription,
    shortDescription,
    url,
    postId,
    setPosts,
}: Props) => {
    return (
        <div className="card bg-base-300 border border-gray-800">
            <figure>
                <img src={`data:image/png;base64, ${image}`} alt="Shoes" />
            </figure>
            <div className="card-body gap-6">
                <h2 className="card-title">{shortDescription}</h2>
                <div className="card-actions">
                    <Link
                        href={url}
                        className="badge badge-accent uppercase font-bold px-4 py-3"
                    >
                        {url}
                    </Link>
                    <div className="badge badge-primary uppercase font-bold px-4 py-3">
                        {category}
                    </div>
                </div>
                <p>{longDescription}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">
                        Publish
                        <i className="ri-check-line"></i>
                    </button>
                    <Link href="/review" className="btn btn-secondary">
                        Edit
                        <i className="ri-edit-line"></i>
                    </Link>
                    <button
                        className="btn btn-accent"
                        onClick={() => {
                            handlePostDelete(setPosts, postId);
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
