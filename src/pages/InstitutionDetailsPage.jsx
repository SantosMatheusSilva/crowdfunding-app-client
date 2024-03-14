//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DonationForm from "../components/DonationForm";
import CommentComponent from "../components/CommentComponent";
import { AuthContext } from "../context/auth.context";

//Import / Declare the local host:
const API_URL = "https://crowdfunding-app-server.onrender.com";

function InstitutionDetailsPage () {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const { institutionId } = useParams();
    const [institution, setInstitution] = useState({});
    const [donations, setDonations] = useState({});
    const [comments, setComments] = useState([]);
    
    

    useEffect(() => {
        axios
        .get(`${API_URL}/institutions/${institutionId}`)
        .then((response) => {
            setInstitution(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    
     useEffect(() => {
        axios
        .get(`${API_URL}/institutions/${institutionId}/donations`) 
        .then((response) => {
            setDonations(response.data);
        })
        .catch((error) => console.log(error));
    }, [institutionId]);

    useEffect(() => {
        axios
        .get(`${API_URL}/institutions/${institutionId}/comments`) 
        .then((response) => {
            setComments(response.data);
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
                <DonationForm id={id} institutionId={institutionId} donations={donations} />
                </div>
            </article>
            <section>
                        <div>
                        <h2><strong>Comments</strong></h2>
                        {institution.comments && institution.comments.map((comment, index) => {
                            return (
                                <div key={index}>
                                     <p><strong>{comment.user.name}</strong></p> 
                                    <p><span>{comment.date}</span></p>
                                    <p>"{comment.comment}"</p>
                                    {comment._id && (
                                        <button onClick={() => handleDeleteComment(comment._id)}>delete</button>
                                    )}
                                    
                                </div>
                            )
                        })}
                        </div>
            </section>
            <section>
                <CommentComponent institutionId={institutionId}  />
            </section>
        </div>

    )
}

export default InstitutionDetailsPage;