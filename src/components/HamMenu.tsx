import type { ReactElement } from "react";

interface HamMenuProps {
    isOpen: boolean;
    onClick: () => void;
}

function HamMenu({ isOpen, onClick }: HamMenuProps) {
    const hamMenuIcon: ReactElement = isOpen ? (
        <i className="fa-solid fa-xmark"></i>
    ) : (
        <i className="fa-solid fa-bars"></i>
    );
    return (
        <button
            onClick={onClick}
            className="dark:hover:bg-neutral-700 hover:bg-neutral-200 duration-200 rounded-full p-1 cursor-pointer text-xl md:hidden block"
        >
            {hamMenuIcon}
        </button>
    );
}

export default HamMenu;
