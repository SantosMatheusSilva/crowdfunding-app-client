//Necessary imports:
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DonationForm from "../components/DonationForm";
import CommentComponent from "../components/CommentComponent";
import { AuthContext } from "../context/auth.context";

//Import / Declare the local host:
const API_URL = process.env.VITE_SERVER_URL;

function InstitutionDetailsPage () {
    const {user, isLoggedIn} = useContext(AuthContext);
    const {id} = useParams();
    const { institutionId } = useParams();
    const [institution, setInstitution] = useState({});
    const [donations, setDonations] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [activeTab, setActiveTab] = useState("info");
    const [showDonationForm, setShowDonationForm] = useState(false);
    
    
    useEffect(() => {
        async function fetchData () {
            try {
                const institutionResponse = await axios.get(`${API_URL}/api/institutions/${institutionId}`);
                console.log("Institution Details Response:", institutionResponse.data);
                setInstitution(institutionResponse.data);

                const donationsResponse = await axios.get(`${API_URL}/api/institutions/${institutionId}/donations`);
                setDonations(donationsResponse.data);

                const commentsResponse = await axios.get(`${API_URL}/api/institutions/${institutionId}/comments`);
                setComments(commentsResponse.data);

                setIsLoading(false);
            } catch (err) {
                console.log(error);
                setError(err.message);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [institutionId]);

    const handleDonationFormClose = () => {
        setShowDonationForm(false);
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    
/* 
add onCliclk event handler for when the user clicks the donate button it redirects to the Payment page 
the user shoukd bring the campaign/or institution id as a prop to the payment page
the payment page will display the donation form
when the donation is done the user should be redirected to the user dashboard or navigate to the page with the campaign he donates to.
*/

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
    

    return (
        <div>
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
                <div className="flex flex-row gap-10 border-y-2 border-y-gray-500 py-10">
                <div  className="size-3/5">
                <img src={institution.image} alt={institution.name} className="size-full"/>
                </div>
                
                <div className="size-3/5 flex flex-col  px-5">
                <div className="flex flex-col gap-2 mb-5">
                <h1 className="font-bold text-sky-500 text-5xl mb-2">
                  {institution.name}
                </h1>
                <p className="text-gray-600 bg-blue-200 border-2 rounded-full w-fit p-2 text-xl mb-2">
                  <strong className="text-sky-500 ">
                   {institution.type}
                  </strong>
                </p>
                <div className=" justify-center mt-10">
                <button
                  className="text-3xl text-white bg-sky-500 rounded-full p-2 border-2 border-gray-600 w-full hover:scale-105"
                  onClick={() => setShowDonationForm(true)}
                >
                  Support {institution.name}
                </button>
              </div>
              </div>
                </div>
                </div>

                {/* DONATION FORM */}
                {showDonationForm && (
                    <DonationForm
                    institutionId={institutionId}
                    donations={donations}
                    onClose={handleDonationFormClose}
                    />
                )} 
               
               {/* TAB LIST */}
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
                <div className="flex flex-wrap gap-2 justify-center items-center bg-gray-50 p-5">
                <div className="flex flex-row border-2 border-sky-500 p-2 w-fit rounded-md mt-5 gap-10">
                <p><strong>Adress: </strong>{institution.address}</p>
                <p><strong>Phone: </strong>{institution.phone}</p>
                <p><strong>Email: </strong>{institution.email}</p>
                <p><strong>Website: </strong><a href={institution.website}>{institution.website}</a></p>
                </div>
                <div className="flex flex-col m-3">
                <p className="text-gray-700 text-xl p-2 justify-center">{institution.about}</p>
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
                  <CommentComponent institutionId={institutionId} />
                </div>
                {institution.comments &&
                  institution.comments.map((comment, index) => {
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
                {institution.donations && institution.donations.length === 0 && (
                  <div className="flex flex-col justify-center items-center m-10">
                    <div>
                      <p className="text-2xl font-bold text-gray-500">
                        No donations yet. Be the first one!
                      </p>
                    </div>
                    <div className="flex flex-row justify-center mt-10">
                    {isLoggedIn ? (
                        <button
                        className="text-2xl text-white bg-sky-500 rounded-full p-4 border-2 border-gray-600 w-fit hover:scale-105"
                        onClick={() => setShowDonationForm(true)}
                        >
                        Support {institution.name}
                        </button>
                    ) : (
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
                    )}
                      
                    </div>
                  </div>
                )}      
                {institution.donations &&
                  institution.donations.map((donation, index) => {
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
            
                </div>
    
                
            </article>
        </div>

    )
}

export default InstitutionDetailsPage;