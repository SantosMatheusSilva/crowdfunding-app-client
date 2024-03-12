import {Routes, Route, useLocation} from "react-router-dom";
import './App.css'
// importing the pages bellow:
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
/* import Dashboard from "./pages/Dashboard.jsx"; */
import ErrorPage from "./pages/ErrorPage.jsx";
import InstitutionDetailsPage from "./pages/InstitutionDetailsPage.jsx";
import CampaignsDetailsPage from "./pages/CampaignsDetailsPage.jsx";
import Payment from "./pages/Payment.jsx";
//import components bellow:
import Navbar from "./components/Navbar.jsx";
import SideBar from "./components/SideBar.jsx";
import Footer from "./components/Footer.jsx";


function App() {
const location = useLocation();

  // Function to check if the current location matches certain paths
/*   const shouldShowSidebar = () => {
    const { } = location;
    return !['/login', '/signup'].includes(pathname);
  }; */

  return (
    <div>
     
      <Navbar />
  
     {/*  {shouldShowSidebar() && <SideBar />} */}
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */} {/* Private route. This route will be used only when user is logged in */}
        <Route path="/institutions-details-page/:institutionId" element={<InstitutionDetailsPage />} />
        <Route path="/campaigns-details-page/:campaignId" element={<CampaignsDetailsPage />} />
        <Route path="/payment-page" element={<Payment />} />
        <Route path="/error-page" element={<ErrorPage />}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;


