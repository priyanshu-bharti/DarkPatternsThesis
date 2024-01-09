import React from "react";
import NavbarLogo from "../navbar/navbarLogo";

const Footer = () => {
    return (
        <>
            <footer className="footer items-center p-4 bg-neutral text-neutral-content">
                <aside className="container mx-auto items-center flex flex-col sm:flex-row gap-4 justify-between w-full">
                    <NavbarLogo />
                    <p className="text-center flex-1">
                        Copyright © 2024 - All right reserved
                    </p>
                    <button className="btn btn-primary">
                        <i className="ri-download-line"></i>
                        Download Extension
                    </button>
                </aside>
            </footer>
        </>
    );
};

export default Footer;
