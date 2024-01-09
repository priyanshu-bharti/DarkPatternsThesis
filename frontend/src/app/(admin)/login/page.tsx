"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const LoginPage = () => {
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter();
    const handleSignIn = () => {
        if (!emailRef.current?.value || !passwordRef.current?.value) {
            alert("email or password is required");
        }
        axios
            .post("http://localhost:5002/v1/login", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            })
            .then((response) => {
                localStorage.setItem("auth_token", response.data.accessToken);
                setCookie("auth_token", response.data.accessToken);
                router.replace("/dashboard");
            })
            .catch((err) => {
                console.log("error occurced", err);
                alert(err.response.data.message);
            });
    };
    return (
        <div className="container mt-12 grid grid-cols-2">
            <div className=""></div>
            <div className="bg-base-300 p-12 rounded-xl flex flex-col gap-6">
                <h1 className="text-4xl uppercase leading-tight font-bold">
                    Login
                </h1>

                <p className="">
                    Please enter your login credentials to continue.
                </p>

                {/* Email */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email Address*</span>
                    </div>
                    <input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        className="input input-bordered w-full input-primary"
                        ref={emailRef}
                    />
                </label>

                {/* Password */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password*</span>
                    </div>
                    <input
                        type="password"
                        placeholder="************"
                        ref={passwordRef}
                        className="input input-bordered w-full input-primary"
                    />
                </label>

                {/* Button */}
                <button className="btn btn-accent mt-6" onClick={handleSignIn}>
                    Continue to Dashboard
                    <i className="ri-arrow-right-line"></i>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
