import React, { useState, useEffect } from "react";
import CampaignsCards from "../components/CampaignsCards";



function SupportPage (  ) {
    const [campaigns, setCampaigns] = useState([]);
   
    const updateCampaigns = (updatedCampaigns) => {
        setCampaigns(updatedCampaigns);
      };

    return (
        <>
            <div>
                <div className="flex  mb-10 m-10 gap-10">
                    <h1 className="text-3xl font-bold text-gray-600"><span className="text-sky-500">Support a campaign.</span> Make a change in someone's life</h1>
                </div>
                <div>
                <CampaignsCards campaigns={campaigns} updateCampaigns={updateCampaigns} />
                </div>
            </div>
        </>
    )
}

export default SupportPage;

