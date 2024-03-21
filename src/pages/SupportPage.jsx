import CampaignsCards from "../components/CampaignsCards";
import axios from "axios";
import {useEffect, useState} from "react";
import InstitutionsCards from "../components/InstitutionsCards";

function SupportPage () {

    return (
        <div>
           <div className="mt-10 mb-20 p-10">
                <h1 className="text-3xl font-bold text-5xl text-sky-600 border-b-2 border-sky-500">Make a Change in Someone's Life</h1>
               <h1 className="text-2xl font-bold text-gray-800 m-10">Support an Institution</h1>
               <InstitutionsCards />
           </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-800 m-10">Current Campaigns</h1>
                <CampaignsCards />
            </div>
        </div>
    )
}

export default SupportPage;

