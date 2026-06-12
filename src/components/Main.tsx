import GamesGrid from "./GamesGrid";

interface Props {
    heading: string;
    genreItems: string[];
}

const Main = ({ heading, genreItems }: Props) => {
    return (
        <div className="dark:bg-neutral-900 dark:text-white flex flex-col">
            {/* Heading */}
            <h1 className="text-4xl font-bold p-4 border-b border-amber-200">
                {heading}
            </h1>
            {/* Filter Options */}
            <div className="p-4">
                <label htmlFor="genreSelect" className="">
                    <select
                        name="genre"
                        id="genreFilter"
                        className="dark:bg-neutral-900 px-2 py-1 rounded-sm outline-0 border-amber-200 border "
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
            <GamesGrid />
        </div>
    );
};

export default Main;
