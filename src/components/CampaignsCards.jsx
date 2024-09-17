//Necessary imports:
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FilterComponent from "./FilterComponent";
import '@material-tailwind/react'


//Import / Declare the local host:
const API_URL ="https://crowdfunding-app-server.onrender.com";

function CampaignsCard () {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);
  const [selectedCause, setSelectedCause] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/campaigns`);
        setCampaigns(response.data.campaigns);
        setLoading(false);
      } catch (error) {
        setError("An error occured while loading the page. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filterCampaigns = (cause) => {
    setSelectedCause(cause);
    if (cause === 'all') {
      setFilteredCampaigns(campaigns);
    } else {
      setFilteredCampaigns(campaigns.filter(campaign => campaign.cause === cause));
    }
  };

    console.log("campaigns --->", campaigns);

    // improve loading component ui.
    if (loading) {
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


    return(
        <div className="flex flex-col items-center">
          <div>
          <FilterComponent selectedCause={selectedCause} filterCampaigns={filterCampaigns} />
          </div>
<div className="flex flex-wrap gap-5 m-10">
  {campaigns.map ((campaign) => (
    <div key={campaign._id} className="max-w-sm-md-lg rounded overflow-hidden shadow-lg w-96 h-110 border-1 border-gray-600 hover:border-sky-500 hover:border-2 hover:shadow">
 
  <Link to={`/campaigns-details-page/${campaign._id}`}>
  <img className="w-full object-cover h-80" src={campaign.campaignImage} alt={campaign.title}/>
  <div className="flex flex-col px-4 py-4">
    <div className="flex justify-between">
    <p className="text-sky-500 text-base font-medium">
      {campaign.cause}
    </p>
    <p className="bg-sky-400 h-6 text-sky-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ">{campaign.status}</p>
    {/* conditional rendering according to the status */}
    {campaign.status === "completed" ? <p className="bg-green-200 h-6 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">{campaign.status}</p> : null}
    {campaign.status === "canceled" ? <p className="bg-red-200 h-6 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">{campaign.status}</p> : null}
    </div>
    <div className="mt-2 mb-4 space-x-4 maxHeight-10 h-10 hover:underline">
    <h1 className="font-bold text-xl">{campaign.title}</h1>
    </div>
    <div className="mt-4">
    <div className="flex justify-between">
    <p className="text-sm font-medium text-gray-500"><strong>{campaign.daysLeft}</strong> days left</p>
    <p className="text-sm font-medium text-gray-500">{typeof campaign.progressPercentage === 'number' ? `${campaign.progressPercentage}%` : 'N/A'}</p> 
    {/* <h3>{campaign.progressPercentage}%</h3> */}
    </div>
    <div className=" w-full bg-gray-200 rounded-full h-2.5">
    <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${campaign.progressPercentage}%`, maxWidth: '100%' }}></div>
</div>
<div>
{/* <p className="pt-2 text-md font-medium text-gray-800">Raised {campaign.currentAmount}€</p> */}
</div>
<div>
  <p className="pt-2 text-xl font-medium text-sky-500">
    {campaign.currentAmount}€
  </p>
</div>
    </div>
    <p className="text-gray-500 text-base mt-4 mb-4">
      Goal {campaign.goalAmount}€
    </p>
  </div>
  </Link>
</div>
 ))}

</div>

        </div>
    )
}

export default CampaignsCard;
