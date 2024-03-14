//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
// Import components:
import DonationForm from "../components/DonationForm";
import CommentComponent from "../components/CommentComponent";


//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function CampaignsDetailsPage () {
    const {user} = useContext(AuthContext);
    const {campaignId} = useParams();
    const [campaign, setCampaign] = useState({});
    const [donations, setDonations] = useState({});
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        axios
        .get(`${API_URL}/api/campaigns/${campaignId}/comments`) 
        .then((response) => {
            setComments(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

        const handleDeleteComment = async (commentId) => {
            console.log('commentId:', commentId)
            try {
              await axios
              .delete(`${API_URL}/api/user/${user._id}/campaigns/${campaignId}/comments/${commentId}`);
              const commentToRemove = comments.find(comment => comment._id === commentId);
            if (commentToRemove) {
            setComments(comments.filter(comment => comment._id !== commentId));
            
            alert('Comment deleted!');
            window.location.reload();
            }
            } catch (err) {
              console.log(err);
              console.error('Error deleting comment:', err);
            }
          };
    
    return (
              
        <div>
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
                <div>
                <h1>{campaign.title}</h1>
                {campaign.promoter && (
                     <p>Lets Support {campaign.promoter.name}</p> 
                )}
                <img src={campaign.campaignImage} alt={campaign.title} />
                <h2><strong>Cause: </strong>{campaign.cause}</h2>
                <p><strong>Status: </strong>{campaign.status}</p>
                <p><strong>Campaign Description</strong></p>
                <p>{campaign.description}</p>
                <p><strong>Goal: </strong>{campaign.goalAmount}€</p>
                <p><strong>Start Date: </strong>{campaign.startDate}</p>
                <p><strong>Deadline: </strong>{campaign.endDate}</p>
                <p><strong>Promoted by:</strong></p>
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
                    <div>
                        <h2><strong>Comments</strong></h2>
                        {campaign.comments && campaign.comments.map((comment, index) => {
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
                        <CommentComponent campaignId={campaignId}/>
                    </div>
                </article>
                <article>
                    <div>
                    <DonationForm campaignId={campaignId} donations={donations} />
                    </div>
                </article>

                <article>
                    {/* place the comment component here */}
                </article>
        </div>
            
       

    )
}

export default CampaignsDetailsPage;