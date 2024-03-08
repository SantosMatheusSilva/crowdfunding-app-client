import {useState, useContext} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import  {AuthContext} from "../context/auth.context.jsx"; 
import { Link } from "react-router-dom";
/* import  authService from "../services/auth.service.jsx";
 */ 
//Import / Declare the local host:
const API_URL = "http://localhost:5005";


function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Accessing the value from AuthContext by the useContext hook  
    const {saveToken, authenticateUser} = useContext(AuthContext);

    // Initialize the useNavigate hook
    const navigate = useNavigate();

   /*  const {login} = authService */

   const handleEmail = (e) => setEmail(e.target.value);
   const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault ()
        // 
        const reqBody = {email, password};

        axios
        .post(`${API_URL}/auth/login`, reqBody)
        .then((response) => {
            console.log("JWT token",response.data.authToken);

            saveToken(response.data.authToken);
            authenticateUser();
            navigate("/"); // Redirect to home page after login.
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
    };
    

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div>
                <label>Email:</label>
                <input
                 type="email" 
                 name="email" 
                 value ={email} 
                 onChange={handleEmail}/>
                </div>

               <div>
               <label>Password:</label>
                <input 
                type="password" 
                name="password" 
                value ={password} 
                onChange={handlePassword}/>
                </div>
                
                <div>
                <button type="submit">Login</button>
                </div>
                {error && <p>{error}</p>}
            </form>
            <div>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default LoginPage;
