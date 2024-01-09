import Timeline from "@/components/timeline/timeline";
import { darkPatternCategories } from "@/data/patternCategories";
import React from "react";

const LearnPage = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto mt-16 sm:mt-32 px-4 sm:px-12">
                <div className="space-y-8">
                    <h1 className="font-bold uppercase text-5xl">
                        What are
                        <br />{" "}
                        <span className="text-primary">dark patterns</span>?
                    </h1>
                    <p className="leading-loose tracking-wider">
                        UI/UX stands for User Interface and User Experience,
                        which encompass the design and usability of digital
                        products. Dark patterns in UI/UX are deceptive design
                        techniques that manipulate innocent users into taking
                        actions they might not have intended, For instance,
                        making purchases, signing up for services, or sharing
                        more personal information than necessary.
                        <br />
                        <br />
                        These patterns exploit psychological weaknesses and
                        design principles to subtly influence user behavior,
                        often prioritizing business goals over user needs and
                        leading to a less transparent, unfriendly experience.
                        They create a facade of choice while subtly guiding
                        users towards decisions beneficial to the service
                        provider, often at the user's expense.
                    </p>
                </div>

                <h1 className="font-bold uppercase text-4xl py-12 text-center">
                    <span className="text-accent">Categories</span> of Dark Patterns
                </h1>

                <ul className="timeline timeline-snap-icon timeline-vertical mb-16 sm:mb-32">
                    {darkPatternCategories.map((category, idx) => (
                        <Timeline
                            key={category.title}
                            count={idx + 1}
                            description={category.description}
                            title={category.title}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default LearnPage;
