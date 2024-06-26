//Necessary imports:
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import EditProfile from "../components/EditProfile";
import { RiLogoutBoxLine } from "react-icons/ri";
// Import the server
const API_URL =process.env.REACT_APP_SERVER_URL;

function UserProfilePage() {
  const { currentUser, isLoggedIn, logOut } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [donations, setDonations] = useState([{}]);
  const [campaigns, setCampaigns] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);

  //console.log("user --->", user);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      axios
        .get(`${API_URL}/api/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          const errorDescription =
            error.response?.data?.message || "An unknown error occurred";
          setError(errorDescription);
          setLoading(false);
        });
    }
  }, [isLoggedIn, userId]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${userId}/donations`)
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => console.log(error));
  }, [userId, donations.length]);

  //console.log("total donations --->", );

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${userId}/campaigns`)
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => console.log(error));
  }, [userId, campaigns.length]);

  const handleUpdateProfileClick = () => {
    setShowEditProfile(true);
  };

  const handleCancelUpdate = () => {
    setShowEditProfile(false);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/login");
    setUserData(null);
  };

  if (!isLoggedIn)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">
          You must be logged in to view this page.
        </p>
      </div>
    );
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="animate-spin h-12 w-12 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.764 0-5.236-1.122-7.071-2.929z"
            ></path>
          </svg>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Greeting container */}
      <div className="my-10 mx-20">
        <h1 className="text-3xl font-medium tracking-wide">
          Hello, <strong>{userData.name}</strong>
        </h1>
      </div>
      {/* page content */}
      <div className="flex flex-row gap-20 max-w-sm-md-lg mt-10 mb-36 py-10 justify-center align-middle border-2 border-gray-300 items-center border-shadow-md">
        {/* User campaigns container */}
        <div className="flex flex-col max-w-sm-md-lg w-110 mt-10 mb-10 bg-sky-200 text-center rounded-md shadow-lg p-5 overflow-auto">
          <h2>My Campaigns</h2>
          <p>({userData.campaigns.length})</p>
          <div className=" flex flex-col gap-5 p-2 max-w-sm-md-lg h-96 my-5 overflow-y-auto">
          {userData.campaigns.length === 0 && (
              <div className="flex flex-col items-center gap-5 align-center">
              <p className="text-center">No campaigns yet</p>
              <Link 
              to="/create-campaign"
              className="text-xl text-center bg-sky-300 rounded-full px-2 border-2 border-gray-600">
                Create Campaign
              </Link>
              </div>
            )}
            {userData.campaigns.map((campaign) => (
              <Link to={`/campaigns-details-page/${campaign._id}`}>
                <div
                  key={campaign._id}
                  className="max-w-sm-md-lg bg-white rounded shadow-lg w-96 h-110 border-1 border-gray-600 scroll-ml-6 snap-start "
                >
                  <div
                    className="w-full h-80 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${campaign.campaignImage})`,
                    }}
                  />
                  <div className="px-6 py-4 flex flex-col text-left">
                    <div className="flex flex-row justify-between">
                      <h2 className="font-bold text-xl text-gray-900">
                        {campaign.title}
                      </h2>
                      <p className="text-gray-700 text-base bg-sky-300 rounded-full px-2">
                        {campaign.status}
                      </p>
                    </div>
                    <p className="">{campaign.cause}</p>
                    <p>{campaign.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* user donations bellow */}
        <div className="flex flex-col gap-10 max-w-sm-md-lg h-96 w-110 mt-10 mb-10 bg-sky-200 rounded-md shadow-lg p-5">
          <div className="text-center">
            <h2 className="">My Donations</h2>
            <h3>{userData.totalDonation}€</h3>
          </div>
          <div className="w-full overflow-y-auto">
            {userData.donations.length === 0 && (
              <div className="flex flex-col items-center gap-5 align-center">
              <p className="text-center">No donations yet</p>
              <Link 
              to="/support"
              className="text-xl text-center bg-sky-300 rounded-full px-2 border-2 border-gray-600">
                Donate
              </Link>
              </div>
            )}
            {userData?.donations &&
              userData.donations.map((donation) => (
                <div className="">
                  <div
                    key={donation._id}
                    className="max-w-sm-md-lg rounded shadow-lg p-1 w-96 h-25 border-1 border-gray-600 m-2 bg-white"
                  >
                    {console.log(userData.totalDonation)}
                    {donation.campaign?.title && (
                      <div>
                        <h2>{donation.campaign.title}</h2>
                      </div>
                    )}
                    <div className="mx-1">
                      <h3 className="text-xl">{donation.amount}€</h3>
                      {/* <p>{donation.status}</p> */}
                      <p>"{donation.comments}"</p>
                      <p className="text-sm text-gray-500">
                        {new Date(donation.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
