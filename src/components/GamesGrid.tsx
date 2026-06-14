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
    useEffect(() => {
        let mounted = true;
        async function fetchGames() {
            const response = await fetch("/games.json");
            const data = await response.json();
            if (!mounted) return;
            setGamesData(data.results as RawGame[]);
        }
        fetchGames();
        return () => {
            mounted = false;
        };
    }, []);

    const filteredGames =
        filterOption === "All"
            ? gamesData
            : gamesData.filter((game) =>
                  game.genres.some((g) => g.name === filterOption),
              );

    if (!filteredGames.length) {
        return <div className="text-center text-red-400">No games found</div>;
    }

    console.log(filteredGames);

    return (
        <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 gap-3 rounded-2xl">
            {filteredGames.map((game: any) => (
                <div
                    key={game.id}
                    className="dark:bg-neutral-800 bg-amber-100 dark:text-neutral-50 rounded-2xl"
                >
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="rounded-t-2xl bg-cover"
                    />

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
                            <p className="dark:text-emerald-500 text-emerald-700">
                                {game.rating}
                            </p>
                        </div>

                        <div className="font-semibold">{game.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GamesGrid;
