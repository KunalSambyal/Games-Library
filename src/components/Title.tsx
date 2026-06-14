import { useState } from "react";
import GamesGrid from "./GamesGrid";

interface Props {
    heading: string;
    genreItems: string[];
}

const Title = ({ heading, genreItems }: Props) => {
    const [selectedFilter, setSelectedFilter] = useState<string>("All");
    function handleChnage(e?: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedFilter(String(e?.target.value));
    }
    return (
        <div className="dark:bg-neutral-900 bg-neutral-100 dark:text-white flex flex-col">
            {/* Heading */}
            <h1 className="text-4xl font-bold p-4 border-b dark:border-amber-200 border-amber-400">
                {heading}
            </h1>
            {/* Filter Options */}
            <div className="p-4">
                <label htmlFor="genreSelect" className="">
                    <select
                        name="genre"
                        id="genreFilter"
                        className="dark:bg-neutral-900 px-2 py-1 rounded-sm outline-0 dark:border-amber-200 border-amber-400 border"
                        onChange={handleChnage}
                    >
                        {genreItems.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {/* Games Grid */}
            <GamesGrid filterOption={selectedFilter} />
        </div>
    );
};

export default Title;
