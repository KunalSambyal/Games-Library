import type { ReactElement } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

const navbarLogoIcon: ReactElement = <i className="fa-solid fa-gamepad"></i>;

const mainHeading: string = "Games";
const genreOptions: string[] = ["All", "Action", "Adventure", "RPG", "Shooter"];

const App = () => {
    return (
        <>
            <Navbar logoIcon={navbarLogoIcon} />
            <Main heading={mainHeading} genreItems={genreOptions} />
        </>
    );
};

export default App;
