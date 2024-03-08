import {Link} from 'react-router-dom';
import '@material-tailwind/react'


const image = 'https://static.timesofisrael.com/www/uploads/2023/04/33CT734-highres.jpg'
function CampaignsCard () {
    return(
<div class="max-w-sm rounded overflow-hidden shadow-lg  pl-0.5">
  <img class="w-full" src={image} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
  Doar
</button>
  </div>
</div>

    )
}

export default CampaignsCard;