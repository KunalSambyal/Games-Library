import { NavLink } from "react-router-dom";

interface NavLinksProps {
    className?: string;
    onLinkClick?: () => void;
}

function NavLinks({
    className = "flex items-center gap-x-4",
    onLinkClick,
}: NavLinksProps) {
    const navbarLinks: string[] = ["Home", "WishList", "Favourites"];
    return (
        <ul className={className}>
            {navbarLinks.map((link, index) => (
                <li key={link}>
                    <NavLink
                        onClick={onLinkClick}
                        className={({ isActive }) =>
                            `duration-200 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                                isActive
                                    ? "bg-amber-400 text-neutral-900 dark:bg-amber-300 dark:text-neutral-950 font-bold"
                                    : "dark:text-neutral-300 text-neutral-600 dark:hover:bg-neutral-800 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:text-white"
                            }`
                        }
                        to={index === 0 ? "/" : "/" + link.toLocaleLowerCase()}
                    >
                        {link}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default NavLinks;
