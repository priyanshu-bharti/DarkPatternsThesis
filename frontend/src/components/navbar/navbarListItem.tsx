import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

interface Props {
    path: Url;
    title: string;
    icon: string;
}

const NavbarListItem = ({ path, title, icon }: Props) => {
    return (
        <li className="py-2" >
            <Link href={path} className="flex gap-2 items-center">
                <i className={icon}></i>
                {title}
            </Link>
        </li>
    );
};

export default NavbarListItem;
