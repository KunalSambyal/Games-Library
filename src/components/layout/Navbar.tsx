import { type ReactElement, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import HamMenu from "./HamMenu";
import ThemeButton from "./ThemeButton";
import NavLinks from "./NavLinks";

interface NavbarProps {
    logoIcon: ReactElement;
}

const Navbar = ({ logoIcon }: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    // Sync inputVal from URL searchQuery directly in render (react-hooks/set-state-in-effect fix)
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
    const [inputVal, setInputVal] = useState(searchQuery);

    if (searchQuery !== prevSearchQuery) {
        setPrevSearchQuery(searchQuery);
        setInputVal(searchQuery);
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams);
        if (inputVal.trim()) {
            newParams.set("search", inputVal.trim());
        } else {
            newParams.delete("search");
        }
        setSearchParams(newParams);
    };

    const handleClearSearch = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        setSearchParams(newParams);
    };

    return (
        <header className="relative bg-nav text-main flex h-14 items-center justify-between px-3 sm:px-6 gap-x-4 shadow-sm">
            {/* Logo */}
            <Link
                to={"/"}
                aria-label="Game Discovery Bay home"
                className="sm:text-2xl text-xl cursor-pointer hover:text-brand duration-200"
            >
                {logoIcon}
            </Link>

            {/* Nav Links */}
            <nav aria-label="Primary navigation" className="h-full md:flex items-center hidden">
                <NavLinks />
            </nav>

            {/* Search Bar*/}
            <div className="flex items-center max-w-xl w-full gap-x-1 ">
                <form
                    onSubmit={handleSearchSubmit}
                    role="search"
                    className="w-full bg-input rounded-full flex "
                >
                    <label htmlFor="navbar-search" className="sr-only">
                        Search games
                    </label>
                    {/* Input For Search */}
                    <input
                        id="navbar-search"
                        onChange={(e) => setInputVal(e.target.value)}
                        value={inputVal}
                        type="text"
                        placeholder="Search"
                        className="h-8 bg-none pl-3 rounded-full outline-none flex-1"
                    />

                    {/* Search Button */}
                    {inputVal && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            aria-label="Clear search"
                            className="h-8 px-2 text-muted hover:text-brand-hover cursor-pointer flex items-center justify-center text-sm"
                        >
                            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                        </button>
                    )}
                    <button
                        type="submit"
                        aria-label="Search"
                        className="bg-none duration-200 hover:text-brand-hover hover:cursor-pointer border-l border-accent-border w-10 h-8 flex items-center justify-center"
                    >
                        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                    </button>
                </form>

                {/* Theme Button */}
                <ThemeButton />

                {/* HamMenu Button */}
                <HamMenu
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-controls="mobile-navigation-menu"
                />
            </div>

            {/* Mobile Menu Dropdown Menu */}
            {isMobileMenuOpen && (
                <div
                    id="mobile-navigation-menu"
                    className="absolute top-14 left-0 w-full bg-card border-b border-accent-border md:hidden block z-50  shadow-md"
                >
                    <nav aria-label="Mobile navigation">
                        <NavLinks
                            className="flex flex-col gap-y-3 p-4 text-center font-bold"
                            onLinkClick={() => setIsMobileMenuOpen(false)}
                        />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
