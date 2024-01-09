import React from "react";

export interface TimelineProps {
    count: number;
    title: string;
    description: string;
}

const Timeline = ({ count, title, description }: TimelineProps) => {
    const direction = count % 2 !== 0 ? "start" : "end";
    const color = count % 2 !== 0 ? "primary" : "accent";
    const textDirection = count % 2 === 0 ? "left" : "right";

    return (
        <li>
            {!count && <hr className={`bg-white`} />}
            <div className="timeline-middle">
                <i className={`ri-circle-fill text-${color}`}></i>
            </div>
            <div className={`timeline-${direction} mb-8`}>
                <div
                    className={`text-lg text-${color} text-${textDirection} font-bold uppercase`}
                >
                    {title}
                </div>
                <p className={`text-${textDirection}`}>{description}</p>
            </div>
            {!(count === 17) && <hr className={`bg-white`} />}
        </li>
    );
};

export default Timeline;
