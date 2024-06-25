// Necessary imports:
import { useParams, useNavigate, Link} from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
// Import / Declare the local host:
const API_URL = process.env.VITE_SERVER_URL;

function EditCampaign () {
    /* onst {userId, campaignId} = useParams(); */
    const [title, setTitle] = useState("");
    const [campaignImage, setCampaignImage] = useState("");
    const [cause, setCause] = useState(["Education", "Health", "Emergency", "Dreams", "Others"]);
    const [description, setDescription] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [endDate, setEndDate] = useState("");
    const [images, setImages] = useState("", "", "");
    const [errors, setErrors] = useState("");
    const [promIntroduction, setPromIntroduction] = useState("");
    const [budget, setBudget] = useState("");
    const [status, setStatus] = useState(["active", "completed", "canceled"]);
    const {userId, campaignId} = useParams();
    const {user, authenticateUser} = useContext(AuthContext);
    
    // Initialize the useNavigate hook
     const navigate = useNavigate();

     const handleTitle = (e) => setTitle(e.target.value);
     const handleCampaignImage = (e) => setCampaignImage(e.target.value);
     const handleCause = (e) => setCause(e.target.value);
     const handleDescription = (e) => setDescription(e.target.value);
     const handleGoalAmount = (e) => setGoalAmount(e.target.value);
     const handleEndDate = (e) => {
         let dateValue = e.target.value;
         const formattedDate = new Date(Date.parse(dateValue)).toISOString().slice(0, 10);
         setEndDate(formattedDate);
     };
     const handleImages = (index, value) => {
         const updatedArray = [...images];
         updatedArray[index] = value;
         setImages(updatedArray)};  
     const handlePromIntroduction = (e) => setPromIntroduction(e.target.value);
     const handleBudget = (e) => setBudget(e.target.value);
     const handleStatus = (e) => setStatus(e.target.value);

     const handleUpdate = async (e) => {
         e.preventDefault();

         /*  { title, goalAmount, endDate, campaignImage, budget, status } */
         if(!title || !goalAmount || !endDate || !campaignImage || !budget) {
             setErrors("Please fill in all mandatory fields");
             return;
         }

         const reqBody = {title, goalAmount, endDate, campaignImage, budget, status,};
         console.log(reqBody);


        try{
            const response = await axios
                .put(`${API_URL}/api/user/${userId}/campaign/${campaignId}`, reqBody)
                navigate("/support");
        } 
        catch(error) {
            console.log(error);
            setErrors("An error occurred while updating your campaign. Please try again.");
        }
        };
     

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
        <div className="text-center mb-10 mt-10 border-2-blue-500 border-2 border-blue-500">
            <h1 className="text-3xl font-bold text-gray-800 p-5">Update your campaign</h1>
            <p className="p-5 text-gray-600">Once your Campaign is created an active only certain fields can be edited or updated. <br />
               You can only edit the following: <strong>Title, Description, Goal Amount, End Date, Budget</strong> and update the <strong>Status</strong> <br />
               For more information about the fields or if you want to cancel it please <Link to="/">Contact Us</Link></p> {/* change the link path to the contact us page */}
        </div>
        <div>
        <form onSubmit={handleUpdate}>
            <div className="pt-6 mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">
                        1.
                    </span> 
                    Title *
                </h3>
                <label>Title: </label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 value={title}
                 onChange={handleTitle}
                 />
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span  className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">
                        2.
                    </span>
                    Cover Image *
                </h3>
                <label>Upload image:</label>
                <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 placeholder="https://example.com/image.jpg"
                 value={campaignImage}
                 onChange={handleCampaignImage}
                 />
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span  className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">3.</span>
                     Campaign Cause *
                </h3>
                {/* <label>Cause:</label> */}
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 value={cause}
                 multiple={false}
                 onChange={handleCause}>
                    <option value="Dreams">Dream</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span  className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">4.</span>
                     Goal Amount*
                </h3>
                <label>value in euros:</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 "
                 type="number" 
                 placeholder="1000 €"
                 value={goalAmount}
                 onChange={handleGoalAmount}
                 />
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span  className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">5.</span>
                    Campaign Description *
                </h3>
                {/* <label>Description:</label> */}
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 value={description}
                 onChange={handleDescription}
                 rows="5"
                 cols="50"
                 />
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">6.</span> 
                    Promoter Introduction *
                </h3>
                {/* <label>Description:</label> */}
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 value={promIntroduction}
                 onChange={handlePromIntroduction}
                 rows="5"
                 cols="50"
                 />
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">7.</span> 
                    Budget and Schedule *
                </h3>
                {/* <label>Description:</label> */}
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 value={budget}
                 onChange={handleBudget}
                 rows="5"
                 cols="50"
                 />
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3" >
                    <span className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">8.</span> 
                    End Date *
                </h3>
                <label>End Date:</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="date" 
                 value={endDate}
                 onChange={handleEndDate}
                 />
            </div>
            <div className="mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span className=" bg-blue-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">9.</span> 
                    Proof Files (Up to 3)
                </h3>
                <label> Upload Images:</label>
                <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 placeholder="https://example.com/image.jpg"
                 value={images[0]}
                 onChange={(e) => handleImages(0, e.target.value)}
                 />
                  <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 placeholder="https://example.com/image.jpg"
                 value={images[1]}
                 onChange={(e) => handleImages(1, e.target.value)}
                 />
                  <input className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 type="text" 
                 placeholder="https://example.com/image.jpg"
                 value={images[2]}
                 onChange={(e) => handleImages(2, e.target.value)}
                 />
            </div>
            <div className="mb-6 flex justify-center">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none ">
                    Update
                </button>
            </div>
            {errors && <p>{errors}</p>}
        </form>
        </div>
        </section>
    )
}

export default EditCampaign;