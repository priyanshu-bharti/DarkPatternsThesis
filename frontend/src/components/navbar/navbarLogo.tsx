import Link from "next/link";
import React from "react";

const NavbarLogo = () => {
    return (
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
            <i className="ri-search-eye-line"></i>
            <span>Mr.Keeper</span>
        </Link>
    );
};

export default NavbarLogo;
