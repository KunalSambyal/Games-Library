import { useFavourites } from "../../context/FavouritesContext";
import { type RawGame } from "../../types/game";

interface Props {
    Game: RawGame;
}

function GamesCard({ Game }: Props) {
    const { toggleFavourite, isFavourite } = useFavourites();
    const isFav = isFavourite(Game.id);

    const getCroppedImageUrl = (url: string) => {
        if (!url) return "";
        const target = "media/";
        if (!url.includes(target)) return url;
        const index = url.indexOf(target) + target.length;
        return url.slice(0, index) + "crop/600/400/" + url.slice(index);
    };

    return (
        <div
            key={Game.id}
            className="bg-card text-main rounded-2xl relative hover:scale-[1.02] transition-transform duration-200 group"
        >
            <img
                src={getCroppedImageUrl(Game.background_image)}
                alt={Game.name}
                loading="lazy"
                className="rounded-t-2xl w-full aspect-video object-cover"
            />
            <span className="absolute top-2 right-2 bg-black/60 text-emerald-400 text-xs px-1.5 py-1 rounded-full backdrop-blur-sm">
                ⭐ {Game.rating}
            </span>

            <div className="p-4 flex flex-col gap-y-2">
                <div className="flex justify-between text-sm">
                    <div className="flex flex-wrap gap-1">
                        {Game.genres.map((g: { name: string }) => (
                            <span
                                key={g.name}
                                className="text-xs px-2 py-0.5 rounded-lg bg-brand-muted text-accent-text"
                            >
                                {g.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-start gap-x-2">
                    <div className="font-semibold flex-1 text-sm md:text-base leading-snug">
                        {Game.name}
                    </div>
                    <button
                        onClick={() => toggleFavourite(Game)}
                        className={`transition-colors duration-200 cursor-pointer text-lg shrink-0 ${
                            isFav
                                ? "text-brand hover:text-brand-hover animate-like"
                                : "text-muted hover:text-brand"
                        }`}
                        title={
                            isFav
                                ? "Remove from Favourites"
                                : "Add to Favourites"
                        }
                    >
                        <i
                            className={
                                isFav
                                    ? "fa-solid fa-heart"
                                    : "fa-regular fa-heart"
                            }
                        ></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GamesCard;
