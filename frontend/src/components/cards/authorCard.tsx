import { authorLinks, authorWebsite } from "@/data/authorLinks";
import React from "react";

const AuthorCard = () => {
    const badgeLink = authorLinks;
    const colors = ["primary", "accent", "secondary"];

    return (
        <div className="card bg-neutral text-neutral-content">
            <div className="card-body gap-8">
                <h2 className="card-title uppercase font-bold text-4xl">
                    Priyanshu Bharti
                </h2>
                <p className="uppercase tracking-wider">
                    I am a software engineering student specializing in
                    developing rich, accessible & scalable applications for web
                    and mobile platforms.
                    <br /> <br />
                    Additionally, I enjoy automating, scripting and creating CLI
                    Applications.
                </p>
                <div className="card-actions">
                    <a href={authorWebsite.link} className="btn" target="_blank">
                        <i className={authorWebsite.icon}></i>
                        {authorWebsite.title}
                    </a>
                </div>
                <div className="card-actions flex-col xl:flex-row">
                    {badgeLink.map((badge, index) => (
                        <a
                            key={badge.icon}
                            href={badge.link}
                            className={
                                "badge gap-2 px-4 py-3 badge-" + colors[index]
                            }
                        >
                            {" "}
                            <i className={badge.icon}></i>{" "}
                            <span className="text-sm font-bold">
                                {badge.title}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthorCard;
