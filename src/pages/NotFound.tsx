import { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
    useEffect(() => {
        document.title = "404 Page Not Found | Game Discovery Bay";
    }, []);

    return (
        <div className="h-full flex flex-col justify-center items-center text-center p-6 bg-app text-main" role="alert">
            <div className="w-24 h-24 mb-6 rounded-full bg-brand-muted flex justify-center items-center text-brand text-4xl">
                <i className="fa-solid fa-compass" aria-hidden="true"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
            <p className="max-w-md text-muted mb-6 text-sm">
                We couldn't find the page you were looking for. It might have been moved or deleted.
            </p>
            <Link
                to="/"
                className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-neutral-950 font-semibold rounded-xl shadow-md transition-all duration-200"
            >
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;
