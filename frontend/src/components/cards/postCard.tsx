import Link from "next/link";
import React from "react";

interface Props {
    image?: string;
    shortDescription: string;
    longDescription: string;
    url: string;
    category: string;
}

const PostCard = ({
    image,
    category,
    longDescription,
    shortDescription,
    url,
}: Props) => {
    return (
        <div className="card bg-base-300 border border-gray-700">
            <figure className="max-h-64 ">
                <img
                    src={`data:image/png;base64, ${image}`}
                    alt="Shoes"
                    className="w-full object-cover"
                />
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
            </div>
        </div>
    );
};

export default PostCard;
