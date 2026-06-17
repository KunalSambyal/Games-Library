import { Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Favourites from "./pages/Favourites";
import WishList from "./pages/WishList";

// Navbar Assets
const navbarLogoIcon: ReactElement = <i className="fa-solid fa-gamepad"></i>;
const navbarLinksValue: string[] = ["Home", "WishList", "Favourites"];

const App = () => {
    return (
        <>
            <Navbar logoIcon={navbarLogoIcon} navbarLinks={navbarLinksValue} />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/favourites" element={<Favourites />}></Route>
                <Route path="/wishlist" element={<WishList />}></Route>
            </Routes>
        </>
    );
};

export default App;
