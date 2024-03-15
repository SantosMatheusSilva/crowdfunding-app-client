import axios from "axios";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
/* import  authService from "../services/auth.service";
 */ 
//Import / Declare the local host:
const API_URL = "https://crowdfunding-app-server.onrender.com";
 
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
        <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">  
        <h1 className="text-3xl font-bold text-gray-600  text-center tracking-tight md:text-2xl m-5">Make Part of Our Community</h1>    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
        
        <div  className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
        <h1 className="text-xl font-bold text-sky-500  text-center tracking-tight md:text-2xl ">
            Sign Up
        </h1>
        <form onSubmit={handleSignupSubmit}>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">User Name:</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" 
                name="user name" 
                value={name} 
                onChange={handleName}/>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email:</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="email" 
                name="email" 
                value={email} 
                onChange={handleEmail}/>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password:</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password" 
                name="password" 
                value={password} 
                onChange={handlePassword}/>
            </div>

            <div className="mb-6 flex justify-center mt-6">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none ">
                    Sign Up
                </button>
            </div>
            {error && <p>{error}</p>}
        </form>
        </div>
    </div>
    </div>
    </section>


    )
}

export default SignupPage;

{/* <section className=" ">      
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-3xl font-bold text-center p-5  bg-blue-500 text-white font-semibold rounded-md">
                Sign Up
            </h1>
            <div  className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
            <form onSubmit={handleSignupSubmit}>
               
                <div>
                    <label>User Name:</label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text" 
                    name="user name" 
                    value={name} 
                    onChange={handleName}/>
                </div>

                <div>
                    <label>Email:</label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={handleEmail}/>
                </div>

                <div>
                    <label>Password:</label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handlePassword}/>
                </div>

                <div className="mb-6 flex justify-center mt-6">
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none ">
                        Sign Up
                    </button>
                </div>
                {error && <p>{error}</p>}
            </form>
            </div>
        </div>
        </section> */}