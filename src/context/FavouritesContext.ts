import { createContext } from "react";
import { type RawGame } from "../types/game";

export interface FavouritesContextType {
    favourites: RawGame[];
    toggleFavourite: (game: RawGame) => void;
    isFavourite: (id: number) => boolean;
}

export const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);
