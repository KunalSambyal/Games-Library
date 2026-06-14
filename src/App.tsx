import { createContext, useState, type ReactElement } from "react";
import Title from "./components/Title";
import Navbar from "./components/Navbar";

const navbarLogoIcon: ReactElement = <i className="fa-solid fa-gamepad"></i>;

const mainHeading: string = "Games";
const genreOptions: string[] = ["All", "Action", "Adventure", "RPG", "Shooter"];

export const SearchContext = createContext<{
    searchValue: string;
    setSearchValue: (value: string) => void;
}>({
    searchValue: "",
    setSearchValue: () => {},
});

const App = () => {
    const [searchValue, setSearchValue] = useState("");
    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <div className="h-dvh flex flex-col">
                <Navbar logoIcon={navbarLogoIcon} />
                <Title heading={mainHeading} genreItems={genreOptions} />
            </div>
        </SearchContext.Provider>
    );
};

export default App;
