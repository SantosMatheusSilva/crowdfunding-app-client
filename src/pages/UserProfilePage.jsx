
// Necessary imports
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

// Import / Declare the local host
const API_URL = "http://localhost:5005";

function UserProfilePage() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [errors, setErrors] = useState(undefined);
    const [userCampaigns, setUserCampaigns] = useState([]);
    const [userDonations, setUserDonations] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getUser = () => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                axios
                    .get(`${API_URL}/api/user/${user._Id}`, {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    })
                    .then((response) => {
                        setUserProfile(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setErrors("No authorization token found");
                    });
            } else {
                setErrors("You must be logged in to view this page");
            }
        };

        return getUser(); // Return the function to execute it
    });

    /* useEffect(() => {
        async function getUserData() {
            const campaigns = await axios.get(`${API_URL}/api/user/${user._id}/campaigns`);
            setUserCampaigns(campaigns.data);

            const donations = await axios.get(`${API_URL}/api/user/${user._id}/donations`);
            setUserDonations(donations.data);
        }

        getUserData(); 
    }, [user._id]);

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.profilePic) {
            setErrors("Please fill in all fields");
            return;
        }

        const reqBody = { name: user.name, email: user.email, profilePic: user.profilePic };

        try {
            const response = await axios.put(`${API_URL}/api/user/${user._id}`, reqBody);
            setUserProfile(response.data);
            navigate("/login");
        } catch (error) {
            const errorDescription = error.response.data.message;
            setErrors("An error occurred while updating your profile. Please try again.");
        }
    };

    const handleName = (e) => setUser({ ...user, name: e.target.value });
    const handleEmail = (e) => setUser({ ...user, email: e.target.value });
    const handleProfilePic = (e) => setUser({ ...user, profilePic: e.target.value });
    const handlePassword = (e) => setUser({ ...user, password: e.target.value });

    const navigate = useNavigate();
 */
    if (loading) return <p>Loading...</p>;

    if (errors) return <p>{errors}</p>;

    return (
        <div>
            <div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <img src={user.profilePic} alt="" />
            </div>
            <div>
                <h2>My Campaigns</h2>
                {userCampaigns.map((campaign, index) => (
                    <div key={index}>
                        <p>{campaign.title}</p>
                        <p>{campaign.cause}</p>
                        <img src={campaign.campaignImage} alt="" />
                        <p>{campaign.goalAmount}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2>My Donations</h2>
                {userDonations.map((donation, index) => (
                    <div key={index}>
                        <p>{donation.campaign.title}</p>
                        <p>{donation.date}</p>
                        <p>{donation.status}</p>
                        <p>{donation.amount}€</p>
                        <p>{donation.comments}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2>My Profile</h2>
                <form onSubmit={handleEdit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={user.name} onChange={handleName} />

                    <label>Profile Picture:</label>
                    <input type="text" name="profilePic" value={user.profilePic} onChange={handleProfilePic} />

                    <label>Email:</label>
                    <input type="text" name="email" value={user.email} onChange={handleEmail} />

                    <label>Password:</label>
                    <input type="text" name="password" value={user.password} onChange={handlePassword} />
                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>
    );
}

export default UserProfilePage;
