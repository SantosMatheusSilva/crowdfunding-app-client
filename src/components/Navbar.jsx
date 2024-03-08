import {Link} from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar () {

    return (
        <nav style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px"}}>
         <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", gap: "20px"}}>
         <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                <img src={logo} alt="" style={{width: "50px", height: "50px"}}/>
                <h2>Vaquinha</h2>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "20px", alignContent: "center"}}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/create-funding">Create Funding</Link>
                <Link to="/support">Support</Link>
                <Link to="/login">Login</Link>
            </div>
         </div>
        </nav>
    )
}

export default Navbar;
