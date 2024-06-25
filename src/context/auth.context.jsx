import React, {useEffect, useState} from "react";
import axios from "axios";

// Initialize context
const AuthContext = React.createContext();

// Create provider
const API_URL = "http://localhost:5005";

function AuthProviderWrapper (props) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Save the login JWT Token in the browser local storage.
    const saveToken = (token) => {
        localStorage.setItem("authToken", token);
    }

    // Function to authenticate the user. verifies if the token is a valid one.
    const authenticateUser = async () => {
        const storedToken = localStorage.getItem("authToken");

        if(storedToken) {
            try {
            const response = await axios
            .get(`${API_URL}/auth/verify`, {headers: {Authorization: `Bearer ${storedToken}`},
            });
            setUser(response.data);
            setIsLoggedIn(true);
            }
            catch(err) {
            console.log("Failed to authenticate user", err);
            setUser(null);
            setIsLoggedIn(false);
            }
        }
        else {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOut = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    // Fetch user data when the component is mounted        
        const fetchUser = async () => {
        if(user &&user._id){
        try {
            // Fetch the user using your authentication token
            const response = await axios.get(`${API_URL}/api/user/${user._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
            });

            // Set the user with the response data
            setCurrentUser(response.data);
        } catch (err) {
            console.log("Failed to fetch user", err);
        }
        }
    };
    useEffect(() => {
        authenticateUser();
      }, []);
    
  /*     useEffect(() => {
        if (user._id) {
          fetchUser();
        }
      }, []); */
    

    return (
        <AuthContext.Provider 
            value = {{
                isLoggedIn, 
                user, 
                currentUser, 
                saveToken, 
                authenticateUser, 
                logOut,
                
                }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProviderWrapper};
