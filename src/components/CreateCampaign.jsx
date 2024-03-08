//Necessary imports:
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function CreateCampaignForm () {
    const [title, setTitle] = useState("");
    const [cause, setCause] = useState("education, health, emergencies, dreams, others");
    const [description, setDescription] = useState("");
    const [goalAmount, setGoalAmount] = useState(0);
    const [endDate, setEndDate] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState("");


    const {userId} = useParams(); 
    const {currentUser, authenticateUser} = useContext(AuthContext);

    useEffect(() => {
        const user = async () => {
            if(userId){
            axios
            .get(`${API_URL}/api/users/${userId}`)
            .then((response) => {
                authenticateUser(response.data);
            })
            .catch((error) => console.log(error))
        }
    };
         user();  
    }, [currentUser, userId]);
    
    // Initialize the useNavigate hook
    const navigate = useNavigate();


    const handleTitle = (e) => setTitle(e.target.value);
    const handleCause = (e) => setCause(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleGoalAmount = (e) => setGoalAmount(e.target.value);
    const handleEndDate = (e) => {
        let dateValue = e.target.value;
        const formattedDate = new Date(Date.parse(dateValue)).toISOString().slice(0, 10);
        setEndDate(formattedDate);
    };
    const handleImages = (e) => setImages(e.target.value);
    const handleCampaignSubmit = (e) => {

        e.preventDefault();

        if(!title || !description || !goalAmount || !endDate || !images) {
            setErrors("Please fill in all fields");
            return;
        }

        const reqBody = {title, cause, description, goalAmount, endDate, images, /* userId */};

        axios
            .post(`${API_URL}/api/user/:id/campaign`, reqBody)
            .then(() => {

                navigate("/support");
            })
            .catch((error) => console.log(error))

        };

    return (
        <div>
        <form onSubmit={handleCampaignSubmit}>
            <div>
                <h2>Create a Campaign</h2>
            </div>
            <div>
                <label>Title:</label>
                <input
                 type="text" 
                 value={title}
                 onChange={handleTitle}
                 />
            </div>
            <div>
                <label>Cause:</label>
                <select
                 value={cause}
                 onChange={handleCause}>
                    <option value="dreams">Dream</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="emergencies">Emergency</option>
                    <option value="others">Others</option>
                </select>
            </div>
            <div>
                <label>Description:</label>
                <textarea
                 type="text" 
                 value={description}
                 onChange={handleDescription}
                 rows="5"
                 cols="50"
                 />
            </div>
            <div>
                <label>Goal Amount:</label>
                <input
                 type="number" 
                 value={goalAmount}
                 onChange={handleGoalAmount}
                 />
            </div>
            <div>
                <label>End Date:</label>
                <input
                 type="date" 
                 value={endDate}
                 onChange={handleEndDate}
                 />
            </div>
            <div>
                <label>Images:</label>
                <input
                 type="text" 
                 value={images}
                 onChange={handleImages}
                 />
            </div>
            <div>
                <button type="submit">Create Campaign</button>
            </div>
            {errors && <p>{errors}</p>}
            
        </form>
        </div>
    );
}

export default CreateCampaignForm;



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