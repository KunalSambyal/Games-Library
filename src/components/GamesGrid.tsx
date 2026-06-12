import { useEffect, useState } from "react";

interface RawGame {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    genres: { name: string }[];
}

const GamesGrid = () => {
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
    return (
        <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 gap-3 rounded-2xl">
            {gamesData.map((game: any) => (
                <div key={game.id} className="dark:bg-neutral-800 rounded-2xl">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="rounded-t-2xl bg-cover"
                    />

                    <div className="p-4">
                        <div className="flex justify-between text-sm">
                            <p className="text-neutral-400">
                                {game.genres[0]?.name}
                            </p>
                            <p className="text-emerald-500">{game.rating}</p>
                        </div>

                        <div className="font-semibold">{game.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GamesGrid;
