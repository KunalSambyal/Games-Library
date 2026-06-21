import { useState, useEffect, type ReactElement } from "react";

type Theme = "light" | "dark";

function ThemeButton() {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
    });
    useEffect(() => {
        const rootElement = window.document.documentElement;

        if (theme === "dark") {
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
        theme === "dark" ? (
            <i className="fa-regular fa-sun" aria-hidden="true"></i>
        ) : (
            <i className="fa-regular fa-moon" aria-hidden="true"></i>
        );
    return (
        <button
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={theme === "dark"}
            className="p-2 hover:bg-input hover:text-brand duration-200 rounded-full cursor-pointer flex justify-center items-center text-xl"
            onClick={handleThemeToggle}
        >
            {themeButtonIcon}
        </button>
    );
}

export default ThemeButton;
