import type { ReactElement } from "react";

function HamMenu() {
    let isActive = true;
    const hamMenuIcon: ReactElement = isActive ? (
        <i className="fa-solid fa-xmark"></i>
    ) : (
        <i className="fa-solid fa-bars"></i>
    );
    return (
        <button className="dark:hover:bg-neutral-700 hover:bg-neutral-200 duration-200 rounded-full p-1 cursor-pointer text-xl md:hidden block">
            {hamMenuIcon}
        </button>
    );
}

export default HamMenu;
