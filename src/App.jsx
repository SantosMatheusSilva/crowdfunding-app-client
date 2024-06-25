import {Routes, Route, useLocation} from "react-router-dom";
import './App.css'
// importing the pages bellow:
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import SupportInstitutionsPage from "./pages/SupportInstitutionsPage.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import InstitutionDetailsPage from "./pages/InstitutionDetailsPage.jsx";
import CampaignsDetailsPage from "./pages/CampaignsDetailsPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import EditCampaign from "./pages/EditCampaign.jsx";
import CheckoutForm from "./pages/CheckoutForm.jsx";
//import components bellow:
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import EditProfile from "./components/EditProfile.jsx";
import { Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";


function App() {

  const stripePromise = loadStripe('pk_test_51OtXZPFX1zDqFMubqatRbGTVyw8bDN2ygsAAl8JqFhcZE7ZO7VgJzi0XAHzmEND7uGJJfm01iMBKQ2eDAte7li4k00Pr85suiE');

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-profile-page" element={<UserProfilePage />} />
        <Route path="/user-profile-page/edit" element={<EditProfile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support-campaigns" element={<SupportPage />} />
        <Route path="/support-institutions" element={<SupportInstitutionsPage />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/edit-campaign" element={<EditCampaign />} />
        <Route path="/institutions-details-page/:institutionId" element={<InstitutionDetailsPage />} />
        <Route path="/campaigns-details-page/:campaignId" element={<CampaignsDetailsPage />} />
        <Route path="/comment/:commentId"  />
        <Route path="/checkout" element={<Elements stripe={stripePromise}><CheckoutForm /> </Elements>} />
      {/*   <Route path="/payment" element={<Payment />} />
        <Route path="/completion" element={<Completion />} /> */}
        {/* <Route path="/payment-page" element={<Payment />} /> */}
        <Route path="/error-page" element={<ErrorPage />}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;


