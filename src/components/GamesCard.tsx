import { useFavourites } from "../context/FavouritesContext";

interface RawGame {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    genres: { name: string }[];
}

interface Props {
    Game: RawGame;
}

function GamesCard({ Game }: Props) {
    const { toggleFavourite, isFavourite } = useFavourites();
    const isFav = isFavourite(Game.id);

    return (
        <div
            key={Game.id}
            className="dark:bg-neutral-800 bg-amber-100 dark:text-neutral-50 rounded-2xl relative hover:scale-[1.02] duration-200 group"
        >
            <img
                src={Game.background_image}
                alt={Game.name}
                className="rounded-t-2xl w-full aspect-video object-cover"
            />
            <span
                className="absolute top-2 right-2 bg-black/60 text-emerald-400 text-xs px-1.5 py-1 rounded-full backdrop-blur-sm"
            >
                ⭐ {Game.rating}
            </span>

            <div className="p-4 flex flex-col gap-y-2">
                <div className="flex justify-between text-sm">
                    <div className="flex flex-wrap gap-1">
                        {Game.genres.map((g: { name: string }) => (
                            <span
                                key={g.name}
                                className="text-xs px-2 py-0.5 rounded-lg dark:bg-neutral-700 bg-amber-300 dark:text-neutral-300 text-neutral-700"
                            >
                                {g.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-start gap-x-2">
                    <div className="font-semibold flex-1 text-sm md:text-base leading-snug">{Game.name}</div>
                    <button
                        onClick={() => toggleFavourite(Game)}
                        className={`transition-colors duration-200 cursor-pointer text-lg shrink-0 ${
                            isFav 
                                ? "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 animate-like" 
                                : "text-neutral-400 hover:text-amber-500 dark:text-neutral-500 dark:hover:text-amber-400"
                        }`}
                        title={isFav ? "Remove from Favourites" : "Add to Favourites"}
                    >
                        <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GamesCard;
