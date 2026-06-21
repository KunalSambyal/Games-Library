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
                        viewTransition
                        onClick={onLinkClick}
                        className={({ isActive }) =>
                            `duration-200 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                                isActive
                                    ? "bg-brand text-neutral-950 font-bold"
                                    : "text-muted hover:bg-input hover:text-main"
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
