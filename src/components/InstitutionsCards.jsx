//Necessary imports:
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Import / Declare the local host:
const API_URL ="https://crowdfunding-app-server.onrender.com";

function InstitutionsCards () {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

 /*    useEffect(() => {
        axios
        .get(`${API_URL}/api/institutions`)
        .then((response) => {
            setInstitutions(response.data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
        
    }, []); */

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${API_URL}/api/institutions`);
            setInstitutions(response.data);
            setLoading(false);
          } catch (error) {
            setError("An error occured while loading the page. Please try again later.");
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      if (loading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center space-y-4">
              <svg
                className="animate-spin h-12 w-12 text-sky-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.764 0-5.236-1.122-7.071-2.929z"
                ></path>
              </svg>
              <p className="text-gray-500">Loading...</p>
            </div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          </div>
        );
      }
    return (
        <div className="flex flex-col gap-10 border-sky-500 m-10">
            {institutions.map ((institution) => (
                <div key={institution._id} className="max-w-sm-md-lg rounded overflow-hidden shadow-lg  pl-0.5 w-3/5 h-96 border-2 border-gray-500 p-4">
                    <Link to={`/institutions-details-page/${institution._id}`}>
                        <div className="p-2">
                        <h2 className="font-bold text-sky-700 text-xl mb-2">{institution.name}</h2>
                        <img src={institution.image} alt="" className="w-500 h-300 object-cover"/>
                        <p className="text-gray-700 text-sky-700 text-base">{institution.type}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default InstitutionsCards;