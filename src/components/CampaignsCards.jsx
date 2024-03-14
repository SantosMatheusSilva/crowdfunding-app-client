//Necessary imports:
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '@material-tailwind/react'


//Import / Declare the local host:
const API_URL = "https://crowdfunding-app-server.onrender.com";

function CampaignsCard () {
  const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        axios
        .get(`${API_URL}/campaigns`)
        .then((response) => {
            setCampaigns(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return(
<div className="flex flex-wrap gap-5 m-10">
  {campaigns.map ((campaigns) => (
    <div key={campaigns._id}className="max-w-sm-md-lg rounded overflow-hidden shadow-lg  pl-0.5 w-96 h-110 border-2 border-gray-600 ">
 
  <Link to={`/campaigns-details-page/${campaigns._id}`}>
  <img className="w-full rounded h-80" src={campaigns.campaignImage} alt={campaigns.title}/>
  <div className="p-2">
    <h1 className="font-bold text-sky-700 text-xl mb-2">{campaigns.title}</h1>
    <p className="text-gray-700 text-sky-700 text-base">
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
