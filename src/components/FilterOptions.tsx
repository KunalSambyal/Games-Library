import { useSearchParams } from "react-router-dom";

const options: string[] = [
    "All",
    "Action",
    "Adventure",
    "Shooter",
    "RPG",
    "Puzzle",
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
    return (
        <div className="py-2 px-4">
            <select
                name="genre"
                id="genreFilter"
                value={activeGenre}
                onChange={handleGenreChange}
                className="dark:bg-neutral-900 dark:text-white px-2 py-1 rounded-sm outline-0 dark:border-amber-200 border-amber-400 border"
            >
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterOptions;
