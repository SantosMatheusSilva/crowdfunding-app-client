import CampaignsCards from "../components/CampaignsCards";
import axios from "axios";
import {useEffect, useState} from "react";
import InstitutionsCards from "../components/InstitutionsCards";

function SupportPage () {

    return (
        <div>
           <div>
               <h1>Support</h1> <h1>Support an Institution</h1>
               <InstitutionsCards />
           </div>
            <div>
                <h1>Support a Campaign</h1>
                <CampaignsCards />
            </div>
        </div>
    )
}

export default SupportPage;

