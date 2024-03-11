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
                <h2><strong>Cause: </strong>{campaign.cause}</h2>
                <p><strong>Status: </strong>{campaign.status}</p>
                <p><strong>Campaign Description</strong></p>
                <p>{campaign.description}</p>
                <p><strong>Goal: </strong>{campaign.goalAmount}€</p>
                <p><strong>Start Date: </strong>{campaign.startDate}</p>
                <p><strong>Deadline: </strong>{campaign.endDate}</p>
                <p><strong>Promoted by:</strong>{/* {campaign.promoter} */}</p>
                {campaign.promoter && (
                    <div>
                        <p><strong> Name:</strong>{campaign.promoter.name}</p>
                        <p><strong> Email:</strong>{campaign.promoter.email}</p>
                    </div>
                )}
                <p><strong>Promoter Introduction</strong></p>
                <p>{campaign.promIntroduction}</p>
                <p><strong>Budget and Schedule</strong></p>
                <p>{campaign.budget}</p>
                <p><strong>Proof Images and Docs</strong></p>
                    {campaign.images && campaign.images.map((images, index) => {
                    return (
                        <div key={index}>
                            <h3>Proof File {index + 1}</h3>
                            <img src={images} alt={`Image ${index + 1}`} />
                        </div>
                    )
                })} 
                 </div>
                </article>
                <article>
                    <div>
                        <h2><strong>Donations</strong></h2>
                        {campaign.donations && campaign.donations.map((donation, index) => {
                            return (
                                <div key={index}>
                                    <p><strong>Donor: </strong>{donation.donor} <span>{donation.date}</span></p>
                                    <p><strong>Amount: </strong>{donation.amount}€</p>
                                    <p><strong></strong>"{donation.comments}"</p>
                                </div>
                            )
                        })}
                    </div>
                </article>
                <article>
                    <div>
                    <DonationForm />
                    </div>
                </article>
                <article>
                    {/* place the comment component here */}
                </article>
        </div>
            
       

    )
}

export default CampaignsDetailsPage;