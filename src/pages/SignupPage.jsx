import axios from "axios";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
/* import  authService from "../services/auth.service";
 */ 
//Import / Declare the local host:
const API_URL = "http://localhost:5005";
 
function SignupPage () {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    /* const [picture, setPicture] = useState(""); */ // Attempt to add profile picture.
    const [error, setError] = useState("");

    // Initialize the useNavigate hook
    const navigate = useNavigate();

    /* const { signup } = authService; */

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = (e) => {
        // Prevent defaul actions of the form to refresh the page.
        e.preventDefault ();
        if(!email || !password || !name) {
            setError("Please fill in all fields");
            return;
        }
        // create an object 
        const reqBody = {email, password, name};

       axios
        .post(`${API_URL}/auth/signup`, reqBody)
        .then(() => {
            navigate("/login");
        })
        .catch((error) => {
            /* const errorDescription = data.message; */
            /* response(error); */
            let errorDescription = 'An error occurred';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorDescription = error.response.data.message || 'An error occurred';
    } else if (error.request) {
        // The request was made but no response was received
        errorDescription = 'No response received from the server';
    } else {
        // Something happened in setting up the request that triggered an Error
        errorDescription = error.message;
    }
    setError(errorDescription);
        })
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
               {/*  <div>
                    <label>Profile Picture:</label>
                    <input type="image" name="profile picture" value={picture} onChange={(e) => setPicture(e.target.value)}/>
                </div> */}
                <div>
                    <label>User Name:</label>
                    <input 
                    type="text" 
                    name="user name" 
                    value={name} 
                    onChange={handleName}/>
                </div>

                <div>
                    <label>Email:</label>
                    <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={handleEmail}/>
                </div>

                <div>
                    <label>Password:</label>
                    <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handlePassword}/>
                </div>

                <div>
                    <button type="submit">Sign Up</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default SignupPage;
