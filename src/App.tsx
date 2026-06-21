import { Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";

import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Favourites from "./pages/Favourites";
import WishList from "./pages/WishList";
import { FavouritesProvider } from "./context/FavouritesContext";

// Navbar Assets
const navbarLogoIcon: ReactElement = <i className="fa-solid fa-gamepad"></i>;

const App = () => {
    return (
        <FavouritesProvider>
            <div className="flex flex-col h-dvh bg-app text-main overflow-hidden">
                <Navbar logoIcon={navbarLogoIcon} />
                <div className="flex-1 overflow-hidden">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/favourites" element={<Favourites />}></Route>
                        <Route path="/wishlist" element={<WishList />}></Route>
                    </Routes>
                </div>
            </div>
        </FavouritesProvider>
    );
};

export default App;
