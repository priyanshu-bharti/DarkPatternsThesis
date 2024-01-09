"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";
import React from "react";

const NavbarLoginButton = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [auth, setAuth] = React.useState("");
    const [buttonLabel, setButtonLabel] = React.useState("Login");

    React.useEffect(() => {
        setAuth(localStorage.getItem("auth_token") ?? "");
    }, []);

    React.useEffect(() => {
        setButtonLabel(auth ? "Log out" : "Login");
    }, [auth, pathname]);

    function logout() {
        setAuth("");
        localStorage.clear();
        deleteCookie("auth_token");
        router.replace("/");
    }

    function login() {
        setAuth(localStorage.getItem("auth_token") ?? "");
        router.replace("/login");
    }

    function handleClick() {
        if (auth) logout();
        else login();
    }

    return (
        <button className="btn btn-outline" onClick={handleClick}>
            <i className="ri-user-line"></i>
            {buttonLabel}
        </button>
    );
};

export default NavbarLoginButton;
