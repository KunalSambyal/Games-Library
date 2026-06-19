import GamesGrid from "../components/GamesGrid";
import PageHeading from "../components/PageHeading";
import FilterOptions from "../components/FilterOptions";

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
