import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getGamesData } from "../../services/api";
import GamesCard from "./GamesCard";
import { type RawGame } from "../../types/game";

function GamesGrid() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const selectedGenre = searchParams.get("genre") || "All";

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

    const filteredGames = games.filter((game: RawGame) => {
        const matchesSearch = game.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesGenre =
            selectedGenre === "All" ||
            game.genres.some(
                (g) => g.name.toLowerCase() === selectedGenre.toLowerCase(),
            );

        return matchesSearch && matchesGenre;
    });

    return (
        // Grid Layout
        <div className="flex-1 grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 gap-3 overflow-y-auto content-start">
            {filteredGames.length === 0 ? (
                <div className="col-span-full text-center py-10 dark:text-neutral-400 text-neutral-600">
                    No games found
                    {searchQuery && ` matching "${searchQuery}"`}
                    {selectedGenre !== "All" && ` in genre "${selectedGenre}"`}
                </div>
            ) : (
                filteredGames.map((game: RawGame) => (
                    <GamesCard key={game.id} Game={game} />
                ))
            )}
        </div>
    );
}

export default GamesGrid;
