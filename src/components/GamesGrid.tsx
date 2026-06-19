import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getGamesData } from "../services/api";

interface RawGame {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    genres: { name: string }[];
}

function GamesGrid() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const [games, setGames] = useState<RawGame[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getGamesData()
            .then((data) => {
                setGames(data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <div className="flex-1 flex justify-center items-center min-h-0">
                <div className="relative w-20 h-20 flex justify-center items-center">
                    <div
                        className="absolute inset-2 rounded-full border-4 border-transparent border-b-amber-400 dark:border-b-amber-400 opacity-60"
                        style={{ animation: "spin 2s linear infinite reverse" }}
                    ></div>

                    <i className="fa-solid fa-gamepad text-2xl text-amber-500 dark:text-amber-200 animate-pulse"></i>
                </div>
            </div>
        );
    if (error) return <div>Error loading games: {error}</div>;

    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        // Card
        <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 gap-3 overflow-y-auto">
            {filteredGames.length === 0 ? (
                <div className="col-span-full text-center py-10 dark:text-neutral-400 text-neutral-600">
                    No games found matching "{searchQuery}"
                </div>
            ) : (
                filteredGames.map((game: any) => (
                    <div
                        key={game.id}
                        className="dark:bg-neutral-800 bg-amber-100 dark:text-neutral-50 rounded-2xl relative hover:scale-[1.02] duration-200 group"
                    >
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="rounded-t-2xl w-full aspect-video object-cover"
                        />
                        <span className="absolute top-2 right-2 bg-black/60 text-emerald-400 text-xs px-1.5 py-1 rounded-full backdrop-blur-sm">
                            ⭐ {game.rating}
                        </span>
                        <span className="absolute top-2 left-2 text-amber-400 hidden group-hover:block hover:scale-[1.05] duration-200 cursor-pointer">
                            <i className="fa-regular fa-heart"></i>
                        </span>

                        <div className="p-4 flex flex-col gap-y-2">
                            <div className="flex justify-between text-sm">
                                <div className="flex flex-wrap gap-1">
                                    {game.genres.map((g: { name: string }) => (
                                        <span
                                            key={g.name}
                                            className="text-xs px-2 py-0.5 rounded-lg dark:bg-neutral-700 bg-amber-300 dark:text-neutral-300 text-neutral-700"
                                        >
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="font-semibold">{game.name}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default GamesGrid;
