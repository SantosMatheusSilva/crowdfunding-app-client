import React from "react";
import { useState } from "react";


const FilterComponent = ({ selectedCause, filterCampaigns }) => {

    const causes = ['dreams', 'education', 'health', 'emergency', 'others', 'all'];

    

    return(
        <>
        <div className="filter-buttons flex space-x-6 mb-4">
          {causes.map(cause => (
            <button
              key={cause}
              className={`px-4 py-2 rounded text-xl hover:scale-110 ${selectedCause === cause ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
              onClick={() => filterCampaigns(cause)}
            >
              {cause.charAt(0).toUpperCase() + cause.slice(1)}
            </button>
          ))}
        </div>
        </>
    )

}

export default FilterComponent;