//Necessary imports:
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Import / Declare the local host:
const API_URL = "https://crowdfunding-app-server.onrender.com";

function InstitutionsCards () {
    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        axios
        .get(`${API_URL}/institutions`)
        .then((response) => {
            setInstitutions(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

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