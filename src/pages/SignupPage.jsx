import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";


//Import / Declare the local host:
const API_URL = "localhost:5005";

function SignupPage () {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    /* const [picture, setPicture] = useState(""); */ // Attempt to add profile picture.
    const [error, setError] = useState("");

    // Initialize the useNavigate hook
    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        // Prevent defaul actions of the form to refresh the page.
        e.preventDefault ();

        // 
        const reqBody = {email, password, name};

        axios.post(`${API_URL}/auth/signup`, reqBody)
        .then(() => {
            navigate("/login");
        })
        .catch((error) => {
            const errorDescription = error.data.message;
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
                    <input type="text" name="user name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
