import GamesGrid from "../components/games/GamesGrid";
import PageHeading from "../components/common/PageHeading";
import FilterOptions from "../components/games/FilterOptions";

function Home() {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <PageHeading heading="Games" />
            <FilterOptions />
            <GamesGrid />
        </div>
    );
}

export default Home;
