import { useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import HamMenu from "./HamMenu";
import ThemeButton from "./ThemeButton";

interface NavbarProps {
    logoIcon: ReactElement;
    navbarLinks: string[];
}

type Theme = "light" | "dark";

const Navbar = ({ logoIcon, navbarLinks }: NavbarProps) => {
    return (
        <div className="dark:bg-neutral-950 dark:text-white flex h-14 items-center justify-between px-3 sm:px-6 gap-x-4 shadow-sm">
            {/* Logo */}
            <Link
                to={"/"}
                className="sm:text-2xl text-xl cursor-pointer dark:hover:text-yellow-200 hover:text-yellow-400 duration-200"
            >
                {logoIcon}
            </Link>

            {/* Nav Links */}
            <div className="h-full md:flex items-center hidden">
                <ul className="flex items-center gap-x-4">
                    {navbarLinks.map((link, index) => (
                        <li key={link}>
                            <Link
                                className="dark:hover:bg-neutral-600 hover:bg-neutral-200 duration-200 px-2 py-1 rounded-sm font-semibold"
                                to={
                                    index === 0
                                        ? "/"
                                        : "/" + link.toLocaleLowerCase()
                                }
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search and Theme */}
            <div className="flex items-center max-w-xl w-full gap-x-2 ">
                {/* Search Bar */}
                <div className="w-full dark:bg-neutral-700 bg-neutral-200 rounded-full flex ">
                    {/* Input For Search */}
                    <input
                        type="text"
                        placeholder="Search"
                        className="h-8 bg-none pl-3 rounded-full outline-none flex-1"
                    />

                    {/* Search Button */}
                    <button className="pr-1 bg-none duration-200 dark:hover:text-amber-200 hover:text-amber-400 hover:cursor-pointer border-l border-neutral-400 w-8 h-8 flex items-center justify-center">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                {/* Theme Button */}
                <ThemeButton />

                {/* HamMenu Button */}
                <HamMenu />
            </div>
        </div>
    );
};

export default Navbar;
