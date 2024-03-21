//Necessary imports:
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

// Import the server 
const API_URL = "https://crowdfunding-app-server.onrender.com";


function UserProfilePage() {
    /* const {id} = useParams(); */
    const { id} = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUser = () => {
            const storedToken = localStorage.getItem("authToken");

            if(storedToken) {
                axios
                .get(`${API_URL}/api/user/${id}`, 
                {headers: {Authorization: `Bearer ${storedToken}`}})
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) =>  {
                    const errorDescription =  "An unknown error occurred";
                    setError(errorDescription);
                    
                })
            }
            else {
                setError("You are not logged in!");
                setLoading(false);
            }
        };
        getUser();
    }, [id]);

    if (loading) return <div className="flex justify-center mt-96 ml-96"><p>Loading...</p></div>;
   if (error) return <p>{error}</p>;

    return (
        <div>
           <div className="flex flex-col gap-10 max-w-sm-md-lg m-96">
           <h1> Profile Page</h1>
            <h3>Hello {userData.name}!</h3>
           </div>
        </div>
    );
}

export default UserProfilePage;
