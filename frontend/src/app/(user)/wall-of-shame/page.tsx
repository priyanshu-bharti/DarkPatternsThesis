"use client";

import Link from "next/link";
import React from "react";
import { demoTweetIds } from "@/data/tweets";
import EmbedTweet from "@/components/tweets/tweet";
import axios from "axios";

interface Stats {
    url: string;
    dark_pattern_count: number;
    website_score: number;
    word_cloud: string;
}

interface StatsDarkPatternData {
    word_cloud: string;
    dark_pattern_count: number;
    url: string;
    website_score: number;
}

const WallOfShamePage = () => {
    const statisticsRef = React.useRef(null);
    const [stats, setStats] = React.useState<Stats[]>([]);
    const [selectedStat, setSelectedStat] = React.useState<Stats | undefined>();
    const [statsDarkPattern, setStatsarkPattern] =
        React.useState<StatsDarkPatternData | null>(null);
    React.useEffect(() => {
        const getStatistics = async () => {
            const response = await axios.get(
                "http://localhost:5002/v1/statistics/all"
            );
            const allStats = response.data.data as Stats[];
            setStats(allStats);
        };
        getStatistics();
    }, []);

    const handleStatsChange = async () => {
        if (statisticsRef.current.value) {
            const statisticsData = await axios.get(
                `http://localhost:5002/v1/statistics?url=${statisticsRef.current.value}`
            );
            const updatedStatics = statisticsData.data
                .data as StatsDarkPatternData;
            console.log("hello workd", updatedStatics);
            setStatsarkPattern(updatedStatics);
        }
    };

    return (
        <>
            <div className="container mx-auto grid lg:grid-cols-2 my-16 sm:my-32 gap-16 px-4 sm:px-12">
                {/* Left Column - Call to Action */}
                <div className="flex flex-col gap-12">
                    {/* Heading */}
                    <h1 className="text-5xl uppercase leading-tight font-bold">
                        Welcome to the great wall of Shame.
                    </h1>

                    {/* Context paragraph */}
                    <p className="uppercase tracking-wider text-xl font-light">
                        This is the place where we dishonor all the culprits for
                        using deceptive techniques for making a quick buck out
                        of their users.
                    </p>

                    {/* CTA - Description */}
                    <p className="">
                        Noticed the use of a dark pattern somewhere? Spread
                        awareness by{" "}
                        <Link href="/submit" className="font-bold underline">
                            Submitting a dark pattern
                        </Link>{" "}
                        or{" "}
                        <Link href="/" className="font-bold underline">
                            Download Mr.Keeper chromium extension.
                        </Link>
                    </p>

                    {/* CTA - Button */}
                    <Link href="/submit" className="btn btn-primary">
                        <i className="ri-sticky-note-add-line"></i>
                        Submit Dark Pattern
                    </Link>
                </div>

                {/* Right Column - Statistics */}
                <div className="flex flex-col justify-content-start gap-4 bg-base-300 p-4 sm:p-12 rounded-xl border border-gray-800">
                    <h1 className="text-2xl font-bold uppercase">
                        View Statistics
                    </h1>

                    {/* Dropdown for choosing Domains */}
                    <label className="form-control w-full py-4">
                        <div className="label font-bold uppercase">
                            <span className="label-text">
                                Please choose a domain
                            </span>
                        </div>
                        <select
                            defaultValue="none"
                            className="select select-secondary w-full"
                            ref={statisticsRef}
                            onChange={handleStatsChange}
                        >
                            <option value="none">No Domain Selected</option>
                            {stats.map((stat) => (
                                <option value={stat.url}>{stat.url}</option>
                            ))}
                            {}
                        </select>
                    </label>
                    {/* Container to show when api call is calling  */}
                    {statsDarkPattern?.url && (
                        <div className="flex flex-col justify-center items-center gap-10">
                            {/* Currently Viewing Heading */}
                            <h1 className="text-lg font-bold text-center">
                                Currently Viewing:{" "}
                                <span className="uppercase text-secondary"></span>
                            </h1>

                            {/* Pattern Count and Score Statistics */}
                            <div className="stats shadow bg-base-300">
                                <div className="stat text-center">
                                    <div className="stat-title">
                                        Website Score
                                    </div>
                                    <div className="stat-value text-accent">
                                        {statsDarkPattern?.website_score}/10
                                    </div>
                                    <div className="stat-desc">
                                        *Higher is Better
                                    </div>
                                </div>
                                <div className="stat text-center">
                                    <div className="stat-title">
                                        Dark Pattern Count
                                    </div>
                                    <div className="stat-value text-primary">
                                        {statsDarkPattern?.dark_pattern_count}
                                    </div>
                                    <div className="stat-desc">
                                        *Lower is Better
                                    </div>
                                </div>
                            </div>

                            {/* Word Cloud Image */}
                            <figure className="max-h-80 overflow-hidden">
                                <img
                                    // src={`data:image/jpeg;base64,${statsDarkPattern?.word_cloud}`}
                                    src={`data:image/png;base64, ${statsDarkPattern?.word_cloud}`}
                                    alt="Word Cloud Goes Here"
                                    className="max-h-48 w-full flex-1 object-cover rounded-xl border border-accent grayscale"
                                />
                                <figcaption className="py-2 text-sm text-center">
                                    Word Cloud for:{" "}
                                    <span className="text-primary">
                                        {statsDarkPattern?.url}
                                    </span>
                                </figcaption>
                            </figure>
                        </div>
                    )}
                </div>
            </div>
            {/* Tweets Section Starts Here */}
            <div className="container mx-auto pt-16 pb-16 border-t border-t-secondary grid gap-2 px-4 sm:px-12">
                <h1 className="text-4xl font-bold">
                    Community Exposé on{" "}
                    <span className="text-primary">Twitter</span>
                </h1>
                <p>
                    Some companies getting exposed by their usage of dark
                    patterns in their apps and websites by people.
                </p>
            </div>

            <div className="container mx-auto sm:columns-2 gap-x-3 md:columns-3 md:gap-4 lg:columns-4 lg:gap-6 mb-16 sm:mb-32 px-4 sm:px-12">
                {demoTweetIds.map((id) => (
                    <EmbedTweet key={id} id={id} />
                ))}
            </div>
        </>
    );
};

export default WallOfShamePage;
