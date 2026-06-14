import React, { useState, useEffect, useContext } from "react";

import { SearchContext } from "../App";

interface Props {
    logoIcon?: React.JSX.Element;
}

type Theme = "light" | "dark";

const Navbar = ({ logoIcon }: Props) => {
    // Theme Toggle
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        return savedTheme || "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);
    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Searchbar Input

    const { searchValue, setSearchValue } = useContext(SearchContext);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
        console.log(event.target.value);
    }

    return (
        <>
            <div className="dark:bg-neutral-950 dark:text-white flex h-14 items-center justify-between px-3 sm:px-6 gap-x-4 shadow-sm">
                {/* Logo */}
                <div className="sm:text-2xl text-xl cursor-pointer dark:hover:text-yellow-200 hover:text-yellow-400 duration-200">
                    {logoIcon}
                </div>
                {/*Search Bar*/}
                <div className="font-medium grow flex items-center justify-center dark:bg-neutral-800 bg-neutral-200 h-8 px-3 rounded-full max-w-4xl mx-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="grow outline-0"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                    <button className="border-l border-neutral-500 px-1 cursor-pointer dark:hover:text-yellow-200 hover:text-yellow-400 duration-200">
                        <i className="fa-solid fa-magnifying-glass "></i>
                    </button>
                </div>
                {/*Theme Change*/}
                <button
                    onClick={handleThemeToggle}
                    className="h-8 dark:hover:text-yellow-200 
                    hover:text-yellow-400 duration-200 cursor-pointer p-3 dark:bg-neutral-800 bg-neutral-300 rounded-full flex items-center justify-center"
                >
                    <i className="fa-solid fa-moon"></i>
                </button>
            </div>
        </>
    );
};

export default Navbar;
