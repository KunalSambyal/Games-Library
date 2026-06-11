import Grid from "./components/Grid";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";

interface RawGame {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    genres: { name: string }[];
}

const genreOptions: string[] = ["All", "Action", "Adventure", "RPG", "Shooter"];

const App = () => {
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
        <>
            <Navbar logoIcon={<i className="fa-solid fa-gamepad"></i>} />
            <Grid
                heading="Games"
                genreItems={genreOptions}
                gamesData={gamesData}
            />
        </>
    );
};

export default App;
