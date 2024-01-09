import React from "react";
import NavbarListItem from "./navbarListItem";
import { navigationRoutes } from "@/data/routeNames";
import NavbarLogo from "./navbarLogo";
import NavbarMenuBtn from "./navbarMenuBtn";
import Link from "next/link";
import NavbarLoginButton from "./navbarLoginButton";

const NavigationBar = () => {
    return (
        <div className="navbar bg-base-100 p-4 lg:px-8">
            <div className="navbar-start gap-3">
                <div className="dropdown">
                    <NavbarMenuBtn />
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                    >
                        {navigationRoutes.map((route) => (
                            <NavbarListItem
                                icon={route.icon}
                                key={route.path}
                                path={route.path}
                                title={route.title}
                            />
                        ))}
                    </ul>
                </div>
                <NavbarLogo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navigationRoutes.map((route) => (
                        <NavbarListItem
                            icon={route.icon}
                            key={route.path}
                            path={route.path}
                            title={route.title}
                        />
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                <NavbarLoginButton />
            </div>
        </div>
    );
};

export default NavigationBar;
