import { createContext, useContext, useState, useEffect } from "react";
import { type RawGame } from "../types/game";

interface FavouritesContextType {
    favourites: RawGame[];
    toggleFavourite: (game: RawGame) => void;
    isFavourite: (id: number) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favourites, setFavourites] = useState<RawGame[]>(() => {
        try {
            const stored = localStorage.getItem("favourites");
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to parse favourites from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    const toggleFavourite = (game: RawGame) => {
        setFavourites((prev) => {
            const exists = prev.some((g) => g.id === game.id);
            if (exists) {
                return prev.filter((g) => g.id !== game.id);
            } else {
                return [...prev, game];
            }
        });
    };

    const isFavourite = (id: number) => {
        return favourites.some((g) => g.id === id);
    };

    return (
        <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = () => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error("useFavourites must be used within a FavouritesProvider");
    }
    return context;
};
