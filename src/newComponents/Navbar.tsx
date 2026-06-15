import { useEffect, useState, type ReactElement } from "react";

interface NavbarProps {
    logoIcon: ReactElement;
    navbarLinks: string[];
}

type Theme = "light" | "dark";

const Navbar = ({ logoIcon, navbarLinks }: NavbarProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        return savedTheme || "light";
    });
    useEffect(() => {
        const rootElement = window.document.documentElement;

        if (theme === "light") {
            rootElement.classList.add("dark");
        } else {
            rootElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    function handleThemeToggle() {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    const themeButtonIcon: ReactElement =
        theme === "light" ? (
            <i className="fa-regular fa-sun"></i>
        ) : (
            <i className="fa-regular fa-moon"></i>
        );
    return (
        <div className="dark:bg-neutral-950 dark:text-white flex h-14 items-center justify-between px-3 sm:px-6 gap-x-4 shadow-sm">
            {/* Logo */}
            <div className="sm:text-2xl text-xl cursor-pointer dark:hover:text-yellow-200 hover:text-yellow-400 duration-200">
                {logoIcon}
            </div>

            {/* Nav Links */}
            <div className="h-full flex items-center">
                <ul className="flex items-center gap-x-4">
                    {navbarLinks.map((link) => (
                        <li>
                            <a
                                className="hover:bg-neutral-600 px-2 py-1 rounded-sm font-semibold"
                                href={"#" + link}
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search and Theme */}
            <div className="flex items-center justify-end bg-red-700 gap-x-2 flex-1">
                {/* Search Bar */}
                <div className="w-full bg-amber-200">
                    {/* Input For Search */}
                    <input
                        type="text"
                        placeholder="Search"
                        className="h-10 bg-neutral-700 px-2 rounded-full"
                    />

                    {/* Search Button */}
                    <button>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                {/* Theme Button */}
                <button className="p-2" onClick={handleThemeToggle}>
                    {themeButtonIcon}
                </button>

                {/* HamMenu Button */}
                <button className="hidden">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
