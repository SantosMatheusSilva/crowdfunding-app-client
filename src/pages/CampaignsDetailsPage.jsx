//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Import components:
import DonationForm from "../components/DonationForm";

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function CampaignsDetailsPage () {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState({});
    
    useEffect(() => {
        axios
        .get(`${API_URL}/api/campaigns/${campaignId}`)  //"/campaigns/:id"
        .then((response) => {
            setCampaign(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <article>
                <div>
                <h1>{campaign.title}</h1>
                <img src={campaign.campaignImage} alt={campaign.title} />
                <h2><strong>Cause:</strong>{campaign.cause}</h2>
                <p><strong>Status:</strong>{campaign.status}</p>
                <p><strong>Campaign Description:</strong>{campaign.description}</p>
                <p><strong>Goal:</strong>{campaign.goalAmount}</p>
                <p><strong>Start:</strong>{campaign.startDate}</p>
                <p><strong>Deadline:</strong>{campaign.endDate}</p>
                <p><strong>Promoted by:</strong>{campaign.promoter}</p>
                <p><strong>Promoter Introduction:</strong>{campaign.promIntroduction}</p>
                <p><strong>Budget and Schedule:</strong>{campaign.budget}</p>
                <p><strong>Proof Images and Docs:</strong>{campaign.proofImages}</p>
                {/* <img src={campaign.proofImages} alt="" /> */} {/* this is an array with 3 images */}
         {/*        {campaign.proofImages.map((image, index) => {
                    return (
                        <div key={index}>
                            <img src={image} alt="" />
                        </div>
                    )
                })} */}
                <h3>Donations:</h3>
                <li>{campaign.donations}</li>
                
<div>
                    <DonationForm />
                </div>
                </div>
            </article>
        </div>

    )
}

export default CampaignsDetailsPage;