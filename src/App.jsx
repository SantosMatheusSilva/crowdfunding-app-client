import {Routes, Route, useLocation} from "react-router-dom";
import './App.css'
// importing the pages bellow:
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import CreateFunding from "./pages/CreateFunding.jsx";
/* import Dashboard from "./pages/Dashboard.jsx"; */
import ErrorPage from "./pages/ErrorPage.jsx";
//import components bellow:
import Navbar from "./components/Navbar.jsx";

function App() {
const location = useLocation();

  // Function to check if the current location matches certain paths
  const shouldShowSidebar = () => {
    const { pathname } = location;
    return !['/login', '/signup'].includes(pathname);
  };

  return (
    <div>
     
      <Navbar />
  
      {shouldShowSidebar() && <SideBar />}
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/create-funding" element={<CreateFunding />} />
        <Route path="/card" element={<CampaignsCard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */} {/* Private route. This route will be used only when user is logged in */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;


