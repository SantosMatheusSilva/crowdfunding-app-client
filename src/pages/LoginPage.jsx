import {useState, useContext} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import  {authContext} from "../context/auth.context.jsx"; 

//Import / Declare the local host:
const API_URL = "http://localhost:5005";


function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Accessing the value from AuthContext by the useContext hook  
    const {saveToken, authenticateUser} = useContext(authContext);

    // Initialize the useNavigate hook
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault ();

        // 
        const reqBody = {email, password};

        axios 
        .post(`${API_URL}/auth/login`, reqBody)
        .then((response) => {
            saveToken(response.data.authToken);
            authenticateUser();
            navigate("/"); // Redirect to home page after login.
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setError(errorDescription);
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div>
                <label>Email:</label>
                <input type="email" name="email" value ={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>

               <div>
               <label>Password:</label>
                <input type="password" name="password" value ={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                
                <div>
                <button type="submit">Login</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default LoginPage;
