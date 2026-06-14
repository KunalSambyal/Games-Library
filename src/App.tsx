import { type ReactElement } from "react";
import Title from "./components/Title";
import Navbar from "./components/Navbar";

const navbarLogoIcon: ReactElement = <i className="fa-solid fa-gamepad"></i>;

const mainHeading: string = "Games";
const genreOptions: string[] = ["All", "Action", "Adventure", "RPG", "Shooter"];

const App = () => {
    return (
        <div className="h-dvh flex flex-col">
            <Navbar logoIcon={navbarLogoIcon} />
            <Title heading={mainHeading} genreItems={genreOptions} />
        </div>
    );
};

export default App;
