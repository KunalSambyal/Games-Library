import { useEffect } from "react";
import PageHeading from "../components/common/PageHeading";

function WishList() {
    useEffect(() => {
        document.title = "Wishlist | Game Discovery Bay";
    }, []);

    return (
        <>
            <PageHeading heading="Wishlist" />
        </>
    );
}

export default WishList;
