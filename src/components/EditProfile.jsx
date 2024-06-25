//Necessary imports:
import {Link} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { IoIosCloseCircleOutline } from "react-icons/io";


// Import the server 
const API_URL = process.env.VITE_SERVER_URL;

function EditProfile({onClose}) {
    const {user} = useContext(AuthContext);
    const {userId} = useParams();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({name: "", email: "", profilePic: ""});
    const [image, setImage] = useState(null);
    const [error, setError] = useState(undefined);
    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect (() => {
        axios
        .get(`${API_URL}/api/user/${user._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        })
        .then((response) => {
            setUserData(response.data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }, [userId]);

    const handleChange = event => {
        // Update form fields as user types
        const { name, value } = event.target;
        setUserData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

  const handleUpdate = (e) => {
      e.preventDefault();

      axios
      .put(`${API_URL}/auth/profile`, userData)
      .then(() => {
        setShowEditProfile(false);
        window.alert("Profile updated successfully!");
        window(location.reload());
        
      })
      
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An unknown error occurred";
        setError(errorDescription);
        setLoading(false);
    })};

    const handleClose = () => {
        onClose();
    }


    if (loading) {
        return <p>Loading...</p>;
    }
    
    return(
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg w-2/4">
            <div className="flex justify-between align-center px-6 mt-6">
            <h1 className="text-2xl font-bold ">Update Profile</h1>
            <button className="text-3xl hover:scale-125 hover:text-red-500 "
            onClick={handleClose}>
            <IoIosCloseCircleOutline />
            </button>
            </div>
            <hr className="border-gray-300 mt-10 w-full"/>
            <form onSubmit={handleUpdate} className="space-y-8 p-10">

                <div className="flex flex-col gap-2">
                    <label>Name</label>
                    <input className="border border-gray-300 rounded-md p-2"
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Email</label>
                    <input className="border border-gray-300 rounded-md p-2"
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Picture</label>
                    <input className="border border-gray-300 rounded-md p-2"
                        type="text"
                        id="profilePic"
                        name="profilePic"
                        value={userData.profilePic}
                        onChange={handleChange}
                    />
                    {image && (
                        <img src={image.src} alt={image.alt} />
                    )}
                </div>
            </form>
            <hr className="border-gray-300 my-5"/>
                <div className="flex justify-end p-6">
                    <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleUpdate}
                    >
                        Update
                    </button>
                </div>
                {error && <p>{error}</p>}
        </div>
        </div>
    )
}

export default EditProfile;