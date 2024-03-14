//Necessary imports:
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
import form from "../assets/form.svg";

//Import / Declare the local host:
const API_URL = "https://crowdfunding-app-server.onrender.com";

function CreateCampaign () {
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

    const {userId} = useParams(); 
    const {user, authenticateUser} = useContext(AuthContext);

    
    // Here we Initialize the useNavigate hook
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
    
    const handleCampaignSubmit = async (e) => {

        e.preventDefault();

        if(!title || !description || !goalAmount || !endDate || !promIntroduction || !budget || !campaignImage) {
            setErrors("Please fill in all mandatory fields");
            return;
        }

        const reqBody = {title, campaignImage, promIntroduction, budget, cause, description, goalAmount, endDate, images};
        console.log(reqBody);

        try{
            const response = await axios
                .post(`${API_URL}/api/user/${userId}/campaign`, reqBody)
                navigate("/support");
        } 
        catch(error) {
            console.log(error);
            setErrors("An error occurred while creating the campaign. Please try again.");
        }
        };
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full mt-10">
            <h1 className="text-3xl font-bold text-5xl text-sky-600 border-b-2 border-sky-500">Create a Campaign</h1>
            <div className=" flextext-center mb-10 mt-10  border-2 p-5 ">
                <img src={form} alt="" className=" h-30"/>
                
            </div>
        <form onSubmit={handleCampaignSubmit}>
            <div className="pt-6 mb-6">
                <h3 className="block text-lg font-medium text-gray-800 mb-3">
                    <span className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">
                        1.
                    </span> 
                    Give your campaign a Title *
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
                    <span  className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">
                        2.
                    </span>
                    Give it an image that will represent it *
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
                    <span  className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">3.</span>
                     Select a cause that suites your campaign *
                </h3>
                {/* <label>Cause:</label> */}
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                 value={cause}
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
                    <span  className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">4.</span>
                     Set the goal amount *
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
                    <span  className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">5.</span>
                     Give it a  detailed description *
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
                    <span className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">6.</span> 
                    Introduce your self *
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
                    <span className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">7.</span> 
                    Define the budget and schedule *
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
                    <span className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">8.</span> 
                    Select the campaign end date *
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
                    <span className=" bg-sky-500 text-white font-semibold rounded-full p-2 w-10 h-6 mr-2">9.</span> 
                    Add proof images or documents (Up to 3)
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
                <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none ">
                    Create Campaign
                </button>
            </div>
            {errors && <p>{errors}</p>}
        </form>
        </div>
    );
}

export default CreateCampaign;



    // const MAX_IMAGES = 5;
    //Function to check the number of images.
   /*  const handleImages = (e) => {
        const newFiles = Array.from(e.target.files);
        if (newFiles.length + images.length < MAX_IMAGES) {
          setImages([...images, ...newFiles]);
        } else {
          alert(`You can only upload a maximum of ${MAX_FILES} files.`);
        }
      }; */