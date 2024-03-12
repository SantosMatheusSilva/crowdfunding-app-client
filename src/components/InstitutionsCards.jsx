//Necessary imports:
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function InstitutionsCards () {
    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        axios
        .get(`${API_URL}/api/institutions`)
        .then((response) => {
            setInstitutions(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return (
        <div className="flex flex-col gap-10 border-sky-500">
            {institutions.map ((institution) => (
                <div key={institution._id} className="max-w-sm-md-lg rounded overflow-hidden shadow-lg  pl-0.5 w-3/5 h-96">
                    <Link to={`/institutions-details-page/${institution._id}`}>
                        <h2>{institution.name}</h2>
                        <img src={institution.image} alt="" className="w-500 h-300 object-cover"/>
                        <p>{institution.type}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default InstitutionsCards;