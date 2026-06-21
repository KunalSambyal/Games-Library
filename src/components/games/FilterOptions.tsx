import { useSearchParams } from "react-router-dom";

const options: string[] = [
    "All",
    "Action",
    "Adventure",
    "Shooter",
    "RPG",
    "Puzzle",
    "Indie",
    "Strategy",
    "Simulation",
    "Racing",
    "Sports",
    "Fighting",
    "Platformer",
    "Massively Multiplayer",
    "Casual",
    "Arcade",
];

function FilterOptions() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeGenre = searchParams.get("genre") || "All";
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        const newParams = new URLSearchParams(searchParams);

        if (selectedValue === "All") {
            newParams.delete("genre");
        } else {
            newParams.set("genre", selectedValue);
        }

        setSearchParams(newParams);
    };

    const clearGenreFilter = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("genre");
        setSearchParams(newParams);
    };

    return (
        <div className="py-2 px-4 flex items-center gap-x-3">
            {/* Genre Select Dropdown */}
            <select
                name="genre"
                id="genreFilter"
                value={activeGenre}
                onChange={handleGenreChange}
                className="bg-app text-main px-2 py-1 rounded-sm outline-0 border-accent-border border cursor-pointer"
            >
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            
            {activeGenre !== "All" && (
                <span className="inline-flex items-center gap-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-muted text-accent-text border border-accent-border animate-fadeIn">
                    {activeGenre}
                    <button
                        onClick={clearGenreFilter}
                        className="hover:text-red-500 cursor-pointer font-bold text-xs flex items-center justify-center"
                        title="Clear genre filter"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </span>
            )}
        </div>
    );
}

export default FilterOptions;
