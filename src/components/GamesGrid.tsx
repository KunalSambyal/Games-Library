import { useEffect, useState } from "react";

interface RawGame {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    genres: { name: string }[];
}

interface Props {
    filterOption: string;
}

const GamesGrid = ({ filterOption }: Props) => {
    const [gamesData, setGamesData] = useState<RawGame[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        async function fetchGames() {
            try {
                // await new Promise((resolve) => setTimeout(resolve, 5000));
                const response = await fetch("/games.json");
                const data = await response.json();
                if (!mounted) return;
                setGamesData(data.results as RawGame[]);
            } catch (error) {
                console.error("Error fetching games data:", error);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        }
        fetchGames();
        return () => {
            mounted = false;
        };
    }, []);

    if (isLoading) {
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
    }

    const filteredGames =
        filterOption === "All"
            ? gamesData
            : gamesData.filter((game) =>
                  game.genres.some((g) => g.name === filterOption),
              );

    if (!filteredGames.length) {
        return <div className="text-center text-red-400">No games found</div>;
    }

    return (
        <>
            {filteredGames.length === 0 ? (
                <div className="text-center text-red-400 mt-10">
                    No games found
                </div>
            ) : (
                <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 gap-3 rounded-2xl overflow-y-auto">
                    {filteredGames.map((game: any) => (
                        <div
                            key={game.id}
                            className="dark:bg-neutral-800 bg-amber-100 dark:text-neutral-50 rounded-2xl relative"
                        >
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="rounded-t-2xl w-full aspect-video object-cover"
                            />
                            <span className="absolute top-2 right-2 bg-black/60 text-emerald-400 text-xs px-1.5 py-1 rounded-full backdrop-blur-sm">
                                ⭐ {game.rating}
                            </span>

                            <div className="p-4 flex flex-col gap-y-2">
                                <div className="flex justify-between text-sm">
                                    <div className="flex flex-wrap gap-1">
                                        {game.genres.map(
                                            (g: { name: string }) => (
                                                <span
                                                    key={g.name}
                                                    className="text-xs px-2 py-0.5 rounded-lg dark:bg-neutral-700 bg-amber-300 dark:text-neutral-300 text-neutral-700"
                                                >
                                                    {g.name}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="font-semibold">{game.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default GamesGrid;
