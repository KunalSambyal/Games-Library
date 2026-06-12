import React, { useState, useEffect } from "react";

interface Props {
    logoIcon?: React.JSX.Element;
}

type Theme = "light" | "dark";

const Navbar = ({ logoIcon }: Props) => {
    const [theme, setTheme] = useState<Theme>("light");

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
    return (
        <>
            <div className="dark:bg-neutral-950 dark:text-white flex h-14 items-center justify-between px-3 sm:px-6 gap-x-4 shadow-sm">
                {/* Logo */}
                <div className="sm:text-2xl text-xl cursor-pointer dark:hover:text-yellow-200 hover:text-yellow-400 duration-200">
                    {logoIcon}
                </div>
                {/*Search Bar*/}
                <div className="font-medium sm:grow flex items-center justify-center dark:bg-neutral-800 bg-neutral-200 h-8 sm:px-3 p-3 sm:rounded-2xl rounded-full sm:max-w-4xl sm:mx-4 ml-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        className="grow sm:block hidden outline-0"
                    />
                    <button className="sm:border-l border-neutral-500 sm:p-1 cursor-pointer dark:hover:text-yellow-200 hover:text-yellow-400 duration-200">
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
