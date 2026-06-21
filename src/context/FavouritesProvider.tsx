import React, { useState, useEffect, useCallback, useMemo } from "react";
import { type RawGame } from "../types/game";
import { FavouritesContext } from "./FavouritesContext";

export const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favourites, setFavourites] = useState<RawGame[]>(() => {
        try {
            const stored = localStorage.getItem("favourites");
            if (stored) {
                const parsed = JSON.parse(stored);
                return Array.isArray(parsed) ? parsed : [];
            }
            return [];
        } catch (error) {
            console.error("Failed to parse favourites from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("favourites", JSON.stringify(favourites));
        } catch (error) {
            console.error("Failed to save favourites to localStorage:", error);
        }
    }, [favourites]);

    const toggleFavourite = useCallback((game: RawGame) => {
        setFavourites((prev) => {
            const exists = prev.some((g) => g.id === game.id);
            if (exists) {
                return prev.filter((g) => g.id !== game.id);
            } else {
                return [...prev, game];
            }
        });
    }, []);

    // Create a Set of favorited IDs for O(1) checks during card rendering
    const favouriteIdsSet = useMemo(() => {
        return new Set(favourites.map((g) => g.id));
    }, [favourites]);

    const isFavourite = useCallback((id: number) => {
        return favouriteIdsSet.has(id);
    }, [favouriteIdsSet]);

    const providerValue = useMemo(() => ({
        favourites,
        toggleFavourite,
        isFavourite,
    }), [favourites, toggleFavourite, isFavourite]);

    return (
        <FavouritesContext.Provider value={providerValue}>
            {children}
        </FavouritesContext.Provider>
    );
};
