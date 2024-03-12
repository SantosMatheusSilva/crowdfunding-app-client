//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DonationForm from "../components/DonationForm";
//Necessary imports for stripe:
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const PUBLIC_KEY = "pk_test_51OtXZPFX1zDqFMubqatRbGTVyw8bDN2ygsAAl8JqFhcZE7ZO7VgJzi0XAHzmEND7uGJJfm01iMBKQ2eDAte7li4k00Pr85suiE";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function InstitutionDetailsPage () {
    const {id} = useParams();
    const { institutionId } = useParams();
    const [institution, setInstitution] = useState({});
    const [donations, setDonations] = useState({});
    
    

    useEffect(() => {
        axios
        .get(`${API_URL}/api/institutions/${institutionId}`)
        .then((response) => {
            setInstitution(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    
     useEffect(() => {
        axios
        .get(`${API_URL}/api/institutions/${institutionId}/donations`) 
        .then((response) => {
            setDonations(response.data);
        })
        .catch((error) => console.log(error));
    }, []);
    
/* 
add onCliclk event handler for when the user clicks the donate button it redirects to the Payment page 
the user shoukd bring the campaign/or institution id as a prop to the payment page
the payment page will display the donation form
when the donation is done the user should be redirected to the user dashboard or navigate to the page with the campaign he donates to.
*/
    

    return (
        <div>
            <article>
                <h1>{institution.name}</h1>
                <img src={institution.image} alt={institution.name} />
                <h2>{institution.description}</h2>
                <p>{institution.address}</p>
                <p>{institution.email}</p>
                <p>{institution.about}</p>
                <a href={institution.website}><p>{institution.website}</p></a>
                <p>{institution.phone}</p>
            </article>
            <article>
                <div>
                <div>
                         <h2><strong>Donations</strong></h2>
                        {institution.donations && institution.donations.map((donation, index) => {
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
                </div>
            </article>
            <article>
                <div>
                <Elements stripe={stripeTestPromise}>
                <DonationForm id={id} institutionId={institutionId} donations={donations} />
                </Elements>
                </div>
            </article>
        </div>

    )
}

export default InstitutionDetailsPage;