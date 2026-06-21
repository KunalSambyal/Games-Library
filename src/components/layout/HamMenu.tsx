import type { ReactElement } from "react";

interface HamMenuProps {
    isOpen: boolean;
    onClick: () => void;
    "aria-controls"?: string;
}

function HamMenu({ isOpen, onClick, "aria-controls": ariaControls }: HamMenuProps) {
    const hamMenuIcon: ReactElement = isOpen ? (
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
    ) : (
        <i className="fa-solid fa-bars" aria-hidden="true"></i>
    );
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={ariaControls}
            className="hover:bg-input duration-200 rounded-full p-1 cursor-pointer text-xl md:hidden block"
        >
            {hamMenuIcon}
        </button>
    );
}

export default HamMenu;
