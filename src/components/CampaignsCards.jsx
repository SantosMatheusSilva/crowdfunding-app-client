//Necessary imports:
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '@material-tailwind/react'


//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function CampaignsCard () {
  const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        axios
        .get(`${API_URL}/api/campaigns`)
        .then((response) => {
            setCampaigns(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return(
<div className="max-w-sm rounded overflow-hidden shadow-lg  pl-0.5">
  {campaigns.map ((campaigns) => (
    <div key={campaigns._id}>
 
  <Link to={`/campaigns-details-page/${campaigns._id}`}>
  <img className="w-full" src={campaigns.campaignImage} alt={campaigns.title}/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{campaigns.title}</div>
    <p className="text-gray-700 text-base">
      {campaigns.cause}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
  </div>
  </Link>
</div>
 ))}

</div>
    )
}

export default CampaignsCard;

/* 
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
                    <Link to={`/institutions-details-page/${institution._id}`}>
                        <h2>{institution.name}</h2>
                        <img src={institution.image} alt="" />
                        <p>{institution.type}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default InstitutionsCards;
*/