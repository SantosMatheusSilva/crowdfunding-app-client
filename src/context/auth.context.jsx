import React, {useState} from "react";
import axios from "axios";

// Initialize context
const authContext = React.createContext();

// Create provider
const API_URL = "localhost:5005";

function AuthProviderWrapper (props) {
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Save the login JWT Token in the browser local storage.
    const saveToken = (token) => {
        localStorage.setitem("authToken", token);
    }

    // Function to authenticate the user. verifies if the token is a valid one.
    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken");

        if(storedToken) {
            axios
            .get(`${API_URL}/auth/verify`, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response) => {
                setUser(response.data);
                setIsLoggedIn(true);
            })
            .catch(() => {
                setUser(null);
                setIsLoggedIn(false);
            })
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

    return (
        <authContext.Provider value = {{isLoggedIn, user, saveToken, authenticateUser, logOut}}>
            {props.children}
        </authContext.Provider>
    )
}

export {authContext, AuthProviderWrapper};
