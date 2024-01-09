"use client";
import { darkPatternCategories } from "@/data/patternCategories";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import React, { useRef } from "react";

const SubmitPostPage = () => {
    const router = useRouter();
    const linkRef = useRef<HTMLInputElement>(null);
    const shortDescRef = useRef<HTMLTextAreaElement>(null);
    const longDescRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const imageFileRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = async () => {
        if (
            linkRef.current &&
            shortDescRef.current &&
            longDescRef.current &&
            categoryRef.current &&
            imageFileRef.current &&
            imageFileRef.current.files &&
            imageFileRef.current.files[0]
        ) {
            const formData = new FormData();

            // Append form values to the FormData object
            formData.append("url", linkRef.current.value);
            formData.append("category", categoryRef.current.value);
            formData.append("short_description", shortDescRef.current.value);
            formData.append("long_description", longDescRef.current.value);
            formData.append("file", imageFileRef.current.files[0]);

            try {
                // Make a POST request using Axios
                const response = await axios.post(
                    "http://localhost:5002/v1/posts",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log("Upload successful:", response.data);
                router.replace("/submit/completed");
            } catch (error: any) {
                console.error("Error uploading data:", error.message);
            }
        }
    };
    return (
        <div className="container mx-auto my-32 grid lg:grid-cols-3 gap-12">
            <div className="flex flex-col gap-12">
                <h1 className="text-5xl uppercase leading-tight font-bold">
                    Help us reveal the deceptions.
                </h1>
                <p className="uppercase tracking-wider text-xl font-light">
                    Help us uncover the dark patterns used in UI/UX to empower
                    more uninformed users. Your submissions help us create a
                    library of dark patterns to spread awareness and shame
                    culprits.
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
                        ref={linkRef}
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
                        ref={categoryRef}
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
                            ref={shortDescRef}
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
                            ref={longDescRef}
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
                        ref={imageFileRef}
                        className="file-input file-input-bordered file-input-warning w-full"
                    />
                    <button
                        onClick={handleFormSubmit}
                        className="btn btn-primary"
                    >
                        Submit
                        <i className="ri-check-line"></i>
                    </button>
                    <Link href="/wall-of-shame" className="btn btn-accent">
                        Discard
                        <i className="ri-delete-bin-line"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SubmitPostPage;
