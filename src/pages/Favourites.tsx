import PageHeading from "../components/PageHeading";
import FilterOptions from "../components/FilterOptions";
// import GamesGrid from "../components/GamesGrid";

function Favourites() {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <PageHeading heading="Favourite Games" />
            <FilterOptions />
        </div>
    );
}

export default Favourites;
