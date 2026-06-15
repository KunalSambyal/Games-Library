import type { ReactElement } from "react";
import Navbar from "./newComponents/Navbar";

// Navbar Assets
const navbarLogoIcon: ReactElement = <i className="fa-solid fa-gamepad"></i>;
const navbarLinksValue: string[] = ["Home", "WishList", "Favourite"];

const NewApp = () => {
    return (
        <div className="w-dvw h-screen flex flex-col">
            <Navbar logoIcon={navbarLogoIcon} navbarLinks={navbarLinksValue} />
        </div>
    );
};

export default NewApp;
