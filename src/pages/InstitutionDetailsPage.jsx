//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DonationForm from "../components/DonationForm";
import CommentComponent from "../components/CommentComponent";
import { AuthContext } from "../context/auth.context";

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function InstitutionDetailsPage () {
    const {user} = useContext(AuthContext);
    const {id} = useParams();
    const { institutionId } = useParams();
    const [institution, setInstitution] = useState({});
    const [donations, setDonations] = useState({});
    const [comments, setComments] = useState([]);
    
    

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
    }, [institutionId]);

    useEffect(() => {
        axios
        .get(`${API_URL}/api/institutions/${institutionId}/comments`) 
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
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
                <div className="flex flex-col border-b-2 border-gray-600 mb-5">
                <h1 className="font-bold text-sky-500 text-5xl mb-2">{institution.name}</h1>
                <h3 className="text-gray-700 text-sky-700 text-2xl mb-2">{institution.type}</h3>
                <h2>{institution.description}</h2>
                </div>
                <div  className="flex flex-wrap gap-2 justify-center items-center m-5">
                <img src={institution.image} alt={institution.name} className="object-cover"/>
                </div>
            
                
                <div className="flex flex-wrap gap-2 justify-center items-center">
                <div className="flex flex-row border-2 border-sky-500 p-1 w-fit rounded-md mt-5 space-x-5">
                <p><strong>Adress:</strong>{institution.address}</p>
                <p><strong>Phone:</strong>{institution.phone}</p>
                <p><strong>Email:</strong>{institution.email}</p>
                <strong>Website:</strong><a href={institution.website}><p>{institution.website}</p></a>
                </div>
                <div className="flex flex-col  h-40 border-2 border-gray-600 rounded-md m-3">
                <p className="text-gray-700 text-xl p-2">{institution.about}</p>
                </div>
                </div>
               
                
            </article>
            <article className="flex  max-w-7xl mx-auto sm:px-6 lg:px-8 justify-between items-center">
            <div>
                <DonationForm id={id} institutionId={institutionId} donations={donations} />
            </div>
            <div>
                
           {/*  <CommentComponent institutionId={institutionId}  /> */}
            </div>
        
            </article>
            <article className=" flex flex-col-reverse max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10 flex flex-row justify-between ">
                <div className="border- border-sky-500 p-1 rounded-md mt-5 w-96">
                         <h2><strong>Donations</strong></h2>
                        {institution.donations && institution.donations.map((donation, index) => {
                            return (
                                <div key={index} className="flex flex-col border-2 border-sky-500 p-1  rounded-md">
                                
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
        </div>

    )
}

export default InstitutionDetailsPage;