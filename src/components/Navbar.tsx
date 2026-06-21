import { type ReactElement, useState, useEffect } from "react";
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

    const [inputVal, setInputVal] = useState("");

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

    useEffect(() => {
        setInputVal(searchQuery);
    }, [searchQuery]);

    const handleClearSearch = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        setSearchParams(newParams);
    };

    return (
        <div className="relative dark:bg-neutral-950 dark:text-white flex h-14 items-center justify-between px-3 sm:px-6 gap-x-4 shadow-sm">
            {/* Logo */}
            <Link
                to={"/"}
                className="sm:text-2xl text-xl cursor-pointer dark:hover:text-yellow-200 hover:text-yellow-400 duration-200"
            >
                {logoIcon}
            </Link>

            {/* Nav Links */}
            <div className="h-full md:flex items-center hidden">
                <NavLinks />
            </div>

            {/* Search Bar*/}
            <div className="flex items-center max-w-xl w-full gap-x-1 ">
                <form
                    onSubmit={handleSearchSubmit}
                    className="w-full dark:bg-neutral-700 bg-neutral-200 rounded-full flex "
                >
                    {/* Input For Search */}
                    <input
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
                            className="h-8 px-2 text-neutral-400 dark:hover:text-amber-200 hover:text-amber-400 cursor-pointer flex items-center justify-center text-sm"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-none duration-200 dark:hover:text-amber-200 hover:text-amber-400 hover:cursor-pointer border-l border-neutral-400 w-10 h-8 flex items-center justify-center"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {/* Theme Button */}
                <ThemeButton />

                {/* HamMenu Button */}
                <HamMenu
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
            </div>

            {/* Mobile Menu Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-14 left-0 w-full dark:bg-neutral-900 bg-amber-100 border-b dark:border-neutral-800 border-amber-300 md:hidden block z-50  shadow-md">
                    <NavLinks
                        className="flex flex-col gap-y-3 p-4 text-center font-bold"
                        onLinkClick={() => setIsMobileMenuOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
