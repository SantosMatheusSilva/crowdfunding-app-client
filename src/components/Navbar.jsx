//Necessary imports:
import {Link} from "react-router-dom";
import logo from "../assets/logo.png";


function Navbar () {

    return (
        <nav className="text-blue border-y-4 border-gray-400 p-4" >
         <div className="flex items-center justify-between w-full ">
         <div className="text-left"> 
             <Link to="/">
                <div className="flex items-center">
                <img src={logo} alt="" style={{width: "70px", height: "50px"}}/>
                <h2 className="px-2 text-3xl font-bold ">HOPE.</h2>
                </div>
            </Link>
            </div>
            <div className="flex items-center  justify-end space-x-4 text-2xl">
                
                <Link to="/about">About</Link>
                <Link to="/create-campaign">Create</Link>
                <Link to="/support">Support</Link>
                <Link to="/login">Login</Link>
            </div>
         </div>
        </nav>
    )
}

export default Navbar;
