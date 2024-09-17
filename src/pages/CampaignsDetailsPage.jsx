//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
// Import components:
import DonationForm from "../components/DonationForm";
import CommentComponent from "../components/CommentComponent";
import { MdDelete } from "react-icons/md";



//Import / Declare the local host:
const API_URL ="https://crowdfunding-app-server.onrender.com";

function CampaignsDetailsPage () {
    //const {id} = useParams();
    const {user, isLoggedIn} = useContext(AuthContext);
    const {campaignId} = useParams();
    const [campaign, setCampaign] = useState(null);
    const [donations, setDonations] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [activeTab, setActiveTab] = useState("info");
    const [showDonationForm, setShowDonationForm] = useState(false);

    //console.log('user', user._id);
    useEffect(() => {
        async function fetchData () {
            try {
                const campaignResponse = await axios.get(`${API_URL}/api/campaigns/${campaignId}`);
                console.log("Campaign Response:", campaignResponse.data);
                setCampaign(campaignResponse.data.campaign);
                const campaignData = {
                    ...campaignResponse.data.campaign,
                    daysLeft: campaignResponse.data.daysLeft
                };
                setCampaign(campaignData);

                const donationsResponse = await axios.get(`${API_URL}/api/campaigns/${campaignId}/donations`);
                setDonations(donationsResponse.data);

                const commentsResponse = await axios.get(`${API_URL}/api/campaigns/${campaignId}/comments`);
                setComments(commentsResponse.data);

                setIsLoading(false);
            } catch (err) {
                console.log(error);
                setError(err.message);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [campaignId]);

    // Function to delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${API_URL}/api/user/${user._id}/campaigns/${campaignId}/comments/${commentId}`);
            // Update comments array in the state
            setComments(comments.filter(comment => comment._id !== commentId));
            alert('Comment deleted!');
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };
     
      if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center space-y-4">
              <svg
                className="animate-spin h-12 w-12 text-sky-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.764 0-5.236-1.122-7.071-2.929z"
                ></path>
              </svg>
              <p className="text-gray-500">Loading...</p>
            </div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          </div>
        );
      }

  // Function to handle tab change
  const handleTabChange = (tab) => {
      setActiveTab(tab);
  };

  const handleDonationFormClose = () => {
      setShowDonationForm(false);
  }
  

    return (
      <div>
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
          <div className="flex flex-row gap-10 border-y-2 border-y-gray-500 py-10">
            <div className="size-3/5">
              <img
                src={campaign.campaignImage}
                alt={campaign.title}
                className="size-full"
              />
            </div>
            <div className="size-3/5 flex flex-col  px-5">
              <div className="flex flex-col gap-2 mb-5">
                <p className="text-gray-600  text-xl mb-2">
                  <strong className="text-gray-500 ">
                    Cause: {campaign.cause}
                  </strong>
                </p>
                <h1 className="font-bold text-sky-500 text-5xl mb-2">
                  {campaign.title}
                </h1>
              </div>
              <div className="flex flex-row gap-2 items-center mb-5 w-fit shadow rounded-full">
                {campaign.promoter && (
                  <>
                    <img
                      src={campaign.promoter.profilePic}
                      alt="{campaign.promoter.name}"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex flex-col p-1 w-full mr-5">
                      <h2 className="text-md">{campaign.promoter.name}</h2>
                      <div className="text-sm text-gray-500 flex flex-row gap-3 ">
                        <p>{campaign.promoter.donations.length} donations</p>
                        <p> {campaign.promoter.campaigns.length} campaigns</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-wrap justify-between items-end mt-10 mb-2">
                <h1>
                  €{" "}
                  {new Intl.NumberFormat("pt-EU").format(
                    campaign.currentAmount
                  )}{" "}
                  EUR
                </h1>
                <p className="text-md text-gray-700">
                  {campaign.progressPercentage}% raised of{" "}
                  {new Intl.NumberFormat("pt-EU").format(campaign.goalAmount)}€
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-sky-500 h-2.5 rounded-full"
                  style={{
                    width: `${campaign.progressPercentage}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
              <div className="flex flex-row justify-around mt-8 mb-10 border-2 border-gray-600 rounded-md p-2 w-full bg-sky-100 text-xl">
                <p className="hover:scale-110">
                  {campaign.daysLeft} days left{" "}
                </p>
                <p className="hover:scale-110">
                  {new Intl.NumberFormat("pt-EU").format(campaign.goalAmount)}€
                  goal
                </p>
                <p className="hover:scale-110">
                  {campaign.donations.length} donations
                </p>
              </div>
              <div className="flex flex-row justify-center mt-10">
                <button
                  className="text-2xl text-white bg-sky-500 rounded-full p-4 border-2 border-gray-600 w-full hover:scale-105"
                  onClick={() => setShowDonationForm(true)}
                >
                  Support this Campaign
                </button>
              </div>
            </div>
          </div>
          {/* DONATION FORM */}
          {showDonationForm && (
            <DonationForm
              campaignId={campaignId}
              donations={donations}
              onClose={handleDonationFormClose}
            />
          )}
          {/* TAB LIST  */}
          <ul
            className="relative flex flex-wrap p-1 list-none rounded-xl bg-blue-gray-50/60"
            data-tabs="tabs"
            role="list"
          >
            <li className="z-30 flex-auto text-center">
              <a
                className={`z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit ${
                  activeTab === "info" ? "active" : ""
                }`}
                onClick={() => handleTabChange("info")}
                data-tab-target="info"
                active="true"
                role="tab"
                aria-selected={activeTab === "info" ? "true" : "false"}
                aria-controls="info"
              >
                <span className="ml-1">Info</span>
              </a>
            </li>
            <li className="z-30 flex-auto text-center">
              <a
                className={`z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit ${
                  activeTab === "info" ? "active" : ""
                }`}
                onClick={() => handleTabChange("comments")}
                data-tab-target="comments"
                role="tab"
                aria-selected="false"
                aria-controls="comments"
              >
                <span className="ml-1">Comments</span>
              </a>
            </li>

            <li className="z-30 flex-auto text-center">
              <a
                className={`z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit ${
                  activeTab === "info" ? "active" : ""
                }`}
                onClick={() => handleTabChange("donations")}
                data-tab-target="donations"
                role="tab"
                aria-selected="false"
                aria-controls="donations"
              >
                <span className="ml-1">Donations</span>
              </a>
            </li>
            <li className="z-30 flex-auto text-center">
              <a
                className={`z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit ${
                  activeTab === "info" ? "active" : ""
                }`}
                onClick={() => handleTabChange("promoter")}
                data-tab-target="promoter"
                role="tab"
                aria-selected="false"
                aria-controls="promoter"
              >
                <span className="ml-1">Promoter</span>
              </a>
            </li>
          </ul>
          {/* TAB CONTENT */}
          <div className="mb-6" data-tab-content="tabs">
            <div
              className={`opacity-100 transition-opacity duration-150 ease-linear ${
                activeTab === "info" ? "block" : "hidden"
              }`}
              id="info"
              role="tabpanel"
            >
              <hr className="mb-5 mt-3" />
              <div className="flex flex-col gap-5 mt-10 bg-gray-50 p-5 ">
                <div className="flex flex-col  min-h-40 border-2 border-gray-600 rounded-md p-1 bg-white">
                  <h2>
                    <strong className="text-sky-500 ">
                      Campaign Description
                    </strong>
                  </h2>
                  <p>{campaign.description}</p>
                </div>
                <div className="flex flex-col  h-40 border-2 border-gray-600 rounded-md p-1 bg-white">
                  <h2>
                    <strong className="text-sky-500 ">
                      Budget and Schedule
                    </strong>
                  </h2>
                  <p>{campaign.budget}</p>
                </div>
                <div className="flex flex-col border-2 border-gray-600 rounded-md p-1 bg-white">
                  <h2>
                    <strong className="text-sky-500 ">
                      Proof Images and Docs
                    </strong>
                  </h2>
                  <div className="flex flex-row justify-between">
                    {campaign.images &&
                      campaign.images.map((images, index) => {
                        return (
                          <div key={index}>
                            <img
                              src={images}
                              alt={`Image ${index + 1}`}
                              className="flex flex-row border-2 border-gray-600 max-w-96 max-h-96 min-w-96 min-h-96 rounded-md p-1 bg-white"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`opacity-100 transition-opacity duration-150 ease-linear ${
                activeTab === "comments" ? "block" : "hidden"
              }`}
              id="comments"
              role="tabpanel"
            >
              <hr className="mb-5 mt-3" />
              <div className="flex flex-col w-full mt-5 items-center justify-center bg-gray-50">
                <div className="m-3">
                  <CommentComponent campaignId={campaignId} />
                </div>
                {campaign.comments &&
                  campaign.comments.map((comment, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col border-2 border-gray-500 p-3 my-3 rounded-md w-7/12 shadow-md bg-white"
                      >
                        <div className="flex flex-row items-center gap-1 mt-3 ">
                          <img
                            className="w-12 h-12 rounded-full border-2 border-gray-500"
                            src={comment.user?.profilePic}
                            alt="user-profile-pic"
                          />
                          <div className="flex flex-col">
                            <h3 className="text-md font-semibold">
                              {comment.user?.name}
                            </h3>
                            <p className="text-gray-500 text-xs">
                              {new Date(comment.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="py-1 ml-2 mt-3 text-xl">
                          {comment.comment}
                        </p>
                        <div className="flex flex-row justify-end mt-3">
                          {comment._id &&
                            user &&
                            user._id === comment.user?._id && (
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="text-gray-500 text-2lg flex justify-end"
                              >
                                <MdDelete className="w-6 h-6" />
                              </button>
                            )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div
              className={`opacity-100 transition-opacity duration-150 ease-linear ${
                activeTab === "donations" ? "block" : "hidden"
              }`}
              id="donations"
              role="tabpanel"
            >
              <hr className="mb-5 mt-3" />
              <div className="flex flex-col w-full mt-5 items-center justify-center bg-gray-50">
                {campaign.donations && campaign.donations.length === 0 && (
                  <div className="flex flex-col justify-center items-center m-10">
                    <div>
                      <p className="text-2xl font-bold text-gray-500">
                        No donations yet. Be the first one!
                      </p>
                    </div>
                    <div className="flex flex-row justify-center mt-10">
                      <button
                        className="text-2xl text-white bg-sky-500 rounded-full p-4 border-2 border-gray-600 w-fit hover:scale-105"
                        onClick={() => setShowDonationForm(true)}
                      >
                        Support this Campaign
                      </button>
                    </div>
                  </div>
                )}
                {!isLoggedIn ? (
                  <>
                    <div className="flex flex-col mb-10">
                      <h1 className="text-2xl font-bold text-gray-800 m-10">
                        Login to make your donation
                      </h1>
                      <button>
                        <a
                          href="/login"
                          className="w-full text-white bg-sky-500 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-10 hover:scale-105"
                        >
                          Login
                        </a>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row justify-center mt-10 mb-10">
                    <button
                      className="text-2xl text-white bg-sky-500 rounded-full p-4 border-2 border-gray-600 w-full hover:scale-105"
                      onClick={() => setShowDonationForm(true)}
                    >
                      Make your donation
                    </button>
                  </div>
                )}
                {campaign.donations &&
                  campaign.donations.map((donation, index) => {
                    const donorName = donation.name || "Anonymous";
                    return (
                      <div
                        key={index}
                        className="flex flex-col p-3 m-3 rounded-md w-7/12 shadow-md bg-white"
                      >
                        <div className="flex flex-row items-center gap-1">
                          <img
                            className="w-10 h-10 rounded-full border-2 border-gray-500"
                            src={donation.user?.profilePic}
                            alt="user-profile-pic"
                          />
                          <div className="flex flex-col">
                            <p>
                              <strong>{donorName} </strong>
                            </p>
                            <p className="text-gray-500 text-xs">
                              <span>
                                {new Date(donation.date).toLocaleDateString()}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col mt-3">
                          <p>
                            <strong>{donation.amount}€ </strong>
                          </p>
                          <p className="text-gray-500">
                            <strong></strong>"{donation.comments}"
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div
              className={`opacity-100 transition-opacity duration-150 ease-linear ${
                activeTab === "promoter" ? "block" : "hidden"
              }`}
              id="promoter"
              role="tabpanel"
            >
              <div className="flex flex-col  h-40 border-2 border-gray-600 rounded-md p-1">
                <h2>
                  <strong className="text-sky-500 ">
                    Promoter Introduction
                  </strong>
                </h2>
                <p>{campaign.promIntroduction}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
}

export default CampaignsDetailsPage;
/* 
<div>
                    <DonationForm campaignId={campaignId} donations={donations} />
                </div>
*/