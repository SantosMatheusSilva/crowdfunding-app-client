 //Necessary imports:
 import { useParams, useNavigate} from 'react-router-dom';
 import { useState, useEffect, useContext} from 'react';
 import axios from 'axios';
 import { AuthContext } from "../context/auth.context";
 import { IoIosCloseCircleOutline } from "react-icons/io";
 //Necessary imports for stripe:
 //Import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
 
 //Import / Declare the local host:
 const API_URL = process.env.REACT_APP_SERVER_URL;
 
 function DonationForm (props) { // props ??
     const {campaignId, institutionId, onClose} = props;
     const [amount, setAmount] = useState("");
     const [paymentMethod, setPaymentMethod] = useState("");
     const [donationStatus, setDonationStatus] = useState(""); 
     //const [paymentIntentId, setPaymentIntentId] = useState("");
     const [currency, setCurrency] = useState("EUR");
     const [comments, setComments] = useState("");
     const [error, setError] = useState("");
     const [donation, setDonation] = useState([]);
     //const {userId} = useParams(); 
     const {user, authenticateUser} = useContext(AuthContext);
     //const [showDonationForm, setShowDonationForm] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const [paymentIntentId, setPaymentIntentId] = useState(null);
     const [clientSecret, setClientSecret] = useState(null);
    
     const navigate = useNavigate();
 
     const handleAmount = (e) => setAmount(e.target.value);
     //const handlePaymentMethod = (e) => setPaymentMethod(e.target.value);
     const handleComment = (e) => setComments(e.target.value);
 
      const handleDonationSubmit = async (e) => {
          e.preventDefault();
        
          if( !amount || amount <= 0){ 
              setError("Please enter an amount.");
              return;
          }
 
          const isValidAmount = /^\d+(\.\d{1,2})?$/.test(amount.replace(',', '.'));
 
          if (!isValidAmount) {
              setError("Please enter a valid amount.");
              return;
          }
 
          const numericAmount = parseFloat(amount.replace(',', '.'));
          console.log("numericAmount", numericAmount);
 
          const donationData = {
              amount: numericAmount,
              paymentMethod,
              comments,
              donationStatus,
              currency,
              campaign: campaignId || institutionId,
              donor: user,
          }
 
          try {
             if(!user){
                 alert("You must be logged in to make a donation.");
                 navigate("/login");
                 return;
             }
 
             const response = await axios.post(`${API_URL}/api/donations/create-payment-intent`, donationData)
             if(response.data){
                 console.log("response", response.data);
                 const {paymentIntent} = response.data;
                 
                 donationData.paymentIntentId = paymentIntent.id;
                 donationData.clientSecret = paymentIntent.client_secret;
 
 
             // Navigate to the checkout page with donation information
             navigate("/checkout", { state: { donationData } });
             }
          } catch(error) {
             console.error("An error ocured while submiting your donation", error);
              setError("An error occurred while submiting your donation. Please try again.");
         }
 
     }
 
     const handleClose = () => {
         onClose();
     } 
 
     return (
         <>
         {isLoading ? (
             <div>
                 <p>Loading...</p>
             </div>
         ) : null}
         <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-40">
         <div className="bg-white rounded-lg shadow-lg w-1/4">
         <div className="flex justify-between px-6 mt-6">
             <h1 className="text-2xl font-bold ">Make your donation</h1>
             <button className="text-3xl hover:scale-125 hover:text-red-500 "
             onClick={handleClose}>
             <IoIosCloseCircleOutline />
             </button>
             </div>
             <p className="text-center p-6 text-lg text-gray-600">You are about to do a good deed towards a good cause.</p>
         <div className="">
             <div className="">
                 <form onSubmit={handleDonationSubmit}>
                     <div className="flex flex-col p-2 items-center">
                         <label className="p-2">How much would you like to donate?</label>
                         <div className="flex flex-row aling-middle gap-2 p-2 border-2 border-gray-300 rounded w-auto">
                         <label>€ </label>
                         <input type="text" inputMode='numeric' value={amount} onChange={handleAmount} placeholder='0,00' className=""/>
                         </div>
                     </div>
                    {/*  <div>
                         <label className="p-2">Payment Method:</label>
                         <select value={paymentMethod} onChange={handlePaymentMethod} className="border-2 border-gray-300 rounded">
                             <option value="credit_card">Credit Card</option>
                             <option value="paypal">PayPal</option>
                             <option value="other">Other</option>
                         </select>
                     </div> */}
                     <div className="flex flex-col p-2 items-center">
                         <label className="p-2">Want to add a message?</label>
                         <textarea type="text" value={comments} onChange={handleComment} cols="20" rows="2" className="border-2 border-gray-300 rounded w-3/4" placeholder='Enter your message'>
                        
                         </textarea>
                     </div>
                     <div className="p-6 text-end">
                         <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mt-2 rounded">Checkout</button>
                         <p>{error}</p>
                     </div>
                 </form>
             </div>
         </div>
         </div>
         </div>
         </>
     )
 }
 
 
 export default DonationForm;
 