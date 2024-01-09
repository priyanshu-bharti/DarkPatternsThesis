import DrinksSVG from "@/components/svg/drinks";
import Link from "next/link";
import React from "react";

const SubmitCompletedPage = () => {
    return (
        <div className="container flex flex-col gap-12 place-items-center py-32 max-w-lg mx-auto">
            <DrinksSVG />
            <h2 className="uppercase font-bold text-3xl text-center">
                Thank you for submitting. Your valuable contribution is sent for
                review.
            </h2>
            <Link href="/submit" className="w-full btn btn-primary">
                <i className="ri-sticky-note-add-line"></i>
                Submit a new response
            </Link>
            <Link href="/wall-of-shame" className="w-full btn btn-accent">
                <i className="ri-arrow-left-line"></i>
                Return to previous page
            </Link>
        </div>
    );
};

export default SubmitCompletedPage;
