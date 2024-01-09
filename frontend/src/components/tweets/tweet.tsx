import React from "react";
import { Tweet } from "react-tweet";

const EmbedTweet = ({ id }: { id: string }) => {
    return (
        <div className="first-of-type:-mt-6">
            <Tweet id={id}></Tweet>
        </div>
    );
};

export default EmbedTweet;
