//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function InstitutionDetailsPage () {
    const { institutionId } = useParams();
    const [institution, setInstitution] = useState({});
    
    useEffect(() => {
        axios
        .get(`${API_URL}/api/institutions/${institutionId}`)
        .then((response) => {
            setInstitution(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <article>
                <h1>{institution.name}</h1>
                <img src={institution.image} alt={institution.name} />
                <h2>{institution.description}</h2>
                <p>{institution.address}</p>
                <p>{institution.email}</p>
                <a href={institution.website}><p>{institution.website}</p></a>
                <p>{institution.phone}</p>
            </article>
        </div>

    )
}

export default InstitutionDetailsPage;