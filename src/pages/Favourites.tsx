import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";
import FilterOptions from "../components/games/FilterOptions";
import GamesCard from "../components/games/GamesCard";
import { useFavourites } from "../context/useFavourites";

function Favourites() {
    const { favourites } = useFavourites();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const selectedGenre = searchParams.get("genre") || "All";

    useEffect(() => {
        document.title = "Favourites | Game Discovery Bay";
    }, []);

    const filteredFavourites = favourites.filter((game) => {
        const matchesSearch = game.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesGenre =
            selectedGenre === "All" ||
            game.genres.some(
                (g) => g.name.toLowerCase() === selectedGenre.toLowerCase()
            );

        return matchesSearch && matchesGenre;
    });

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <PageHeading heading="Favourite Games" />
            
            {favourites.length > 0 && <FilterOptions />}

            <div className="flex-1 overflow-y-auto p-2 scroll-smooth">
                {favourites.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-center p-6 transition-all duration-300">
                        <div className="w-24 h-24 mb-6 rounded-full bg-brand-muted flex justify-center items-center text-brand text-4xl animate-pulse">
                            <i className="fa-regular fa-heart"></i>
                        </div>
                        <h3 className="text-xl font-bold text-main mb-2">
                            No Favourites Yet
                        </h3>
                        <p className="max-w-md text-muted mb-6 text-sm">
                            Explore the library and click the heart icon on any game card to save them here for quick access.
                        </p>
                        <Link
                            to="/"
                            className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-neutral-950 font-semibold rounded-xl shadow-md transition-all duration-200"
                        >
                            Explore Games
                        </Link>
                    </div>
                ) : filteredFavourites.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-center p-6">
                        <div className="w-20 h-20 mb-4 rounded-full bg-input flex justify-center items-center text-muted text-3xl">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-main mb-1">
                            No Match Found
                        </h3>
                        <p className="max-w-xs text-xs text-muted">
                            We couldn't find any favorited games matching "{searchQuery}"
                            {selectedGenre !== "All" && ` in the "${selectedGenre}" genre`}.
                        </p>
                    </div>
                ) : (
                    <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 content-start">
                        {filteredFavourites.map((game) => (
                            <GamesCard key={game.id} Game={game} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favourites;
