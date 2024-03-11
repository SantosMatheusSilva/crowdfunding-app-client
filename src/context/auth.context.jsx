import React, {useEffect, useState} from "react";
import axios from "axios";

// Initialize context
const AuthContext = React.createContext();

// Create provider
const API_URL = "http://localhost:5005";

function AuthProviderWrapper (props) {
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Save the login JWT Token in the browser local storage.
    const saveToken = (token) => {
        localStorage.setItem("authToken", token);
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

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value = {{isLoggedIn, user, saveToken, authenticateUser, logOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProviderWrapper};
