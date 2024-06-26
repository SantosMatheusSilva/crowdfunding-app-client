//Necessary imports:
import {Link} from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useState, useEffect} from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

import EditProfile from "./EditProfile";

const API_URL =process.env.REACT_APP_SERVER_URL;
function Navbar () {
    /* const {isLoggedIn} = useContext(AuthContext); */
    const {user, isLoggedIn, logOut} = useContext(AuthContext);
    const {userId} = useParams()
    const [userData, setUserData] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [dropDownSupport, setDropDownSupport] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);


    useEffect(() => {
        if (user && user._id) {
          axios
            .get(`${API_URL}/api/user/${user._id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
            })
            .then((response) => {
              setUserData(response.data);
            })
            .catch((error) => console.log(error));
        }
      }, [user, userId]);

      useEffect(() => {
        if (user) {
          setUserData(user);
        }
      }, [user]);

      const navigate = useNavigate();

      const handleLogout = () => {
          logOut();
          navigate("/login");
          setUserData(null);
      };
      const toggleDropdown = () => {
        setDropDown(!dropDown);
      }
      const toggleDropdownSupport = () => {
        setDropDownSupport(!dropDownSupport);
        
      }
      const handleCloseEditProfile = () => {
        setShowEditProfile(false);
      };
    

    return (
        <header>
        <nav className="text-blue border-y-4 border-gray-400 p-4 relative">
         <div className="flex items-center justify-between w-full px-10">
         <div className="text-left">  
             <Link to="/">
                <div className="flex items-center">
                <img src={logo} alt="" style={{width: "70px", height: "50px"}}/>
                <h2 className="px-2 text-3xl font-bold ">HOPE.</h2>
                </div>
            </Link>
            </div>
            <div className="flex justify-between space-x-10 text-2xl right-20">
                <div className="flex items-center  justify-end space-x-10 text-2xl mx-10">
                <Link to="/" className="hover:text-sky-500 hover:scale-110 hover:font-semibold aria-checked:bg-sky-700">Home</Link>
                <Link to="/about" className="hover:text-sky-500 hover:scale-110 hover:font-semibold">About</Link>
                <Link to="/create-campaign" className="hover:text-sky-500 hover:scale-110 hover:font-semibold">Create</Link>
                <Link className=" flex gap-1 items-center justify-between hover:text-sky-500 hover:scale-110 hover:font-semibold aria-checked:bg-sky-700" onClick={toggleDropdownSupport}>Support <IoIosArrowDown /></Link>
                 {/* dropdown (Support) */}
                {dropDownSupport && (
                    <div className="absolute z-10 absolute bg-white rounded-lg shadow-lg p-2 m-2 top-16 ring-2 ring-black ring-opacity-5 focus:outline-none" onClick={toggleDropdownSupport}>
                      <div className="flex flex-col gap-2 p-2">
                        <Link to="/support-campaigns">Campaigns</Link>
                        <Link to="/support-institutions">Institutions</Link>
                      </div>
                    </div>
                )}
                </div>
               
                <div>
                    {isLoggedIn ? (
                        <div>
                            <button onClick={toggleDropdown} className="md:me-0" >
                            <img src={userData && userData.profilePic} alt="profile-picture" className="rounded-full w-12 h-12 object-cover border-2 border-sky-500 hover:ring-2 hover:ring-sky-500 ring-offset-4" />
                            </button>
                            {/* dropdown */}
                            {dropDown && (
                        <div className=" z-10 absolute bg-white rounded-lg shadow-lg p-2 m-2 right-0 ring-1 ring-black ring-opacity-5 focus:outline-none" onClick={toggleDropdown}>
                          <div className="text-sm p-2" >
                            <p>{userData && userData.name}</p>
                            <p>{userData && userData.email}</p>
                          </div>
                          <hr className="border-gray-300"/>
                          <div className="flex flex-col gap-2 p-2 text-sm">
                            <p className=" hover:bg-gray-300">
                              <Link to="/user-profile-page">
                                Profile
                              </Link>
                            </p>
                            <p className="hover:bg-gray-300 ">
                              <Link onClick={() => setShowEditProfile(true)}>
                                Edit Profile
                              </Link>
                            </p>
                          </div>
                          <hr className="border-gray-300"/>
                          <div className="my-3 px-2 hover:bg-gray-300 text-sm">
                            <button onClick={handleLogout}>Logout</button>
                          </div>
                        </div>
                    )}
                    {showEditProfile && (
                        <EditProfile
                            userData={userData}
                            onClose={handleCloseEditProfile}

                        />
                    )}
                    {/* if not logged in show login */}   
                        </div>
                    ) : (
                        <div className=" border-2 border-gray-300 px-4 py-1 rounded-full bg-sky-500 align-center hover:scale-110 hover:font-semibold">
                        <Link to="/login">Login</Link>
                        </div>
                    )}
                    
                   
                </div>
            </div>
         </div>
        </nav>
        </header>
    )
}

export default Navbar;
