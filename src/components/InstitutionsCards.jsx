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
        <div>
            {institutions.map ((institution) => (
                <div key={institution._id}>
                    <Link to={`/institutions-details-page/${institution.id}`}>
                        <h2>{institution.name}</h2>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default InstitutionsCards;