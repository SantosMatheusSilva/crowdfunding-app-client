//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//Necessary imports for stripe:
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
// Import components:
import DonationForm from "../components/DonationForm";

const PUBLIC_KEY = "pk_test_51OtXZPFX1zDqFMubqatRbGTVyw8bDN2ygsAAl8JqFhcZE7ZO7VgJzi0XAHzmEND7uGJJfm01iMBKQ2eDAte7li4k00Pr85suiE";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function CampaignsDetailsPage () {
    const {id} = useParams();
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState({});
    const [donations, setDonations] = useState({});

    useEffect(() => {
        axios
        .get(`${API_URL}/api/campaigns/${campaignId}`) 
        .then((response) => {
            setCampaign(response.data);
        })
        .catch((error) => console.log(error));
    }, [campaignId]);

    useEffect(() => {
        axios
        .get(`${API_URL}/api/campaigns/${campaignId}/donations`) 
        .then((response) => {
            setDonations(response.data);
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
                                
                                    <p><strong>Donor: </strong> 
                                     {donations.donor && (
                                        <div>
                                            <p>{donation.donor.name}</p>
                                        </div>
                                    )} 
                                    </p>
                                    <p><span>{donation.date}</span></p>
                                    <p><strong>Amount: </strong>{donation.amount}€</p>
                                    <p><strong></strong>"{donation.comments}"</p>
                                </div>
                            )
                        })}
                    </div>
                </article>
                <article>
                    <div>
                    <Elements stripe={stripeTestPromise}>
                    <DonationForm id={id} campaignId={campaignId} donations={donations} />
                    </Elements>
                    </div>
                </article>
                <article>
                    {/* place the comment component here */}
                </article>
        </div>
            
       

    )
}

export default CampaignsDetailsPage;