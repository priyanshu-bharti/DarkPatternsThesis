import React from "react";

const InstallationCard = ({ text, count }: { text: string; count: number }) => {
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img src="https://placehold.co/600x400" alt="Shoes" />
            </figure>
            <div className="card-body">
                <p className="badge badge-accent font-bold uppercase">
                    Step {count}
                </p>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default InstallationCard;
