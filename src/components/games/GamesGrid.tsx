import { useEffect, useState, useRef } from "react";
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

    // Infinite scroll states
    const ITEMS_PER_PAGE = 18;
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const observerTarget = useRef<HTMLDivElement | null>(null);

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

    // Reset page to 1 whenever filters change
    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedGenre]);

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

    const visibleGames = filteredGames.slice(0, page * ITEMS_PER_PAGE);
    const hasMore = visibleGames.length < filteredGames.length;

    // IntersectionObserver for Infinite Scroll
    useEffect(() => {
        if (!hasMore || loadingMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLoadingMore(true);
                    // Introduce a brief organic delay for loading animation feel
                    setTimeout(() => {
                        setPage((prevPage) => prevPage + 1);
                        setLoadingMore(false);
                    }, 500);
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loadingMore, visibleGames.length]);

    if (loading)
        return (
            <div className="flex-1 flex justify-center items-center min-h-0">
                <div className="relative w-20 h-20 flex justify-center items-center">
                    <div
                        className="absolute inset-2 rounded-full border-4 border-transparent border-b-brand opacity-60"
                        style={{ animation: "spin 2s linear infinite reverse" }}
                    ></div>

                    <i className="fa-solid fa-gamepad text-2xl text-brand animate-pulse"></i>
                </div>
            </div>
        );
    if (error) return <div>Error loading games: {error}</div>;

    return (
        // Grid Layout
        <div className="flex-1 grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 gap-3 overflow-y-auto content-start scroll-smooth">
            {filteredGames.length === 0 ? (
                <div className="col-span-full text-center py-10 text-muted">
                    No games found
                    {searchQuery && ` matching "${searchQuery}"`}
                    {selectedGenre !== "All" && ` in genre "${selectedGenre}"`}
                </div>
            ) : (
                <>
                    {visibleGames.map((game: RawGame) => (
                        <GamesCard key={game.id} Game={game} />
                    ))}
                    
                    {/* Infinite Scroll Sentinel */}
                    {hasMore && (
                        <div
                            ref={observerTarget}
                            className="col-span-full py-8 flex justify-center items-center"
                        >
                            <div className="relative w-10 h-10 flex justify-center items-center">
                                <div
                                    className="absolute inset-1 rounded-full border-3 border-transparent border-b-brand animate-spin"
                                    style={{ animationDuration: "1.2s" }}
                                ></div>
                                <i className="fa-solid fa-gamepad text-xs text-brand animate-pulse"></i>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default GamesGrid;
