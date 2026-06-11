interface Props {
    heading: string;
    genreItems: string[];
    gamesData: any;
}

const Grid = ({ heading, genreItems, gamesData }: Props) => {
    return (
        <>
            <div className="dark:bg-neutral-900 dark:text-white flex flex-col h-screen">
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
                                <option
                                    value={item}
                                    key={item}
                                    className="border-0"
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                {/* Games Grid */}
                <div className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 p-2 gap-3 rounded-2xl">
                    {gamesData.map((game: any) => (
                        <div
                            key={game.id}
                            className="dark:bg-neutral-800 rounded-2xl"
                        >
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
                                    <p className="text-emerald-500">
                                        {game.rating}
                                    </p>
                                </div>

                                <div className="font-semibold">{game.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Grid;
