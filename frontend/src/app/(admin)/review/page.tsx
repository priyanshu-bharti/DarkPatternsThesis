import { darkPatternCategories } from "@/data/patternCategories";
import Link from "next/link";
import React from "react";

const ReviewPage = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="flex flex-col gap-12">
                <h1 className="text-5xl uppercase leading-tight font-bold">
                    Review this submission
                </h1>
                <p className="uppercase tracking-wider text-xl font-light">
                    Carefully review this submission, once deleted will be lost forever.
                </p>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
                {/* Field for entering website link */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Link of the Website*</span>
                    </div>
                    <input
                        type="text"
                        placeholder="https://www.example.com"
                        className="input input-bordered w-full input-primary"
                    />
                </label>

                {/* Dropdown for choosing the category of pattern */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">
                            Category of Dark Pattern*
                        </span>
                    </div>
                    <select
                        defaultValue="none"
                        className="select select-secondary w-full"
                    >
                        <option value="none">No Category Selected</option>
                        {darkPatternCategories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="grid grid-cols-2 gap-12">
                    {/* Short Description of what the pattern is  */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">
                                Short Description*
                            </span>
                        </div>
                        <textarea
                            rows={5}
                            placeholder="https://www.example.com"
                            maxLength={100}
                            className="textarea textarea-bordered w-full h-full textarea-accent"
                        />
                        <div className="label">
                            <span className="label-text-alt text-accent">
                                Max 60 Characters Allowed
                            </span>
                        </div>
                    </label>

                    {/* Long Description of what the pattern is  */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">
                                Long Description*
                            </span>
                        </div>
                        <textarea
                            rows={5}
                            placeholder="https://www.example.com"
                            className="textarea textarea-bordered w-full h-full textarea-accent"
                        />
                        <div className="label">
                            <span className="label-text-alt text-accent">
                                Max 300 Characters Allowed
                            </span>
                        </div>
                    </label>
                </div>
                <div className="grid grid-cols-3 gap-12">
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-warning w-full"
                    />
                    <Link href="/dashboard" className="btn btn-primary">
                        Submit
                        <i className="ri-check-line"></i>
                    </Link>
                    <Link href="/dashboard" className="btn btn-accent">
                        Discard
                        <i className="ri-delete-bin-line"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
