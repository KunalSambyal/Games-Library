import { Link } from "react-router-dom";

function NavLinks() {
    const navbarLinks: string[] = ["Home", "WishList", "Favourites"];
    return (
        <ul className="flex items-center gap-x-4">
            {navbarLinks.map((link, index) => (
                <li key={link}>
                    <Link
                        className="dark:hover:bg-neutral-600 hover:bg-neutral-200 duration-200 px-2 py-1 rounded-sm font-semibold"
                        to={index === 0 ? "/" : "/" + link.toLocaleLowerCase()}
                    >
                        {link}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default NavLinks;
