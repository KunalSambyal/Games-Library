import { useEffect, useState, useRef, useMemo, useCallback } from "react";
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

    // Derived state sync during render (react-hooks/set-state-in-effect fix)
    const filterKey = `${searchQuery}|${selectedGenre}`;
    const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
    if (filterKey !== prevFilterKey) {
        setPrevFilterKey(filterKey);
        setPage(1);
    }

    // Fetch raw games with AbortController
    useEffect(() => {
        const controller = new AbortController();

        getGamesData(controller.signal)
            .then((data) => {
                setGames(data.results);
                setLoading(false);
                setError(null);
            })
            .catch((error) => {
                if (error.name === "AbortError") return;
                setError(error.message || "An error occurred");
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, []);

    // Memoize filtering to prevent execution on every page-increment re-render
    const filteredGames = useMemo(() => {
        return games.filter((game: RawGame) => {
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
    }, [games, searchQuery, selectedGenre]);

    const visibleGames = filteredGames.slice(0, page * ITEMS_PER_PAGE);
    const hasMore = visibleGames.length < filteredGames.length;

    // Use refs to avoid tearing down the observer on every page change
    const hasMoreRef = useRef(hasMore);
    const loadingMoreRef = useRef(loadingMore);

    useEffect(() => {
        hasMoreRef.current = hasMore;
        loadingMoreRef.current = loadingMore;
    }, [hasMore, loadingMore]);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const timeoutRef = useRef<number | undefined>(undefined);

    // Callback ref to bind observer to the sentinel element once it renders
    const observerTarget = useCallback((node: HTMLDivElement | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        if (node) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMoreRef.current && !loadingMoreRef.current) {
                        setLoadingMore(true);
                        
                        if (timeoutRef.current) {
                            window.clearTimeout(timeoutRef.current);
                        }

                        timeoutRef.current = window.setTimeout(() => {
                            setPage((prevPage) => prevPage + 1);
                            setLoadingMore(false);
                        }, 500);
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(node);
            observerRef.current = observer;
        }
    }, []);

    // Clean up timeout and observer on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    if (loading)
        return (
            <div className="flex-1 flex justify-center items-center min-h-0" role="status" aria-live="polite">
                <span className="sr-only">Loading games list...</span>
                <div className="relative w-20 h-20 flex justify-center items-center">
                    <div
                        className="absolute inset-2 rounded-full border-4 border-transparent border-b-brand opacity-60"
                        style={{ animation: "spin 2s linear infinite reverse" }}
                        aria-hidden="true"
                    ></div>

                    <i className="fa-solid fa-gamepad text-2xl text-brand animate-pulse" aria-hidden="true"></i>
                </div>
            </div>
        );
    if (error) return <div role="alert" className="p-4 text-red-500">Error loading games: {error}</div>;

    return (
        // Grid Layout
        <main className="flex-1 grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 p-2 gap-3 overflow-y-auto content-start scroll-smooth">
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
                            role="status"
                            aria-live="polite"
                        >
                            <span className="sr-only">Loading more games...</span>
                            <div className="relative w-10 h-10 flex justify-center items-center">
                                <div
                                    className="absolute inset-1 rounded-full border-3 border-transparent border-b-brand animate-spin"
                                    style={{ animationDuration: "1.2s" }}
                                    aria-hidden="true"
                                ></div>
                                <i className="fa-solid fa-gamepad text-xs text-brand animate-pulse" aria-hidden="true"></i>
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}

export default GamesGrid;
