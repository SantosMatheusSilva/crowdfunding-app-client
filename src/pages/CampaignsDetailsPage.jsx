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
                <h1 className="font-bold text-sky-500 text-4xl mb-2">{campaign.title}</h1>
                {campaign.promoter && (
                     <p className="text-gray-700 text-sky-700 text-2xl mb-2">Lets Support {campaign.promoter.name}</p> 
                )}
                <img src={campaign.campaignImage} alt={campaign.title} />
                <div className="p-2 flex flex-wrap gap-5 justify-start items-center">
                <p className="text-gray-600 bg-blue-200 border-2 rounded-full  p-2 text-xl"><strong className="text-sky-500 ">{campaign.cause}</strong></p>
                <p className="text-gray-600  bg-blue-200 border-2 rounded-full  p-2 text-xl"><strong className="text-sky-500 ">Status: </strong>{campaign.status}</p>
               
                <p className="text-gray-600 bg-blue-200 border-2 rounded-full  p-2 text-xl"><strong className="text-sky-500 ">Goal: </strong>{campaign.goalAmount}€</p>
                <p className="text-gray-600  bg-blue-200 border-2 rounded-full  p-2 text-xl"><strong className="text-sky-500 ">Start Date: </strong>{campaign.startDate}</p>
                <p className="text-gray-600  bg-blue-200 border-2 rounded-full  p-2 text-xl"><strong className="text-sky-500 ">Deadline: </strong>{campaign.endDate}</p>
                <div className="flex flex-col border-2 border-sky-500 p-1">
                <p className="text-gray-600 "><strong>Promoter Contact</strong></p>
                {campaign.promoter && (
                    <div className="">
                        <p><strong> Name: </strong>{campaign.promoter.name}</p> 
                        <p><strong> Email: </strong>{campaign.promoter.email}</p>
                    </div>
                    
                )}
                </div>
                </div>
                <div className="flex flex-col  h-40 border-2 border-gray-600 rounded-md p-1">
                    <h2><strong>Campaign Description</strong></h2>
                    <p>{campaign.description}</p>
                    
                </div>
                <div className="flex flex-col  h-40 border-2 border-gray-600 rounded-md p-1">
                    <h2><strong>Promoter Introduction</strong></h2>
                    <p>{campaign.promIntroduction}</p>
                </div>
                <div className="flex flex-col  h-40 border-2 border-gray-600 rounded-md p-1">
                    <h2><strong>Budget and Schedule</strong></h2>
                    <p>{campaign.budget}</p>
                </div>
                <h2><strong>Proof Images and Docs</strong></h2>
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