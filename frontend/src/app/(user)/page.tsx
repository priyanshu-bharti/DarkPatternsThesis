import AuthorCard from "@/components/cards/authorCard";
import InstallationCard from "@/components/cards/installationCard";
import { installationSteps } from "@/data/installationSteps";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <main className="container max-w-screen-xl mx-auto grid px-4 sm:px-12 lg:grid-cols-2 mt-12 sm:mt-32 gap-12">
                <header className="space-y-8">
                    <h1 className="text-5xl uppercase leading-tight font-bold">
                        Reveal <span className="text-primary">Deceptions </span>
                        Empower your UX Decisions.
                    </h1>

                    <p className="uppercase tracking-wider text-xl font-light">
                        Reveal all the dark patterns in a website with a single
                        click.
                    </p>

                    <button className="btn btn-primary">
                        <i className="ri-download-line"></i>
                        Download Extension
                    </button>
                </header>

                <div className="h-full">
                    <div className="mockup-window border border-primary bg-neutral h-full">
                        <div className="flex justify-center items-center px-4 py-16 border-t border-primary bg-base-300 h-full">
                            Hello!
                        </div>
                    </div>
                </div>
            </main>

            <div className="my-16 sm:my-32 bg-base-300 px-4 sm:px-12 py-16 sm:py-32">
                <div className="container max-w-screen-xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="space-y-8">
                            <h2 className="font-bold text-5xl uppercase">
                                How to{" "}
                                <span className="text-accent">Install</span>{" "}
                                Mr.Keeper
                            </h2>
                            <p className="text-justify">
                                The goal of this software was to reveal the
                                hidden manipulations that often goes unnoticed
                                in UI/UX, ensuring to reveal the subtle
                                manipulations employed by various different
                                websites. <br /> <br /> To simplify the task of
                                detecting and highlighting these deceptive
                                practices you can install our free extension or,
                                you could go to the page to learn about how to
                                manually detect dark patterns by clicking on the
                                button below.
                            </p>
                            <Link href="/learn" className="btn btn-accent">
                                Learn about Dark Patterns
                            </Link>
                        </div>

                        <div className="space-y-12 lg:col-span-2">
                            <div className="grid md:grid-cols-2 gap-12">
                                {installationSteps.map((step, count) => (
                                    <InstallationCard
                                        key={step}
                                        text={step}
                                        count={count + 1}
                                    />
                                ))}
                            </div>
                            <p className="text-right">
                                Trouble installing?{" "}
                                <a href="#" className="underline font-bold">
                                    Watch this tutorial video
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-screen-xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 sm:mb-32 px-4 sm:px-12">
                <AuthorCard />
                <div className="lg:col-span-2 space-y-12">
                    <h1 className="uppercase text-5xl font-bold max-w-sm">
                        from academia to public awareness.
                    </h1>
                    <p className="leading-loose text-justify">
                        Born from a master's thesis, this project's mission is
                        to educate the public about deceptive dark patterns in
                        digital interfaces, promoting ethical UI/UX practices.
                        Our open-source platform, available on Github, invites
                        contributions and utilizes a mix of technologies: Python
                        and Flask for the backend, plain JavaScript for the
                        Chrome extension, and Next.js for developing the landing
                        page and dark patterns library. We combine these tools
                        to offer a user-friendly experience that mirrors the
                        ethical design principles we advocate, encouraging
                        community involvement to foster a more transparent and
                        user-centric digital world.
                    </p>

                    <a href="#" className="btn btn-neutral">
                        <i className="ri-github-line"></i>
                        View Source Code on Github
                    </a>
                </div>
            </div>
        </>
    );
}
