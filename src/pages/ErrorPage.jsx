import pageNotFound from "../assets/404-page-not-found.svg"
import { Link } from "react-router-dom";

function ErrorPage () {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10 " >
            <h1></h1>
            <img src= {pageNotFound} alt="Page not found" className="w-full h-full pt-10" />
            
            <Link>
            <h1 className="text-3xl font-bold text-gray-800 text-center pt-10">Nothing here... Back to the <u className="text-sky-500">Home</u> page </h1>
            </Link>
        </div>
    )
}

export default ErrorPage;